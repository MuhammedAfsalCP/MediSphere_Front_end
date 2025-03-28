// Appointments.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import { AppointmentInstance } from "../../../../lib/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

// Updated dummy data with 10 patients
// const appointmentsData = [
//   {
//     id: 1,
//     patientName: "John Doe",
//     date: "18-06-2024",
//     status: "Pending",
//     time: "10:00 TO 11:00 am",
//   },
//   {
//     id: 2,
//     patientName: "Jane Smith",
//     date: "19-06-2024",
//     status: "Completed",
//     time: "11:00 TO 12:00 pm",
//   },
//   {
//     id: 3,
//     patientName: "Emily Johnson",
//     date: "20-06-2024",
//     status: "Completed",
//     time: "09:00 TO 10:00 am",
//   },
//   {
//     id: 4,
//     patientName: "Michael Brown",
//     date: "21-06-2024",
//     status: "Pending",
//     time: "14:00 TO 15:00 pm",
//   },
//   {
//     id: 5,
//     patientName: "Sarah Davis",
//     date: "22-06-2024",
//     status: "Completed",
//     time: "13:00 TO 14:00 pm",
//   },
//   {
//     id: 6,
//     patientName: "David Wilson",
//     date: "23-06-2024",
//     status: "Pending",
//     time: "15:00 TO 16:00 pm",
//   },
//   {
//     id: 7,
//     patientName: "Lisa Anderson",
//     date: "24-06-2024",
//     status: "Completed",
//     time: "10:30 TO 11:30 am",
//   },
//   {
//     id: 8,
//     patientName: "Robert Taylor",
//     date: "25-06-2024",
//     status: "Pending",
//     time: "16:00 TO 17:00 pm",
//   },
//   {
//     id: 9,
//     patientName: "Kelly Martinez",
//     date: "26-06-2024",
//     status: "Completed",
//     time: "08:00 TO 09:00 am",
//   },
//   {
//     id: 10,
//     patientName: "Thomas Lee",
//     date: "27-06-2024",
//     status: "Pending",
//     time: "12:00 TO 13:00 pm",
//   },
// ];
interface Details {
  slot: string;
  date: string;
  status:string;
  patient_first_name:string;
  patient_last_name:string;
  id:number; // Optional, based on your API response
}
// Framer Motion animation variants for table rows
const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Staggered delay for each row
      duration: 0.5,
    },
  }),
};

const Appointments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: appointmentsData } = useQuery<Details[]>({
    queryKey: ["fetchpatients"],
    queryFn: async () => {
      
      const response = await AppointmentInstance.get(`appointmenthistory/`);
      return response.data.history;
    },
    
  });

  const handleSearch = () => {
    // Filter appointmentsData based on searchTerm (placeholder logic)
    console.log("Searching for:", searchTerm);
    // You can add filtering logic here, e.g., filter appointmentsData
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 }, // Responsive padding
        width: "100%", // Full width as specified
        margin: "0 auto", // Center the container
        background: "#f5f7fa", // Light background similar to the image
      }}
    >
      {/* Header with Search Field */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap", // Allow wrapping on smaller screens
          gap: 2, // Add gap for spacing on wrap
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#333",
            fontWeight: 600,
            fontSize: { xs: "1.25rem", md: "1.5rem" }, // Responsive font size
          }}
        >
          Appointments
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#666" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: "250px" }, // Full width on mobile, fixed width on larger screens
            backgroundColor: "#fff",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#4682B4",
              },
              "&:hover fieldset": {
                borderColor: "#5a9bd4",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#4682B4",
              },
            },
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: "12px",
          width: "100%", // Ensure table takes full width of the container
          overflowX: "auto", // Allow horizontal scrolling on smaller screens
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="appointments table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#333", py: 1.5 }}></TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#333", py: 1.5 }}>
                Patient Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#333", py: 1.5 }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#333", py: 1.5 }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#333", py: 1.5 }}>
                Time
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#333", py: 1.5 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentsData?.map((row, index) => (
              <TableRow
                key={row.id}
                component={motion.tr} // Use motion.tr for animation
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                custom={index} // Pass index for staggered animation
              >
                <TableCell sx={{ py: 1 }}>
                  <PersonIcon sx={{ color: "#666" }} />
                </TableCell>
                <TableCell sx={{ py: 1 }}>{row.patient_first_name} {row.patient_last_name}</TableCell>
                <TableCell sx={{ py: 1 }}>{row.date}</TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Typography
                    sx={{
                      color: row.status === "Pending" ? "#f39c12" : "#2ecc71",
                      fontWeight: 500,
                    }}
                  >
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 1 }}>{row.slot}</TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Button
                    component={Link}
                    to="/patientdetails" // Placeholder for navigation
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor:
                        row.status === "Pending" ? "#2ecc71" : "#95a5a6",
                      "&:hover": {
                        backgroundColor:
                          row.status === "Pending" ? "#27ae60" : "#7f8c8d",
                      },
                      fontSize: "0.875rem",
                      padding: "4px 12px",
                    }}
                  >
                    View More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Buttons (Display Only) */}
      
    </Box>
  );
};

export default Appointments;