
// import React, { useEffect, useRef, useState } from "react";

// interface VideoCallProps {
//   roomId: string;
//   role: "doctor" | "patient";
//   email?: string;
//   date?: string;
//   slot?: string;
//   onUpdate?: (data: { meetLink?: string; error?: string }) => void;
// }

// const VideoCall: React.FC<VideoCallProps> = ({ roomId, role, email, date, slot, onUpdate }) => {
//   const [error, setError] = useState<string | null>(null);
//   const [meetLink, setMeetLink] = useState<string | null>(null);
//   const websocketRef = useRef<WebSocket | null>(null);
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isPeerReady, setIsPeerReady] = useState(false);
//   const [patientJoined, setPatientJoined] = useState(false);
//   const [doctorJoined, setDoctorJoined] = useState(false);
//   const reconnectAttempts = useRef(0);
//   const maxReconnectAttempts = 5;

//   const pcConfig = {
//     iceServers: [
//       { urls: "stun:stun.l.google.com:19302" },
//       { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" },
//     ],
//   };

//   const connectWebSocket = () => {
//     if (websocketRef.current) {
//       if (websocketRef.current.readyState === WebSocket.OPEN) {
//         console.log(`[${role}] WebSocket already open, readyState: ${websocketRef.current.readyState}`);
//         return;
//       }
//       websocketRef.current.close(1000, "Reconnecting");
//       console.log(`[${role}] Closed stale WebSocket`);
//     }

//     let wsUrl = `ws://localhost:8004/ws/video_call/${roomId}/?role=${role}`;
//     if (role === "doctor") {
//       wsUrl += `&email=${encodeURIComponent(email || "")}&date=${date || ""}&slot=${encodeURIComponent(slot || "")}`;
//     }
//     console.log(`[${role}] Attempting to connect to WebSocket: ${wsUrl}`);
//     websocketRef.current = new WebSocket(wsUrl);

//     console.log(`[${role}] WebSocket initial readyState: ${websocketRef.current.readyState}`);

//     websocketRef.current.onopen = () => {
//       console.log(`[${role}] WebSocket opened successfully, readyState: ${websocketRef.current?.readyState}`);
//       setIsConnected(true);
//       setError(null);
//       reconnectAttempts.current = 0;
//       initializePeerConnection();
//     };

//     websocketRef.current.onmessage = async (event) => {
//       const data = JSON.parse(event.data);
//       console.log(`[${role}] Received WebSocket message:`, data);

//       if (data.status === "connected") {
//         setMeetLink(data.meet_link);
//         onUpdate?.({ meetLink: data.meet_link });
//       } else if (data.error) {
//         setError(data.error);
//         onUpdate?.({ error: data.error });
//       } else if (data.offer) {
//         await handleOffer(data.offer);
//       } else if (data.answer) {
//         await handleAnswer(data.answer);
//       } else if (data.candidate) {
//         await handleCandidate(data.candidate);
//       } else if (data.user_joined) {
//         if (role === "doctor" && data.role === "patient") {
//           setPatientJoined(true);
//           console.log(`[${role}] Patient joined`);
//         }
//         if (role === "patient" && data.role === "doctor") {
//           setDoctorJoined(true);
//           console.log(`[${role}] Doctor joined`);
//           if (isPeerReady) await startCall();
//         }
//       }
//     };

//     websocketRef.current.onerror = (event) => {
//       console.error(`[${role}] WebSocket error occurred:`, {
//         type: event.type,
//         target: {
//           url: websocketRef.current?.url,
//           readyState: websocketRef.current?.readyState,
//         },
//         timestamp: new Date().toISOString(),
//       });
//       setError("WebSocket connection failed");
//     };

//     websocketRef.current.onclose = (event) => {
//       console.log(`[${role}] WebSocket closed. Code: ${event.code}, Reason: ${event.reason || "No reason provided"}`);
//       setIsConnected(false);
//       setPatientJoined(false);
//       setDoctorJoined(false);
//       if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
//         reconnectAttempts.current++;
//         console.log(`[${role}] Reconnecting attempt ${reconnectAttempts.current}/${maxReconnectAttempts}`);
//         setTimeout(connectWebSocket, 1000 * reconnectAttempts.current);
//       }
//     };
//   };

