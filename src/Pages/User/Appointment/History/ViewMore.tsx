import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Box, Fade } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import Nav from "../../../../Components/Nav"; // Adjust path as needed
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AppointmentInstance } from "../../../../lib/AxiosInstance";
const profileurl = import.meta.env.VITE_API_URL;
// Keyframes for animations
const slideInLeft = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const bounceIn = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components
const JoinRoomContainer = styled(Box)(({ theme }) => ({
    background: "linear-gradient(90deg, #e6f0fa, #b3e0ff)",
    padding: theme.spacing(4),
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "80px",
}));
interface InitiateData {
    doctor_email: string;
    date: string | null;
    slot: string | null;
    amount: string | null;
  }
const ContentWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
    marginTop: theme.spacing(4),
    gap: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    textAlign: "center",
    padding: theme.spacing(3),
    animation: `${slideInLeft} 0.6s ease-out`,
}));

const SlotButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#4caf50",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#45a049",
        animation: `${pulse} 0.3s ease-in-out`,
    },
    margin: theme.spacing(0.5),
    padding: theme.spacing(1, 2),
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: "normal",
    minWidth: "100px",
    transition: "background-color 0.3s, transform 0.2s",
    "&.selected": {
        backgroundColor: "#388e3c",
        transform: "scale(1.05)",
    },
}));

const ActionButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5, 4),
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "16px",
    margin: theme.spacing(1),
    width: "100%",
    maxWidth: "200px",
}));

const ViewMore: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null); // Initially null
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [showRescheduleSlots, setShowRescheduleSlots] = useState<boolean>(false);
    const date = selectedDate ? selectedDate.format("YYYY-MM-DD") : null;
    const location = useLocation();
    const id = location.state.id || null
    const currentdate = location.state.date
    const currentslot = location.state.slot
    //   console.log(date)
    console.log(currentslot)
    console.log(id)
    // Mock doctor data (replace with API call later)

    const { data: doctor } = useQuery({
        queryKey: ["viewmore", id, currentdate, selectedSlot],
        queryFn: async () => {
            const response = await AppointmentInstance.get(`appointment_booking_viewmore/${id}/${currentdate}/${currentslot}/`);
            console.log(response.data.history)
            return response.data.history;
        },
    });
    const doctorid = doctor?.id
    //   console.log(doctor)
    // Mock slots data (replace with API call later)
    const { data: slots } = useQuery({
        queryKey: ["fetchslots2", doctorid, date],
        queryFn: async () => {
            if (!id || !date) return [];
            const response = await AppointmentInstance.get(`slot_fetching/${doctorid}/${date}/`);

            return response.data.slots;
        },
        enabled: !!id && !!date,
    });


    const handleJoin = () => {
        alert("Join functionality to be implemented!"); // Placeholder
    };

    const handleCancel = () => {
        alert("Appointment cancelled!");
    };

    const handleReschedule = () => {
        setShowRescheduleSlots(true); // Show date and slot selection for rescheduling
        setSelectedDate(dayjs()); // Set default to current date
    };
    console.log(selectedSlot)
