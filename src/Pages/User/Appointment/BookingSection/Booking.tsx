import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";


// Styled components with Tailwind and MUI
const BookingContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#e6f0fa", // Light blue background from the reference
  padding: theme.spacing(4),
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "300px",
  width: "100%",
  margin: "0 auto",
  textAlign: "center",
  padding: theme.spacing(2),
}));

const SlotButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#4caf50", // Green from the reference
  color: "#fff",
  "&:hover": {
    backgroundColor: "#45a049",
  },
  margin: theme.spacing(0.5),
  padding: theme.spacing(1, 2),
  borderRadius: "5px",
  fontSize: "14px",
  fontWeight: "normal",
}));

const BookNowButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f44336", // Red from the reference
  color: "#fff",
  "&:hover": {
    backgroundColor: "#da190b",
  },
  padding: theme.spacing(1.5, 4),
  borderRadius: "5px",
  fontWeight: "bold",
  fontSize: "16px",
  marginTop: theme.spacing(2),
}));

const Booking: React.FC = () => {
  // Sample doctor data (replace with API call if needed)
  const [selectedDoctor] = useState<Doctor>({
    id: 1,
    profilePic: "https://via.placeholder.com/100",
    firstName: "Doctor",
    lastName: "Name",
    yearsOfExperience: 2,
    consultationFee: 300,
    department: "Cardiology",
  });

  // State for selected date and slot
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Slots as per the reference
  const slots = [
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 1:00",
    "3:00 - 4:00",
    "4:00 - 5:00",
    "5:00 - 6:00",
    "6:00 - 7:00",
    "7:00 - 8:00",
    "8:00 - 9:00",
  ];

  const handleBookNow = () => {
    if (selectedDate && selectedSlot) {
      alert(
        `Booking confirmed with ${selectedDoctor.firstName} ${selectedDoctor.lastName} on ${selectedDate} at ${selectedSlot} for $${selectedDoctor.consultationFee}`
      );
    } else {
      alert("Please select a date and slot before booking!");
    }
  };

  return (
    <BookingContainer>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={4}>
        <Typography variant="h5" sx={{ color: "#1976d2", fontWeight: "bold" }}>
          MediSphere
        </Typography>
      </Box>

      {/* Doctor Card */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" color="error" sx={{ fontWeight: "bold" }}>
            {selectedDoctor.firstName} {selectedDoctor.lastName}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666" }}>
            Department: {selectedDoctor.department}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666" }}>
            Year of Experience: {selectedDoctor.yearsOfExperience}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666" }}>
            Fees: ${selectedDoctor.consultationFee}
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mt: 2, textAlign: "left" }}>
            Specialization with a passion for excellent patient care, diagnosing and treating conditions or diseases in the committed area of expertise.
          </Typography>
        </CardContent>
      </StyledCard>

      {/* Date and Slot Selection */}
      <Box mt={4} textAlign="center">
        <Box mb={2}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "200px",
            }}
          />
        </Box>

        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
          {slots.map((slot) => (
            <SlotButton
              key={slot}
              variant="contained"
              onClick={() => setSelectedSlot(slot)}
              className={selectedSlot === slot ? "bg-green-700" : ""}
            >
              {slot}
            </SlotButton>
          ))}
        </Box>

        <BookNowButton variant="contained" onClick={handleBookNow}>
          BOOK NOW
        </BookNowButton>
      </Box>
    </BookingContainer>
  );
};

export default Booking;