//   const disconnectWebSocket = () => {
//     if (websocketRef.current?.readyState === WebSocket.OPEN) {
//       websocketRef.current.close(1000, "Component unmounted");
//       console.log(`[${role}] WebSocket closed manually`);
//     }
//     if (peerConnectionRef.current) {
//       peerConnectionRef.current.close();
//       console.log(`[${role}] PeerConnection closed`);
//     }
//     setIsConnected(false);
//     setIsPeerReady(false);
//     setPatientJoined(false);
//     setDoctorJoined(false);
//   };

//   const initializePeerConnection = async () => {
//     if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
//       setError("WebSocket not open");
//       console.error(`[${role}] WebSocket not open for peer connection initialization, readyState: ${websocketRef.current?.readyState}`);
//       return;
//     }

//     peerConnectionRef.current = new RTCPeerConnection(pcConfig);

//     peerConnectionRef.current.onicecandidate = (event) => {
//       if (event.candidate && websocketRef.current?.readyState === WebSocket.OPEN) {
//         console.log(`[${role}] Sending ICE candidate:`, event.candidate.toJSON());
//         websocketRef.current.send(JSON.stringify({ candidate: event.candidate.toJSON() }));
//       }
//     };

//     peerConnectionRef.current.ontrack = (event) => {
//       console.log(`[${role}] ontrack event:`, event.streams[0].getTracks());
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//         remoteVideoRef.current.play().catch((err) => console.error(`[${role}] Playback error:`, err));
//         console.log(`[${role}] Remote stream assigned to video element`);
//       } else {
//         console.error(`[${role}] remoteVideoRef is null`);
//       }
//     };

//     peerConnectionRef.current.oniceconnectionstatechange = () => {
//       const state = peerConnectionRef.current?.iceConnectionState;
//       console.log(`[${role}] ICE connection state:`, state);
//       if (state === "failed") {
//         setError("ICE connection failed");
//       }
//     };

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//         console.log(`[${role}] Local stream assigned to video element`);
//       }
//       stream.getTracks().forEach((track) => {
//         peerConnectionRef.current?.addTrack(track, stream);
//         console.log(`[${role}] Added track:`, track);
//       });
//       setIsPeerReady(true);
//       if (role === "patient" && doctorJoined) await startCall();
//     } catch (err) {
//       console.error(`[${role}] Media device error:`, err);
//       setError("Failed to access camera/microphone");
//     }
//   };

//   const startCall = async () => {
//     try {
//       if (!peerConnectionRef.current || websocketRef.current?.readyState !== WebSocket.OPEN) {
//         throw new Error("Peer connection or WebSocket not ready");
//       }
//       const offer = await peerConnectionRef.current.createOffer();
//       await peerConnectionRef.current.setLocalDescription(offer);
//       console.log(`[${role}] Offer created and set:`, offer);
//       websocketRef.current.send(JSON.stringify({ offer }));
//     } catch (err:any) {
//       console.error(`[${role}] Start call error:`, err);
//       setError(`Failed to start call: ${err.message}`);
//     }
//   };

//   const handleOffer = async (offer: RTCSessionDescriptionInit) => {
//     if (!peerConnectionRef.current || websocketRef.current?.readyState !== WebSocket.OPEN) {
//       console.error(`[${role}] Cannot handle offer: Peer or WebSocket not ready`);
//       return;
//     }
//     await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
//     const answer = await peerConnectionRef.current.createAnswer();
//     await peerConnectionRef.current.setLocalDescription(answer);
//     console.log(`[${role}] Answer created and set:`, answer);
//     websocketRef.current.send(JSON.stringify({ answer }));
//   };

//   const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
//     if (!peerConnectionRef.current) {
//       console.error(`[${role}] Cannot handle answer: Peer connection not ready`);
//       return;
//     }
//     await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
//     console.log(`[${role}] Remote description set with answer`);
//   };

//   const handleCandidate = async (candidate: RTCIceCandidateInit) => {
//     if (!peerConnectionRef.current) {
//       console.error(`[${role}] Cannot handle candidate: Peer connection not ready`);
//       return;
//     }
//     await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//     console.log(`[${role}] ICE candidate added`);
//   };

//   useEffect(() => {
//     connectWebSocket();
//     return disconnectWebSocket;
//   }, [roomId, role, email, date, slot]);

