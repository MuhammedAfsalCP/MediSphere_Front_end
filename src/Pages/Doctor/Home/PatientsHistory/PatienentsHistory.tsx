// PatienentsHistory.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableRowProps,
  Paper,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppointmentInstance } from "../../../../lib/AxiosInstance";

// Sample data for 10 patients' history
interface Details {
  first_name: string;
  last_name:string;
  profile_pic:string;
  date_of_birth: string;
  gender: string;
  visited_times?: number;
  
}


// Extend Material-UI TableRow props to include Framer Motion props
interface MotionTableRowProps extends TableRowProps {
  // Add any additional props if needed
}

// Create a MotionTableRow component that combines TableRow with motion.tr
const MotionTableRow = motion(
  forwardRef<HTMLTableRowElement, MotionTableRowProps>((props, ref) => (
    <TableRow ref={ref} {...props} />
  ))
);

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: "#333",
  borderBottom: "1px solid #e0e0e0",
  padding: theme.spacing(1.5),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
    padding: theme.spacing(1),
  },
}));

const StyledTableRow = styled(MotionTableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  "&:last-child td, &:last-child th": {
    borderBottom: 0,
  },
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: "300px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    transition: "border-color 0.3s",
    "&:hover fieldset": { borderColor: "#4caf50" },
    "&.Mui-focused fieldset": { borderColor: "#4caf50" },
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const PaginationButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: "#4caf50",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#45a049",
  },
  "&:disabled": {
    backgroundColor: "#cccccc",
  },
}));

const PatienentsHistory: React.FC = () => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter patients based on search term
  
  const { data: userHistoryData } = useQuery<Details[]>({
    queryKey: ["fetchusershistory"],
    queryFn: async () => {
      
      const response = await AppointmentInstance.get(`allhistory/`);
      return response.data.History;
    }
  });
  console.log(userHistoryData)
  const filteredData = userHistoryData?.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Animation variants for table rows
  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1, // Staggered animation for each row
        duration: 0.5,
      },
    }),
  };

  return (
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
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Patient History
      </Typography>

      {/* Search Input in Right Corner */}
      <Box
        sx={{
          mb: 3,
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "flex-end", // Align search input to the right
        }}
      >
        <SearchInput
          label="Search by Patient Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ animation: "fadeIn 0.5s ease-in-out" }}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "1200px",
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="user history table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Patient Name</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Visited Times</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData && filteredData.length > 0 ? (
              filteredData?.map((user, index) => (
                <StyledTableRow
                  key={index}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <StyledTableCell>
                    <Avatar sx={{ bgcolor: "#e0e0e0", width: 32, height: 32 }}>
                      <PersonIcon sx={{ color: "#666" }} />
                    </Avatar>
                  </StyledTableCell>
                  <StyledTableCell>{user.first_name} {user.last_name}</StyledTableCell>
                  <StyledTableCell align="center">{user.date_of_birth}</StyledTableCell>
                  <StyledTableCell align="center">{user.gender}</StyledTableCell>
                  <StyledTableCell align="center">{user.visited_times}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={5} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No patients found
                  </Typography>
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dummy Pagination Buttons */}
      
    </Box>
  );
};

export default PatienentsHistory;