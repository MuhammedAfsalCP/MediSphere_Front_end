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
const SlotButton = styled("button")(({ theme }) => ({
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
  minWidth: "120px",
  transition: "background-color 0.3s, transform 0.2s",
  border: "none",
  cursor: "pointer",
  "&.selected": {
    backgroundColor: "#388e3c",
    transform: "scale(1.05)",
  },
  "&:disabled": {
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
  },
}));

const AddSlotButton = styled("button")(({ theme }) => ({
  backgroundColor: "#f44336",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#da190b",
    animation: `${pulse} 0.3s ease-in-out`,
  },
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
  "&:disabled": {
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
  },
}));

// Sample available time slots to add (30-minute intervals)
const availableTimeSlotsToAdd = [
  "09:00 AM - 09:30 AM",
  "09:30 AM - 10:00 AM",
  "10:00 AM - 10:30 AM",
  "10:30 AM - 11:00 AM",
  "11:00 AM - 11:30 AM",
  "11:30 AM - 12:00 PM",
  "12:00 PM - 12:30 PM",
  "12:30 PM - 01:00 PM",
  "01:00 PM - 01:30 PM",
  "01:30 PM - 02:00 PM",
  "02:00 PM - 02:30 PM",
  "02:30 PM - 03:00 PM",
  "03:00 PM - 03:30 PM",
  "03:30 PM - 04:00 PM",
  "04:00 PM - 04:30 PM",
  "04:30 PM - 05:00 PM",
];

// Sample initial slots with booking status (for demo purposes)
const initialCreatedSlots = [
  { time: "09:00 AM - 09:30 AM", date: "2025-03-27", booked: false },
  { time: "10:00 AM - 10:30 AM", date: "2025-03-27", booked: true },
  { time: "11:00 AM - 11:30 AM", date: "2025-03-27", booked: false },
];

const Availability: React.FC = () => {
  // State for created slots with booking status
  const [createdSlots, setCreatedSlots] = useState<
    { time: string; date: string; booked: boolean }[]
  >(initialCreatedSlots);
  // State for selected date
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs()); // Default to current date
  // State for selected slot to add
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Set default date to current date on component mount
  useEffect(() => {
    setSelectedDate(dayjs()); // Set to current date (March 27, 2025)
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle adding a new time slot
  const handleAddSlot = () => {
    if (!selectedDate || !selectedSlot) return;

    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const newSlot = { time: selectedSlot, date: formattedDate, booked: false };

    // Check if the slot already exists for the selected date
    const slotExists = createdSlots.some(
      (slot) => slot.time === selectedSlot && slot.date === formattedDate
    );

    if (slotExists) {
      alert("This slot has already been created for the selected date!");
      return;
    }

    setCreatedSlots((prev) => [...prev, newSlot]);
    setSelectedSlot(null);
  };

  // Handle deleting a time slot
  const handleDeleteSlot = (slotToDelete: { time: string; date: string; booked: boolean }) => {
    if (slotToDelete.booked) {
      alert("This slot cannot be deleted because it is already booked!");
      return;
    }

    setCreatedSlots((prev) =>
      prev.filter(
        (slot) => !(slot.time === slotToDelete.time && slot.date === slotToDelete.date)
      )
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          width: "100%", // Full width as specified
          margin: "0 auto",
          background: "linear-gradient(90deg, #f0f8ff, #ffffff)", // Match Booking.tsx background
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
                  width: "100%", // Ensure full width within container
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
                    gap: 2, // Space between slots
                  }}
                >
                  {createdSlots
                    .filter((slot) => slot.date === selectedDate.format("YYYY-MM-DD"))
                    .map((slot, index) => (
                      <Fade in={true} timeout={1200 + index * 100} key={index}>
                        <Box
                          sx={{
                            p: 2,
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            textAlign: "center",
                            backgroundColor: slot.booked ? "#f7e7e7" : "#e7f3e7",
                            position: "relative",
                            minWidth: { xs: "120px", sm: "150px" }, // Responsive width
                            minHeight: "100px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: "0 1 auto", // Allow flex items to shrink/grow as needed
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
                            {slot.time}
                          </Typography>
                          <Chip
                            label={slot.booked ? "Booked" : "Available"}
                            color={slot.booked ? "error" : "success"}
                            size="small"
                          />
                          {!slot.booked && (
                            <IconButton
                              onClick={() => handleDeleteSlot(slot)}
                              sx={{
                                position: "absolute",
                                top: 4,
                                right: 4,
                                padding: "4px",
                                "&:hover": {
                                  backgroundColor: "rgba(231, 76, 60, 0.1)",
                                },
                              }}
                            >
                              <DeleteIcon
                                sx={{
                                  fontSize: "1.2rem",
                                  color: "#e74c3c",
                                }}
                              />
                            </IconButton>
                          )}
                        </Box>
                      </Fade>
                    ))}
                </Box>
                {createdSlots.filter((slot) => slot.date === selectedDate.format("YYYY-MM-DD"))
                  .length === 0 && (
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
                    gap: 1, // Smaller gap for buttons
                    mb: 3,
                    width: "100%",
                  }}
                >
                  {availableTimeSlotsToAdd.map((slot, index) => {
                    const slotExists = createdSlots.some(
                      (createdSlot) =>
                        createdSlot.time === slot &&
                        createdSlot.date === selectedDate.format("YYYY-MM-DD")
                    );
                    return (
                      <Fade in={true} timeout={1200 + index * 100} key={index}>
                        <SlotButton
                          onClick={() => setSelectedSlot(slot)}
                          className={selectedSlot === slot ? "selected" : ""}
                          disabled={slotExists}
                          sx={{
                            flex: "0 1 auto", // Allow buttons to shrink/grow
                            minWidth: { xs: "120px", sm: "140px" }, // Responsive width
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