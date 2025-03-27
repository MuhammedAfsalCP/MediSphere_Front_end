// PatientDetails.tsx
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import MedicalReport from "../../../../assets/Frame 215.png";
import Prescription from "./Prescription";

// Sample patient data (you can replace this with dynamic data)
const patientData = {
  name: "John Doe",
  age: 19,
  gender: "Male",
  bloodGroup: "A+",
  address: "123 Main Street, Springfield, IL, 62701, USA",
  email: "test@gmail.com",
  phone: "9876543210",
};

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2, // Staggered delay for each section
      duration: 0.5,
    },
  }),
};

// Animation variants for the button
const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.6, // Delay to appear after the sections
      duration: 0.3,
    },
  },
};

const PatientDetails: React.FC = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 }, // Responsive padding
        width: "100%", // Full width
        margin: "0 auto", // Center the container
        background: "#f5f7fa", // Light background similar to the reference
        minHeight: "100vh", // Full height for the page
      }}
    >
      {/* Patient Info and Contact Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 4,
          justifyContent: "space-between",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* Patient Info */}
        <Paper
          component={motion.div} // Use motion.div for animation
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0} // First section (delay: 0s)
          elevation={3}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: "12px",
            width: { xs: "100%", sm: "48%" },
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#333",
              mb: 2,
              textAlign: "left",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            Patient Information
          </Typography>
          <Typography
            sx={{
              color: "#666",
              mb: 1,
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 500,
            }}
          >
            <strong>Name:</strong> {patientData.name}
          </Typography>
          <Typography
            sx={{
              color: "#666",
              mb: 1,
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 500,
            }}
          >
            <strong>Age:</strong> {patientData.age}
          </Typography>
          <Typography
            sx={{
              color: "#666",
              mb: 1,
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 500,
            }}
          >
            <strong>Gender:</strong> {patientData.gender}
          </Typography>
          <Typography
            sx={{
              color: "#666",
              mb: 1,
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 500,
            }}
          >
            <strong>Blood Group:</strong> {patientData.bloodGroup}
          </Typography>
          <Typography
            sx={{
              color: "#666",
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 500,
            }}
          >
            <strong>Address:</strong> {patientData.address}
          </Typography>
        </Paper>

        {/* Contact Info and Create Session Button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: { xs: "100%", sm: "48%" },
          }}
        >
          <Paper
            component={motion.div} // Use motion.div for animation
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={1} // Second section (delay: 0.2s)
            elevation={3}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: "12px",
              backgroundColor: "#fff",
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#333",
                mb: 2,
                textAlign: "left",
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              Contact Information
            </Typography>
            <Typography
              sx={{
                color: "#666",
                mb: 1,
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: 500,
              }}
            >
              <strong>Email:</strong> {patientData.email}
            </Typography>
            <Typography
              sx={{
                color: "#666",
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: 500,
              }}
            >
              <strong>Phone:</strong> {patientData.phone}
            </Typography>
          </Paper>
          <Button
            component={motion.div} // Use motion.div for animation
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }} // Slight scale on hover
            whileTap={{ scale: 0.95 }} // Slight scale down on tap
            sx={{
              backgroundColor: "#2ecc71",
              color: "#fff",
              "&:hover": { backgroundColor: "#27ae60" },
              textTransform: "none",
              fontSize: { xs: "0.9rem", md: "1rem" },
              padding: { xs: "6px 12px", md: "8px 16px" },
              borderRadius: "8px",
            }}
          >
            <Link
              to="/create-session"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Create Session
            </Link>
          </Button>
        </Box>
      </Box>

      {/* Medical Report and Prescription Section (Side by Side) */}
      <Box
        sx={{
          width: { xs: "100%", md: "90%" },
          maxWidth: "1200px",
          margin: "0 auto",
          mb: 4,
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: { xs: "center", md: "space-between" },
        }}
      >
        {/* Medical Report (Left Side) */}
        <Box
          component={motion.div} // Use motion.div for animation
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={2} // Third section (delay: 0.4s)
          sx={{
            flex: 1,
            minWidth: { xs: "100%", sm: "300px" },
            maxWidth: "400px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#333",
              mb: 2,
              textAlign: "center",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            Medical Report
          </Typography>
          <img
            src={MedicalReport}
            alt="Medical Report"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Box>

        {/* Prescription (Right Side) */}
        <Box
          component={motion.div} // Use motion.div for animation
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={3} // Fourth section (delay: 0.6s)
          sx={{
            flex: 1,
            minWidth: { xs: "100%", sm: "300px" },
            maxWidth: "400px",
            height: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#333",
              mb: 2,
              textAlign: "center",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            Prescription
          </Typography>
          <Prescription />
        </Box>
      </Box>
    </Box>
  );
};

export default PatientDetails;