const {mutate:reschedulemutate}=useMutation({
    mutationFn:async(values:{id:number,date:string|null,slot:string})=>{
        const {data}=await AppointmentInstance.post('/rescheduling/',values)
        return data
    },
    onSuccess:(data)=>{
        console.log(data)
    },
    onError:(error)=>{
        console.log(error)
    }
})
    const handleConfirmReschedule = () => {
        if (selectedDate && selectedSlot) {
            reschedulemutate({id,date,slot:selectedSlot})
            setShowRescheduleSlots(false); // Hide reschedule view after confirmation
            setSelectedDate(null); // Reset date
            setSelectedSlot(null); // Reset slot
        } else {
            alert("Please select a date and slot for rescheduling!");
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <JoinRoomContainer>
                {/* Fixed Navbar */}
                <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
                    <Nav />
                </Box>

                <Fade in={true} timeout={500}>
                    <Box>
                        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#333", textAlign: "center", textTransform: "uppercase", letterSpacing: "1px" }}>
                            Join Consultation Room
                        </Typography>
                    </Box>
                </Fade>

                <ContentWrapper>
                    {/* Doctor Card */}
                    <Fade in={true} timeout={800}>
                        <StyledCard>
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                                    <Box
                                        component="img"
                                        src={`${profileurl}/${doctor?.profile_pic}`}
                                        alt={`${doctor?.first_name} ${doctor?.last_name}`}
                                        sx={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", transition: "transform 0.3s", "&:hover": { transform: "scale(1.1)" } }}
                                    />
                                </Box>
                                <Typography variant="h6" color="error" sx={{ fontWeight: "bold" }}>
                                    {`${doctor?.first_name} ${doctor?.last_name}`}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: "#666" }}>
                                    Department: {doctor?.department}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: "#666" }}>
                                    Experience: {doctor?.years_of_experiance} Years
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: "#666" }}>
                                    Fees: ${doctor?.consultation_fee}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: "#f44336" }}>
                                    Status: {doctor?.status}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Fade>

                    {/* Default View with Buttons */}
                    {!showRescheduleSlots && (
                        <Fade in={true} timeout={1000}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", padding: 3, animation: `${slideInRight} 0.6s ease-out` }}>
                                <ActionButton variant="contained" color="inherit" onClick={handleCancel}>
                                    Cancel
                                </ActionButton>
                                <ActionButton variant="contained" color="error" onClick={handleReschedule}>
                                    Reschedule
                                </ActionButton>
                                <ActionButton variant="contained" color="primary" onClick={handleJoin} disabled={!doctor?.room_created} sx={{ backgroundColor: "#10bf0a", color: "white", "&:hover": { backgroundColor: "#108c0b" }, animation: `${bounceIn} 0.8s ease-out` }}>
                                    Join
                                </ActionButton>
                            </Box>
                        </Fade>
                    )}

                    {/* Reschedule View */}
                    {showRescheduleSlots && (
                        <Fade in={true} timeout={1000}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: 3, animation: `${slideInRight} 0.6s ease-out` }}>
                                <Box mb={3}>
                                    <DatePicker
                                        label="Select a Date"
                                        value={selectedDate}
                                        onChange={(newValue) => {
                                            setSelectedDate(newValue);
                                            setSelectedSlot(null); // Reset slot when date changes
                                        }}
                                        shouldDisableDate={(date) => date.isBefore(dayjs(), "day")}
                                        sx={{
                                            width: "100%",
                                            maxWidth: "250px",
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "8px",
                                                transition: "border-color 0.3s",
                                                "&:hover fieldset": { borderColor: "#4caf50" },
                                                "&.Mui-focused fieldset": { borderColor: "#4caf50" },
                                            },
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, justifyContent: "center", width: "100%", mb: 3 }}>
                                    {slots?.map((slot:any , index:any) => (
                                        <Fade in={true} timeout={1200 + index * 100} key={slot.slot}>
                                            <SlotButton
                                                variant="contained"
                                                onClick={() => setSelectedSlot(slot.slot)}
                                                className={selectedSlot === slot.slot ? "selected" : ""}
                                                sx={{ width: 160 }}
                                                disabled={!slot.is_available}
                                            >
                                                {slot.slot}
                                            </SlotButton>
                                        </Fade>
                                    ))}
                                </Box>

                                <ActionButton variant="contained" color="primary" onClick={handleConfirmReschedule} sx={{ backgroundColor: "#4caf50",color:"white", "&:hover": { backgroundColor: "#45a049" } }}>
                                    Confirm Reschedule
                                </ActionButton>
                                <ActionButton variant="contained" color="inherit" onClick={() => setShowRescheduleSlots(false)} sx={{ mt: 1 }}>
                                    Back
                                </ActionButton>
                            </Box>
                        </Fade>
                    )}
                </ContentWrapper>
            </JoinRoomContainer>
        </LocalizationProvider>
    );
};

export default ViewMore;