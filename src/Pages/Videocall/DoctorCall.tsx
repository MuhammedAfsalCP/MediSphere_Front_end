// // DoctorPage.tsx
// import React, { useState } from "react";
// import VideoCall from "./VideoCall";
// // Install: npm install uuid

// const DoctorCall: React.FC = () => {
//   const [roomId, setRoomId] = useState<string>("");

  

//   const handleCreateRoom = () => {
//     const newRoomId = "4e6f659f-1b10-4038-987f-f418c081976d";
//     setRoomId(newRoomId);
//     console.log(`Share this Room ID with the patient: ${newRoomId}`);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Doctor Dashboard</h1>
//       S{!roomId && (
//         <button onClick={handleCreateRoom}>Create Video Call Room</button>
//       )}
//       {roomId && (
//         <>
//           <p>Room ID: {roomId} (Share this with the patient)</p>
//           <VideoCall  />
//         </>
//       )}
//     </div>
//   );
// };

// export default DoctorCall;

// DoctorPage.tsx




// import React, { useState } from "react";
// import VideoCall from "./VideoCall";

// const DoctorPage = () => {
//   const [email, setEmail] = useState("");
//   const [date, setDate] = useState("");
//   const [slot, setSlot] = useState("");
//   const [roomId, setRoomId] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   const createRoom = () => {
//     if (!email || !date || !slot) {
//       setErrorMessage("Please fill in all fields.");
//       return;
//     }
//     const newRoomId = crypto.randomUUID();
//     setRoomId(newRoomId); // Set roomId to trigger VideoCall rendering
//     setErrorMessage("");
//   };

//   const handleVideoCallUpdate = (data: { meetLink?: string; error?: string }) => {
//     if (data.error) {
//       setErrorMessage(data.error);
//       setRoomId(null); // Reset roomId on error to allow retry
//     }
//   };

//   return (
//     <div>
//       <h1>Doctor Video Call</h1>
//       {!roomId ? (
//         <>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//           />
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//           <input
//             type="text"
//             value={slot}
//             onChange={(e) => setSlot(e.target.value)}
//             placeholder="Enter slot (e.g., 8:00)"
//           />
//           <button onClick={createRoom}>Create Video Call Room</button>
//         </>
//       ) : (
//         <>
//           <p>Room ID: {roomId}</p>
//           <VideoCall
//             roomId={roomId}
//             role="doctor"
//             email={email}
//             date={date}
//             slot={slot}
//             onUpdate={handleVideoCallUpdate}
//           />
//           <button onClick={() => setRoomId(null)}>Leave Room</button>
//         </>
//       )}
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default DoctorPage;





import React, { useEffect, useState } from "react";
import VideoCall from "./VideoCall";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AppointmentInstance } from "../../lib/AxiosInstance";
interface Details {
 email:string;
 slot:string;
 date:string;
 amount:string;
 room_id :number
  
}
const DoctorPage = () => {
  // const [email, setEmail] = useState("");
  // const [date, setDate] = useState("");
  // const [slot, setSlot] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const location=useLocation()
  const id=location.state || null;
  console.log(id)
  
  const { data: appointmentDetils } = useQuery<Details>({
    queryKey: ["fetchdetails"],
    queryFn: async () => {
      
      const response = await AppointmentInstance.get(`doctorcall/${id}/`);
      return response.data.Details;
    },
    enabled:!!id
    
  });
  console.log(appointmentDetils)
 useEffect(()=>{
  const newRoomId = crypto.randomUUID();
  setRoomId(newRoomId);
  
 },[])
 console.log(roomId)
 console.log(appointmentDetils?.date)
  const handleVideoCallUpdate = (data: { meetLink?: string; error?: string }) => {
    if (data.error) {
      setErrorMessage(data.error);
      setRoomId(null); // Reset on error
    }
  };

  return (
    <div>
      {roomId ? (
        <VideoCall
          roomId={roomId}  // TypeScript knows `roomId` is `string` here
          role="doctor"
          email={appointmentDetils?.email}
          date={appointmentDetils?.date}
          slot={appointmentDetils?.slot}
          amount={appointmentDetils?.amount}
          table_id={appointmentDetils?.room_id}
          onUpdate={handleVideoCallUpdate}
        />
      ) : (
        <p>Loading room...</p>  // Or any fallback UI
      )}
    </div>
  );
};

export default DoctorPage;