//   return (
//     <div>
//       <h2>Video Call - {role}</h2>
//       {error && <p style={{ color: "red" }}>Error: {error}</p>}
//       {meetLink && <p>Meet Link: {meetLink}</p>}
//       {role === "doctor" && patientJoined && <p style={{ color: "green" }}>Patient has joined!</p>}
//       {role === "patient" && doctorJoined && <p style={{ color: "green" }}>Doctor has joined!</p>}
//       <div style={{ display: "flex", gap: "20px" }}>
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           playsInline
//           style={{ width: "300px", border: "5px solid black" }}
//         />
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           playsInline
//           style={{ width: "300px", border: "5px solid black" }}
//         />
//       </div>
//       {role === "doctor" && (
//         <button onClick={startCall} disabled={!isConnected || !isPeerReady || !patientJoined}>
//           Start Call
//         </button>
//       )}
//     </div>
//   );
// };

// export default VideoCall;






import React, { useEffect, useRef, useState } from "react";

interface VideoCallProps {
  roomId: string;
  role: "doctor" | "patient";
  email?: string;
  date?: string;
  slot?: string;
  onUpdate?: (data: { meetLink?: string; error?: string }) => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomId, role, email, date, slot, onUpdate }) => {
  const [error, setError] = useState<string | null>(null);
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const websocketRef = useRef<WebSocket | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPeerReady, setIsPeerReady] = useState(false);
  const [patientJoined, setPatientJoined] = useState(false);
  const [doctorJoined, setDoctorJoined] = useState(false);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const pcConfig = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" },
    ],
  };

  const connectWebSocket = () => {
    if (websocketRef.current) {
      if (websocketRef.current.readyState === WebSocket.OPEN) {
        console.log(`[${role}] WebSocket already open, readyState: ${websocketRef.current.readyState}`);
        return;
      }
      websocketRef.current.close(1000, "Reconnecting");
      console.log(`[${role}] Closed stale WebSocket`);
    }

    let wsUrl = `ws://localhost:8004/ws/video_call/${roomId}/?role=${role}`;
    if (role === "doctor") {
      wsUrl += `&email=${encodeURIComponent(email || "")}&date=${date || ""}&slot=${encodeURIComponent(slot || "")}`;
    }
    console.log(`[${role}] Attempting to connect to WebSocket: ${wsUrl}`);
    websocketRef.current = new WebSocket(wsUrl);

    console.log(`[${role}] WebSocket initial readyState: ${websocketRef.current.readyState}`);

    websocketRef.current.onopen = () => {
      console.log(`[${role}] WebSocket opened successfully, readyState: ${websocketRef.current?.readyState}`);
      setIsConnected(true);
      setError(null);
      reconnectAttempts.current = 0;
      initializePeerConnection();
    };

    websocketRef.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log(`[${role}] Received WebSocket message:`, data);

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
        if (role === "doctor" && data.role === "patient") {
          setPatientJoined(true);
          console.log(`[${role}] Patient joined`);
        }
        if (role === "patient" && data.role === "doctor") {
          setDoctorJoined(true);
          console.log(`[${role}] Doctor joined`);
          if (isPeerReady) await startCall();
        }
      }
    };

    websocketRef.current.onerror = (event) => {
      console.error(`[${role}] WebSocket error occurred:`, {
        type: event.type,
        target: {
          url: websocketRef.current?.url,
          readyState: websocketRef.current?.readyState,
        },
        timestamp: new Date().toISOString(),
      });
      setError("WebSocket connection failed. Check server status.");
    };

    websocketRef.current.onclose = (event) => {
      console.log(`[${role}] WebSocket closed. Code: ${event.code}, Reason: ${event.reason || "No reason provided"}`);
      setIsConnected(false);
      setPatientJoined(false);
      setDoctorJoined(false);
      if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current++;
        console.log(`[${role}] Reconnecting attempt ${reconnectAttempts.current}/${maxReconnectAttempts}`);
        setTimeout(connectWebSocket, 1000 * reconnectAttempts.current);
      } else if (event.code !== 1000) {
        setError("WebSocket connection failed after max retries.");
      }
    };
  };

  const disconnectWebSocket = () => {
    if (websocketRef.current?.readyState === WebSocket.OPEN) {
      websocketRef.current.close(1000, "Component unmounted");
      console.log(`[${role}] WebSocket closed manually`);
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      console.log(`[${role}] PeerConnection closed`);
    }
    setIsConnected(false);
    setIsPeerReady(false);
    setPatientJoined(false);
    setDoctorJoined(false);
  };

  const initializePeerConnection = async () => {
    if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
      setError("WebSocket not open");
      console.error(`[${role}] WebSocket not open for peer connection initialization, readyState: ${websocketRef.current?.readyState}`);
      return;
    }

    peerConnectionRef.current = new RTCPeerConnection(pcConfig);

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate && websocketRef.current?.readyState === WebSocket.OPEN) {
        console.log(`[${role}] Sending ICE candidate:`, event.candidate.toJSON());
        websocketRef.current.send(JSON.stringify({ candidate: event.candidate.toJSON() }));
      }
    };

    let hasStreamBeenSet = false; // Debounce ontrack
    peerConnectionRef.current.ontrack = (event) => {
      console.log(`[${role}] ontrack event:`, event.streams[0].getTracks());
      if (remoteVideoRef.current && !hasStreamBeenSet) {
        remoteVideoRef.current.srcObject = event.streams[0];
        hasStreamBeenSet = true;
        remoteVideoRef.current.onloadedmetadata = () => {
          remoteVideoRef.current?.play()
            .then(() => {
              console.log(`[${role}] Remote stream playback started`);
            })
            .catch((err) => {
              console.error(`[${role}] Playback error:`, err);
            });
        };
      } else if (!remoteVideoRef.current) {
        console.error(`[${role}] remoteVideoRef is null`);
      }
    };

    peerConnectionRef.current.oniceconnectionstatechange = () => {
      const state = peerConnectionRef.current?.iceConnectionState;
      console.log(`[${role}] ICE connection state:`, state);
      if (state === "failed") {
        setError("ICE connection failed");
      }
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        console.log(`[${role}] Local stream assigned to video element`);
      }
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, stream);
        console.log(`[${role}] Added track:`, track);
      });
      setIsPeerReady(true);
      if (role === "patient" && doctorJoined) await startCall();
    } catch (err) {
      console.error(`[${role}] Media device error:`, err);
      setError("Failed to access camera/microphone");
    }
  };

  const startCall = async () => {
    try {
      if (!peerConnectionRef.current || websocketRef.current?.readyState !== WebSocket.OPEN) {
        throw new Error("Peer connection or WebSocket not ready");
      }
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      console.log(`[${role}] Offer created and set:`, offer);
      websocketRef.current.send(JSON.stringify({ offer }));
    } catch (err:any) {
      console.error(`[${role}] Start call error:`, err);
      setError(`Failed to start call: ${err.message}`);
    }
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    if (!peerConnectionRef.current || websocketRef.current?.readyState !== WebSocket.OPEN) {
      console.error(`[${role}] Cannot handle offer: Peer or WebSocket not ready`);
      return;
    }
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    console.log(`[${role}] Answer created and set:`, answer);
    websocketRef.current.send(JSON.stringify({ answer }));
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (!peerConnectionRef.current) {
      console.error(`[${role}] Cannot handle answer: Peer connection not ready`);
      return;
    }
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    console.log(`[${role}] Remote description set with answer`);
  };

  const handleCandidate = async (candidate: RTCIceCandidateInit) => {
    if (!peerConnectionRef.current) {
      console.error(`[${role}] Cannot handle candidate: Peer connection not ready`);
      return;
    }
    await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    console.log(`[${role}] ICE candidate added`);
  };

  useEffect(() => {
    connectWebSocket();
    return disconnectWebSocket;
  }, [roomId, role, email, date, slot]);

  return (
    <div>
      <h2>Video Call - {role}</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {meetLink && <p>Meet Link: {meetLink}</p>}
      {role === "doctor" && patientJoined && <p style={{ color: "green" }}>Patient has joined!</p>}
      {role === "patient" && doctorJoined && <p style={{ color: "green" }}>Doctor has joined!</p>}
      <div style={{ display: "flex", gap: "20px" }}>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          style={{ width: "300px", border: "5px solid black" }}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{ width: "300px", border: "5px solid black" }}
        />
      </div>
      {role === "doctor" && (
        <button onClick={startCall} disabled={!isConnected || !isPeerReady || !patientJoined}>
          Start Call
        </button>
      )}
    </div>
  );
};

export default VideoCall;