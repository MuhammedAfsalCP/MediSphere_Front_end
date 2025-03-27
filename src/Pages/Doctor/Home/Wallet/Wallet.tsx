// Wallet.tsx
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
  TextField,
  Button,
  ButtonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { forwardRef } from "react";

// Sample transaction data with 7 withdrawal transactions
const transactionData = [
  {
    date: "2025-03-26",
    time: "14:30",
    transactionId: "TXN123456789",
    amount: -50.0,
    status: "Completed",
  },
  {
    date: "2025-03-25",
    time: "09:15",
    transactionId: "TXN987654321",
    amount: -200.0,
    status: "Completed",
  },
  {
    date: "2025-03-24",
    time: "18:45",
    transactionId: "TXN456789123",
    amount: -120.0,
    status: "Completed",
  },
  {
    date: "2025-03-23",
    time: "12:00",
    transactionId: "TXN789123456",
    amount: -75.5,
    status: "Pending",
  },
  {
    date: "2025-03-22",
    time: "16:20",
    transactionId: "TXN321654987",
    amount: -30.0,
    status: "Completed",
  },
  {
    date: "2025-03-21",
    time: "10:10",
    transactionId: "TXN654987321",
    amount: -90.0,
    status: "Pending",
  },
  {
    date: "2025-03-20",
    time: "15:45",
    transactionId: "TXN147258369",
    amount: -150.0,
    status: "Completed",
  },
];

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

// Extend Material-UI Button props to include Framer Motion props
interface MotionButtonProps extends ButtonProps {
  // Add any additional props if needed
}

// Create a MotionButton component that combines Button with motion.button
const MotionButton = motion(
  forwardRef<HTMLButtonElement, MotionButtonProps>((props, ref) => (
    <Button ref={ref} {...props} />
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

const WalletBalanceCard = styled(motion.div)(({ theme }) => ({
  textAlign: "center",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(3),
  width: "100%",
  maxWidth: "1200px",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const BalanceText = styled(motion(Typography))(({ theme }) => ({
  color: "#4caf50",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const ActionButton = styled(MotionButton)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: "#4caf50",
  color: "#fff",
  borderRadius: "8px",
  padding: theme.spacing(1, 3),
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#45a049",
  },
}));

const Wallet: React.FC = () => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter transactions based on search term (filter by Transaction ID)
  const filteredData = transactionData.filter((transaction) =>
    transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants for the wallet balance card
  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation variants for the balance text
  const balanceTextVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
    },
  };

  // Animation variants for the Redeem button
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)" },
    tap: { scale: 0.95 },
  };

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
      {/* Wallet Balance Section with Framer Motion */}
      <WalletBalanceCard
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 1,
          }}
        >
          Wallet Balance
        </Typography>
        <BalanceText
          variant="h3"
          variants={balanceTextVariants}
          initial="hidden"
          animate="visible"
        >
          $2,054.50
        </BalanceText>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <ActionButton
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Redeem
          </ActionButton>
        </Box>
      </WalletBalanceCard>

      {/* Transaction History Section */}
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
        Transaction History
      </Typography>

      {/* Search Input */}
      <Box
        sx={{
          mb: 3,
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <SearchInput
          label="Search by Transaction ID"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ animation: "fadeIn 0.5s ease-in-out" }}
        />
      </Box>

      {/* Transaction Table with Framer Motion */}
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
        <Table sx={{ minWidth: 650 }} aria-label="transaction history table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Transaction ID</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((transaction, index) => (
                <StyledTableRow
                  key={index}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <StyledTableCell>{transaction.date}</StyledTableCell>
                  <StyledTableCell>
                    {transaction.status === "Completed" ? transaction.transactionId : ""}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography
                      sx={{
                        color:
                          transaction.status === "Completed"
                            ? "#4caf50"
                            : "#f44336",
                        fontWeight: 500,
                      }}
                    >
                      {transaction.status === "Completed"
                        ? "Payment Completed"
                        : "Payment is Pending"}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: "#f44336", // All amounts are negative, so always red
                    }}
                  >
                    −${Math.abs(transaction.amount).toFixed(2)}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={4} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No transactions found
                  </Typography>
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Wallet;