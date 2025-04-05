
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  Alert,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { VideoCallInstance } from "../../lib/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

interface VideoCallProps {
  roomId: string;
  role: "doctor" | "patient";
  email?: string;
  date?: string;
  slot?: string;
  table_id?:number;
  amount?:string;
  onUpdate?: (data: { meetLink?: string; error?: string }) => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomId, role, email, date, slot,table_id,amount, onUpdate }) => {
  const [error, setError] = useState<string | null>(null);
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const navigate=useNavigate()
  const [isConnected, setIsConnected] = useState(false);
  const [isPeerReady, setIsPeerReady] = useState(false);
  const [patientJoined, setPatientJoined] = useState(false);
  const [doctorJoined, setDoctorJoined] = useState(false);
 const [show,setShow]=useState(false);
  const websocketRef = useRef<WebSocket | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const pcConfig = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" },
    ],
  };

  const connectWebSocket = () => {
    if (websocketRef.current?.readyState === WebSocket.OPEN) return;

    if (websocketRef.current) {
      websocketRef.current.close(1000, "Reconnecting");
    }

    let wsUrl = `ws://localhost:8004/ws/video_call/${roomId}/?role=${role}`;
    if (role === "doctor") {
      wsUrl += `&email=${encodeURIComponent(email || "")}&date=${date || ""}&slot=${encodeURIComponent(slot || "")}`;
    }
    websocketRef.current = new WebSocket(wsUrl);

    websocketRef.current.onopen = () => {
      setIsConnected(true);
      setError(null);
      reconnectAttempts.current = 0;
      initializePeerConnection();
    };

    websocketRef.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.status === "connected") {
        setMeetLink(data.meet_link);
        onUpdate?.({ meetLink: data.meet_link });
      } else if (data.error) {
        setError(data.error);
        onUpdate?.({ error: data.error });
      } else if (data.offer) {
        await handleOffer(data.offer);
      } else if (data.answer) {
        await handleAnswer(data.answer);
      } else if (data.candidate) {
        await handleCandidate(data.candidate);
      } else if (data.user_joined) {
        if (role === "doctor" && data.role === "patient") setPatientJoined(true);
        if (role === "patient" && data.role === "doctor") {
          setDoctorJoined(true);
          if (isPeerReady) await startCall();
        }
      }
    };

    websocketRef.current.onerror = () => {
      setError("WebSocket connection failed.");
    };

    websocketRef.current.onclose = (event) => {
      setIsConnected(false);
      setPatientJoined(false);
      setDoctorJoined(false);
      if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current++;
        setTimeout(connectWebSocket, 1000 * reconnectAttempts.current);
      } else if (event.code !== 1000) {
        setError("Connection failed after max retries.");
      }
    };
  };

  const disconnectWebSocket = () => {
    if (websocketRef.current?.readyState === WebSocket.OPEN) {
      websocketRef.current.close(1000, "User left the call");
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsConnected(false);
    setIsPeerReady(false);
    setPatientJoined(false);
    setDoctorJoined(false);
    
  };

  const { mutate: WalletUpdate } = useMutation({
    mutationFn: async (values: { room_id: number  ,amount: string }) => {
      const { data } = await VideoCallInstance.post("wallet_editing/", values);
      return data;
    },
    onSuccess: (data) => {
      // console.log(data);
      
    },
    onError: (error) => {
      console.log(error);
    },
  });
const leave=()=>{
  
  Swal.fire({
        title: "Are you sure?",
        // icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          disconnectWebSocket(),
      navigate("/dashboard")
      if(table_id && amount){

        WalletUpdate({room_id:table_id,amount:amount})
        console.log("hi")
      }
          toast.success("Successfully leaved"); // Show success message
          // Navigate to homepage
        }
      });
}
  const initializePeerConnection = async () => {
    if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
      setError("WebSocket not open");
      return;
    }

    peerConnectionRef.current = new RTCPeerConnection(pcConfig);

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate && websocketRef.current?.readyState === WebSocket.OPEN) {
        websocketRef.current.send(JSON.stringify({ candidate: event.candidate.toJSON() }));
      }
    };

    peerConnectionRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        remoteVideoRef.current.play().catch((err) => console.error("Remote playback error:", err));
      }
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach((track) => peerConnectionRef.current?.addTrack(track, stream));
      setIsPeerReady(true);
      if (role === "patient" && doctorJoined) await startCall();
    } catch (err) {
      setError("Failed to access camera/microphone");
    }
  };

  const startCall = async () => {

    if (!peerConnectionRef.current || websocketRef.current?.readyState !== WebSocket.OPEN) {
      setError("Connection not ready");
      return;
    }
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    websocketRef.current.send(JSON.stringify({ offer }));
    setShow(true)
  };
console.log(remoteVideoRef)
  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    if (!peerConnectionRef.current || websocketRef.current?.readyState !== WebSocket.OPEN) return;
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    websocketRef.current.send(JSON.stringify({ answer }));
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (!peerConnectionRef.current) return;
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleCandidate = async (candidate: RTCIceCandidateInit) => {
    if (!peerConnectionRef.current) return;
    await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const toggleMic = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn(videoTrack.enabled);
    }
  };

  useEffect(() => {
    connectWebSocket();
    return disconnectWebSocket;
  }, [roomId, role, email, date, slot]);

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        {role === "doctor" ? "Doctor's Video Consultation" : "Patient's Video Call"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {role === "doctor" && patientJoined && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Patient has joined the call!
        </Alert>
      )}
      {role === "patient" && doctorJoined && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Doctor has joined the call!
        </Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, justifyContent: "center" }}>
        <Paper elevation={3} sx={{ p: 1, textAlign: "center", flex: 1, maxWidth: "500px" }}>
          <Typography variant="subtitle1" gutterBottom>
            Your Video
          </Typography>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Paper>
        <Paper elevation={3} sx={{ p: 1, textAlign: "center", flex: 1, maxWidth: "500px" }}>
          <Typography variant="subtitle1" gutterBottom>
            {role === "doctor" ? "Patient's Video" : "Doctor's Video"}
          </Typography>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Paper>
      </Box>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
        <IconButton
          color={isMicOn ? "primary" : "error"}
          onClick={toggleMic}
          disabled={!isConnected || !isPeerReady}
        >
          {isMicOn ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
        <IconButton
          color={isVideoOn ? "primary" : "error"}
          onClick={toggleVideo}
          disabled={!isConnected || !isPeerReady}
        >
          {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
        {/* {role === "doctor" && (
          <Button
            variant="contained"
            color="primary"
            onClick={startCall}
            disabled={!isConnected || !isPeerReady || !patientJoined}
          >
            Start Call
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={disconnectWebSocket}
          startIcon={<ExitToAppIcon />}
        >
          Leave Call
        </Button> */}
        {show ? (
  <Button
  
    variant="contained"
    color="secondary"
    onClick={leave}
    startIcon={<ExitToAppIcon />}
  >
    Leave Call
  </Button>
) : (
  role === "doctor" && (
    <Button
      variant="contained"
      color="primary"
      onClick={startCall}
      disabled={!isConnected || !isPeerReady || !patientJoined}
    >
      Start Call
    </Button>
  )
)}


      </Box>
    </Box>
  );
};

export default VideoCall;