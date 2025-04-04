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
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import { AppointmentInstance } from "../../../../lib/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
const profileurl = import.meta.env.VITE_API_URL;

interface Details {
  id: number;
  slot: string;
  date: string;
  status: string;
  patient_first_name: string;
  patient_last_name: string;
  patient_image: string;

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
  const navigate = useNavigate()
  const { data: appointmentsData } = useQuery<Details[]>({
    queryKey: ["fetchpatients"],
    queryFn: async () => {

      const response = await AppointmentInstance.get(`appointmenthistory/`);
      return response.data.history;
    },

  });
  // console.log(appointmentsData)
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
                  <img src={`${profileurl}/media/${row.patient_image}`} alt="Avatar"
                    className="w-7 h-7" />
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
                    // component={Link}
                    // to="/patientdetails" // Placeholder for navigation
                    onClick={() => navigate('/patientdetails', { state: row.id })}
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