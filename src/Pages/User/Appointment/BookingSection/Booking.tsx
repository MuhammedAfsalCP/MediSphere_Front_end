import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Box, Fade } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import Nav from "../../../../Components/Nav";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AppointmentInstance } from "../../../../lib/AxiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
import Swal from 'sweetalert2'
// Load Razorpay script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Keyframes for animations (unchanged)
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

// Styled components (unchanged)
const BookingContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(90deg, #f0f8ff, #ffffff)",
  padding: theme.spacing(4),
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "80px",
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "flex-start",
  width: "100%",
  maxWidth: "1200px",
  flexWrap: "wrap",
  marginTop: theme.spacing(4),
  gap: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "300px",
  width: "100%",
  textAlign: "center",
  padding: theme.spacing(2),
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
  minWidth: "120px",
  transition: "background-color 0.3s, transform 0.2s",
  "&.selected": {
    backgroundColor: "#388e3c",
    transform: "scale(1.05)",
  },
}));

const BookNowButton = styled(Button)(({ theme }) => ({
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
}));

const profileurl = import.meta.env.VITE_API_URL;

// Define types for mutation data
interface InitiatePaymentData {
  doctor_email: string;
  date: string | null;
  slot: string | null;
  amount: string | null;
}

interface VerifyPaymentData {
  doctor_email: string;
  date: string | null;
  slot: string | null;
  amount: string | null;
  payment_id: string;
  order_id: string;
  signature: string;
}

const Booking: React.FC = () => {
  const user = useSelector((state: any) => state.auth);
  const token = user.token; // Assuming token is stored in Redux state
  const location = useLocation();
  const id = location.state || null;
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const date = selectedDate ? selectedDate.format("YYYY-MM-DD") : null;

  const { data: details, isLoading } = useQuery({
    queryKey: ["fetchspecificdoctor", id],
    queryFn: async () => {
      const response = await AppointmentInstance.get(`specific_doctor_fetching/${id}/`);
      return response.data;
    },
  });

  const { data: slots } = useQuery({
    queryKey: ["fetchslots", id, date],
    queryFn: async () => {
      if (!id || !date) return [];
      const response = await AppointmentInstance.get(`slot_fetching/${id}/${date}/`);
      
      return response.data.slots;
    },
    enabled: !!id && !!date,
  });

  // Mutation for initiating payment
  const initiatePaymentMutation = useMutation({
    mutationFn: async (values: InitiatePaymentData) => {
      const response = await AppointmentInstance.post("/book_appointment/", values);
      return response.data;
    },
    onError: (err: any) => {
      console.error("Payment initiation error:", err);
      const errorMessage = err?.response?.data?.error || "Failed to initiate payment";
      alert(errorMessage);
    },
  });

  // Mutation for verifying payment and booking
  const verifyPaymentMutation = useMutation({
    mutationFn: async (values: VerifyPaymentData) => {
      const response = await AppointmentInstance.post("/book_appointment/", values);
      return response.data;
    },
    onSuccess: (data) => {
      alert("Appointment booked successfully!");
      Swal.fire({
        title: "Payment Successfully Completed",
        icon: "success",
        draggable: true
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/");
        }
      });
       // Redirect to dashboard or confirmation page
    },
    onError: (err: any) => {
      console.error("Booking error:", err);
      const errorMessage = err?.response?.data?.error || "Failed to book appointment";
      alert(errorMessage);
    },
  });

  // Handle payment with Razorpay
  const handlePayment = async () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and slot before booking!");
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Failed to load Razorpay SDK. Please check your internet connection.");
      return;
    }

    // Step 1: Initiate payment
    initiatePaymentMutation.mutate(
      {
        doctor_email: details?.doctor?.email,
        date,
        slot: selectedSlot,
        amount: details?.doctor?.consultation_fee.toString(),
      },
      {
        onSuccess: (data) => {
          const options = {
            key: "rzp_test_KVYa3j27SRKqtq", // Replace with your Razorpay key
            amount: details?.doctor?.consultation_fee * 100, // In paise
            currency: "INR",
            name: "Doctor Appointment Booking",
            description: `Booking with Dr. ${details?.doctor?.first_name} ${details?.doctor?.last_name}`,
            order_id: data.order_id,
            handler: function (response: any) {
              // Step 2: Verify payment and book appointment
              verifyPaymentMutation.mutate({
                doctor_email: details.doctor.email,
                date,
                slot: selectedSlot,
                amount: details?.doctor?.consultation_fee.toString(),
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
              });
            },
            prefill: {
              email: user.user.userdetail.email,
              contact: user.user.userdetail.mobile_number,
            },
            theme: {
              color: "#4caf50",
            },
          };

          const razorpay = new (window as any).Razorpay(options);
          razorpay.open();
        },
      }
    );
  };
console.log(details)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BookingContainer>
        <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
          <Nav />
        </Box>

        <Fade in={true} timeout={500}>
          <Box>
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
              Schedule Your Appointment
            </Typography>
          </Box>
        </Fade>

        <ContentWrapper>
          <Fade in={true} timeout={800}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    component="img"
                    src={`${profileurl}/media/${details?.doctor?.profile_pic}`}
                    alt={`${details?.doctor?.first_name} ${details?.doctor?.last_name}`}
                    sx={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  />
                </Box>
                <Typography variant="h6" color="error" sx={{ fontWeight: "bold" }}>
                  {`${details?.doctor?.first_name} ${details?.doctor?.last_name}`}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#666" }}>
                  Department: {details?.doctor?.department}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#666" }}>
                  Experience: {details?.doctor?.years_of_experiance} Years
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#666" }}>
                  Fees: ${details?.doctor?.consultation_fee}
                </Typography>
              </CardContent>
            </StyledCard>
          </Fade>

          <Fade in={true} timeout={1000}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                maxWidth: "500px",
                width: "100%",
                padding: 3,
                animation: `${slideInRight} 0.6s ease-out`,
              }}
            >
              <Box mb={3}>
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

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 1,
                  justifyContent: "center",
                  width: "100%",
                  mb: 3,
                }}
              >
                {slots?.map((slot: any, index: any) => (
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

              <BookNowButton
                variant="contained"
                onClick={handlePayment}
                disabled={initiatePaymentMutation.isPending || verifyPaymentMutation.isPending}
              >
                {initiatePaymentMutation.isPending || verifyPaymentMutation.isPending ? "Processing..." : "BOOK NOW"}
              </BookNowButton>
            </Box>
          </Fade>
        </ContentWrapper>
      </BookingContainer>
    </LocalizationProvider>
  );
};

export default Booking;