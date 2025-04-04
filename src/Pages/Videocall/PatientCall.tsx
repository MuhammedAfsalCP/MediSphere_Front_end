// // PatientPage.tsx
// import React, { useState } from "react";
// import VideoCall from "./VideoCall";

// const PatientCall: React.FC = () => {
//   const [roomInput, setRoomInput] = useState<string>("");
//   const [roomName, setRoomName] = useState<string>("");

//   const handleJoinRoom = () => {
//     if (roomInput.trim()) {
//       setRoomName(roomInput.trim());
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Patient Dashboard</h1>
//       {!roomName && (
//         <div style={{ marginBottom: "20px" }}>
//           <input
//             type="text"
//             value={roomInput}
//             onChange={(e) => setRoomInput(e.target.value)}
//             placeholder="Enter Room ID from Doctor"
//             style={{ marginRight: "10px", padding: "5px" }}
//           />
//           <button onClick={handleJoinRoom} disabled={!roomInput.trim()}>
//             Join Room
//           </button>
//         </div>
//       )}
//       {roomName && <VideoCall />}
//     </div>
//   );
// };

// export default PatientCall;






// import React, { useState } from "react";
// import VideoCall from "./VideoCall";

// const PatientPage: React.FC = () => {
//   const [roomId, setRoomId] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

//   const handleJoinRoom = () => {
//     const inputRoomId = prompt("Enter Room ID from Doctor:");
//     if (!inputRoomId) {
//       setError("Room ID is required.");
//       return;
//     }
//     // Basic UUID format check (e.g., 61e0b3ab-b334-4fdc-a7ba-337ab2bfc54a)
//     const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
//     if (!uuidRegex.test(inputRoomId)) {
//       setError("Invalid Room ID format. It should be a UUID (e.g., 61e0b3ab-b334-4fdc-a7ba-337ab2bfc54a).");
//       return;
//     }
//     setRoomId(inputRoomId);
//     setError(null);
//   };

//   const handleVideoCallUpdate = (data: { meetLink?: string; error?: string }) => {
//     if (data.error) {
//       setError(data.error);
//       setRoomId(""); // Reset roomId on error to allow retry
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Patient Dashboard</h1>
//       {!roomId ? (
//         <button onClick={handleJoinRoom}>Join Video Call</button>
//       ) : (
//         <>
//           <p>Connected to Room ID: {roomId}</p>
//           {error && <p style={{ color: "red" }}>Error: {error}</p>}
//           <VideoCall
//             roomId={roomId}
//             role="patient"
//             onUpdate={handleVideoCallUpdate}
//           />
//           <button onClick={() => setRoomId("")}>Leave Room</button>
//         </>
//       )}
//       {error && !roomId && <p style={{ color: "red" }}>Error: {error}</p>}
//     </div>
//   );
// };

// export default PatientPage;





import React, { useEffect, useState } from "react";
import VideoCall from "./VideoCall";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const PatientPage: React.FC = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const link = location.state || null;
const navigate=useNavigate()
  useEffect(() => {
    if (link) {
      setRoomId(link);
    }
  }, [link]);

  const handleVideoCallUpdate = (data: { meetLink?: string; error?: string }) => {
    if (data.error) {
      setError(data.error);
      setRoomId(""); // Reset roomId on error
    }
  };
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
            setRoomId("")
        navigate("/")
    
            toast.success("Successfully leaved"); // Show success message
            // Navigate to homepage
          }
        });
}
  return (
    <Box sx={{ p: 3, maxWidth: "1200px", mx: "auto" }}>
      {!roomId ? (
        <Typography variant="h6" align="center" color="textSecondary">
          Please join a room to start the video call.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* <Typography variant="body1" align="center">
            Connected to Room ID: {roomId}
          </Typography> */}
          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}
          <VideoCall
            roomId={roomId}
            role="patient"
            onUpdate={handleVideoCallUpdate}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
            
              variant="contained"
              color="secondary"
              startIcon={<ExitToAppIcon />}
              onClick={leave}
              sx={{ mt: 2 }}
              
            >
              Leave Room
            </Button>
          </Box>
        </Box>
      )}
      {error && !roomId && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default PatientPage;