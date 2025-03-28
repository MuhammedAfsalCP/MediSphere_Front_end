// Availability.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Fade,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs, { Dayjs } from "dayjs";
import { styled, keyframes } from "@mui/material/styles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppointmentInstance } from "../../../../lib/AxiosInstance";
import { useSelector } from "react-redux";

// Define Slot interface
interface Slot {
  slot: string;
  date: string;
  booked: boolean;
  is_available?: boolean;
  id:number; // Optional, based on your API response
}

// Keyframes for animations
const slideInLeft = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;
const slideInRight = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;
const bounceIn = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
`;

// Styled components
const SlotButton = styled("button")(({ theme }) => ({
  backgroundColor: "#4caf50", // Default green for available slots
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
  minWidth: "120px",
  transition: "background-color 0.3s, transform 0.2s",
  border: "none",
  cursor: "pointer",
  "&.selected": {
    backgroundColor: "#388e3c",
    transform: "scale(1.05)",
  },
  "&:disabled": {
    backgroundColor: "#e0e0e0", // Gray for already created slots
    color: "#666", // Darker text for contrast
    cursor: "not-allowed",
  },
}));

const AddSlotButton = styled("button")(({ theme }) => ({
  backgroundColor: "#f44336",
  color: "#fff",
  "&:hover": { backgroundColor: "#da190b", animation: `${pulse} 0.3s ease-in-out` },
  padding: theme.spacing(1.5, 4),
  borderRadius: "5px",
  fontWeight: "bold",
  fontSize: "16px",
  marginTop: theme.spacing(2),
  width: "100%",
  maxWidth: "200px",
  animation: `${bounceIn} 0.8s ease-out`,
  border: "none",
  cursor: "pointer",
  "&:disabled": { backgroundColor: "#cccccc", cursor: "not-allowed" },
}));

// Sample available time slots to add (30-minute intervals)
const availableTimeSlotsToAdd = [
  "09:00 am - 10:00 am",
  "10:00 am - 11:00 am",
  "11:00 am - 12:00 pm",
  "12:00 pm - 1:00 pm",
  "1:00 pm - 2:00 pm",
  "2:00 pm - 3:00 pm",
  "3:00 pm - 4:00 pm",
  "4:00 pm - 5:00 pm",
  "5:00 pm - 6:00 pm",
  "6:00 pm - 7:00 pm",
  "7:00 pm - 8:00 pm",
  "8:00 pm - 9:00 pm",
];

// const initialCreatedSlots: Slot[] = [
//   { slot: "09:00 am - 10:00 am", date: "2025-03-27", booked: false },
//   { slot: "10:00 am - 11:00 am", date: "2025-03-27", booked: true },
//   { slot: "11:00 am - 12:00 pm", date: "2025-03-27", booked: false },
// ];



const Availability: React.FC = () => {
  // State for selected date
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  // State for selected slot to add
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Get user ID from Redux store
  const { user } = useSelector((state: any) => state.auth);
  const id = user?.userdetail?.id;
  const date = selectedDate ? selectedDate.format("YYYY-MM-DD") : null;
const queryClient=useQueryClient()
  // Fetch slots using React Query
  const { data: createdSlots } = useQuery<Slot[]>({
    queryKey: ["fetchstatus", id, date],
    queryFn: async () => {
      if (!id || !date) return [];
      const response = await AppointmentInstance.get(`slot_fetching/${id}/${date}/`);
      return response.data.slots;
    },
    enabled: !!id && !!date,
  });
  const SlotMutation = useMutation({
    mutationFn: async (values: { date: string|null; slot: string |null}) => {
      const response = await AppointmentInstance.post('/doctor_slot_creating/', values);
      return response.data;
    },
    onSuccess:()=>{
     
      
      queryClient.invalidateQueries({queryKey:["fetchstatus",id,date]})
    }
  });
  const handleAddSlot=()=>{
    SlotMutation.mutate({date,slot:selectedSlot})
  }
  const DeleteMutation = useMutation({
    mutationFn: async (values: { id: number|null}) => {
      const response = await AppointmentInstance.post('/slotdeleting/', values);
      return response.data;
    },
    onSuccess:()=>{
      
      
      queryClient.invalidateQueries({queryKey:["fetchstatus",id,date]})
    }
  });
  const handleDeleteSlot=(id:number)=>{
    DeleteMutation.mutate({id})
  }
console.log(createdSlots)
  // Set default date to current date on component mount
  useEffect(() => {
    setSelectedDate(dayjs());
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          width: "100%",
          margin: "0 auto",
          background: "linear-gradient(90deg, #f0f8ff, #ffffff)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Fade in={true} timeout={500}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Create Availability Slots
          </Typography>
        </Fade>

        {/* Date Picker */}
        <Fade in={true} timeout={800}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
              animation: `${slideInLeft} 0.6s ease-out`,
            }}
          >
            <DatePicker
              label="Select a Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
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
        </Fade>

        {/* Created Slots */}
        {selectedDate && (
          <>
            <Fade in={true} timeout={800}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  mb: 3,
                  maxWidth: "1200px",
                  width: "100%",
                  mx: "auto",
                  animation: `${slideInLeft} 0.6s ease-out`,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    mb: 2,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    textAlign: "center",
                  }}
                >
                  Created Slots for {selectedDate.format("dddd, MMMM D, YYYY")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  {createdSlots?.map((slot: Slot, index: number) => (
                    <Fade in={true} timeout={1200 + index * 100} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          textAlign: "center",
                          backgroundColor: !slot.is_available ? "#f7e7e7" : "#e7f3e7",
                          position: "relative",
                          minWidth: { xs: "120px", sm: "150px" },
                          minHeight: "100px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          flex: "0 1 auto",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "0.9rem", md: "1rem" },
                            fontWeight: 500,
                            color: "#333",
                            mb: 1,
                          }}
                        >
                          {slot.slot}
                        </Typography>
                        <Chip
                          label={!slot.is_available ? "Booked" : "Available"}
                          color={!slot.is_available ? "error" : "success"}
                          size="small"
                        />
                        {slot.is_available && (
                          <IconButton
                            onClick={() => handleDeleteSlot(slot.id)}
                            sx={{
                              position: "absolute",
                              top: 4,
                              right: 4,
                              padding: "4px",
                              "&:hover": { backgroundColor: "rgba(231, 76, 60, 0.1)" },
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: "1.2rem", color: "#e74c3c" }} />
                          </IconButton>
                        )}
                      </Box>
                    </Fade>
                  ))}
                </Box>
                {createdSlots?.length === 0 && (
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "center", color: "#666", mt: 2 }}
                  >
                    No slots created for this date yet.
                  </Typography>
                )}
              </Paper>
            </Fade>

            {/* Add Slot Section */}
            <Fade in={true} timeout={1000}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: "1200px",
                  width: "100%",
                  padding: 3,
                  animation: `${slideInRight} 0.6s ease-out`,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    mb: 2,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    textAlign: "center",
                  }}
                >
                  Add a New Slot for {selectedDate.format("dddd, MMMM D, YYYY")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 1,
                    mb: 3,
                    width: "100%",
                  }}
                >
                  {availableTimeSlotsToAdd.map((slot, index) => {
                    const slotExists = createdSlots?.some(
                      (createdSlot) => createdSlot.slot === slot
                    );
                    return (
                      <Fade in={true} timeout={1200 + index * 100} key={index}>
                        <SlotButton
                          onClick={() => setSelectedSlot(slot)}
                          className={selectedSlot === slot ? "selected" : ""}
                          disabled={slotExists} // This triggers the gray color
                          sx={{

                            flex: "0 1 auto",
                            minWidth: { xs: "120px", sm: "140px" },
                          }}
                        >
                          {slot}
                          {slotExists && (
                            <Chip
                              label="Added"
                              color="success"
                              size="small"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </SlotButton>
                      </Fade>
                    );
                  })}
                </Box>
                <AddSlotButton
                  onClick={handleAddSlot}
                  disabled={!selectedSlot}
                >
                  Add Slot
                </AddSlotButton>
              </Box>
            </Fade>
          </>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default Availability;