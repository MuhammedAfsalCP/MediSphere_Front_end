// Dashboard.tsx
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import Nav from "../Nav/Nav";

// Dummy data for charts
const revenueData = [
  { day: "01", last8Days: 2, lastWeek: 1 },
  { day: "02", last8Days: 3, lastWeek: 2 },
  { day: "03", last8Days: 1, lastWeek: 3 },
  { day: "04", last8Days: 4, lastWeek: 2 },
  { day: "05", last8Days: 3, lastWeek: 1 },
  { day: "06", last8Days: 2, lastWeek: 3 },
  { day: "07", last8Days: 5, lastWeek: 2 },
  { day: "08", last8Days: 3, lastWeek: 1 },
  { day: "09", last8Days: 2, lastWeek: 1 },
  { day: "10", last8Days: 4, lastWeek: 2 },
  { day: "11", last8Days: 3, lastWeek: 1 },
  { day: "12", last8Days: 2, lastWeek: 3 },
];

const bookingTimeData = [
  { name: "Morning", value: 28 },
  { name: "Afternoon", value: 40 },
  { name: "Evening", value: 32 },
];

const bookingsData = [
  { day: "01", last6Days: 500, lastWeek: 600 },
  { day: "02", last6Days: 400, lastWeek: 500 },
  { day: "03", last6Days: 600, lastWeek: 400 },
  { day: "04", last6Days: 300, lastWeek: 500 },
  { day: "05", last6Days: 700, lastWeek: 600 },
  { day: "06", last6Days: 500, lastWeek: 400 },
];

// Colors for the donut chart
const COLORS = ["#D3E5F5", "#87CEEB", "#4682B4"];

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        p: { xs: 1, md: 2 }, // Reduced padding for the main container
        minHeight: "100vh",
        width: "100%", // Total width is 80%
        margin: "0 auto", // Center the container
        background: "#f5f7fa", // Light background similar to the image
      }}
    >
      
      {/* Top Row: Revenue and Booking Time */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on desktop
          gap: 2, // Reduced gap between sections
          mb: 3, // Reduced margin bottom for separation
          width: "100%", // Ensure the row takes the full width of the parent (80%)
        }}
      >
        {/* Revenue Section */}
        <Paper
          elevation={3}
          sx={{
            p: 2, // Reduced padding inside the Paper
            borderRadius: "8px", // Slightly smaller border radius
            background: "#fff",
            flex: { md: 2 }, // Takes 2/3 of the row on desktop
            width: { xs: "100%", md: "auto" }, // Full width on mobile
            minHeight: { xs: "auto", md: "350px" }, // Reduced height on desktop
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Box>
              <Typography variant="h6" sx={{ color: "#333", fontSize: "1rem" }}>
                Revenue
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#333", fontWeight: 700, fontSize: "1.5rem" }}
              >
                IDR 7,852,000
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "green", fontWeight: 500, fontSize: "0.75rem" }}
              >
                ↑ 2.1% vs last week
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#666", fontSize: "0.75rem" }}
              >
                Booking from 1-12 Dec, 2020
              </Typography>
            </Box>
            
          </Box>
          <Box sx={{ overflowX: "auto", width: "100%" }}>
            <BarChart
              width={500} // Reduced width to fit better
              height={200} // Reduced height
              data={revenueData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="last8Days" fill="#4682B4" name="Last 8 days" />
              <Bar dataKey="lastWeek" fill="#D3E5F5" name="Last Week" />
            </BarChart>
          </Box>
        </Paper>

        {/* Booking Time Section */}
        <Paper
          elevation={3}
          sx={{
            p: 2, // Reduced padding inside the Paper
            borderRadius: "8px", // Slightly smaller border radius
            background: "#fff",
            flex: { md: 1 }, // Takes 1/3 of the row on desktop
            width: { xs: "100%", md: "auto" }, // Full width on mobile
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: { xs: "auto", md: "350px" }, // Reduced height on desktop
          }}
        >
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="h6" sx={{ color: "#333", fontSize: "1rem" }}>
                Booking Time
              </Typography>
              
            </Box>
            <Typography
              variant="body2"
              sx={{ color: "#666", mb: 1, fontSize: "0.75rem" }}
            >
              From 1-6 Dec, 2020
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PieChart width={150} height={150}>
                <Pie
                  data={bookingTimeData}
                  cx={75}
                  cy={75}
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bookingTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }}>
            {bookingTimeData.map((entry, index) => (
              <Box key={entry.name} sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "#666", fontSize: "0.75rem" }}
                >
                  {entry.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: COLORS[index], fontWeight: 700, fontSize: "1rem" }}
                >
                  {entry.value}%
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Bottom Row: Bookings */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%", // Ensure the section takes the full width of the parent (80%)
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2, // Reduced padding inside the Paper
            borderRadius: "8px", // Slightly smaller border radius
            background: "#fff",
            width: "100%", // Full width within the 80% container
            minHeight: { xs: "auto", md: "300px" }, // Reduced height on desktop
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Box>
              <Typography variant="h6" sx={{ color: "#333", fontSize: "1rem" }}>
                Bookings
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#333", fontWeight: 700, fontSize: "1.5rem" }}
              >
                2,568
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "red", fontWeight: 500, fontSize: "0.75rem" }}
              >
                ↓ 2.1% vs last week
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#666", fontSize: "0.75rem" }}
              >
                Booking from 1-6 Dec, 2020
              </Typography>
            </Box>
            
          </Box>
          <Box sx={{ overflowX: "auto", width: "100%" }}>
            <LineChart
              width={600} // Reduced width to fit better
              height={200} // Reduced height
              data={bookingsData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="last6Days"
                stroke="#4682B4"
                name="Last 6 days"
              />
              <Line
                type="monotone"
                dataKey="lastWeek"
                stroke="#D3E5F5"
                name="Last Week"
              />
            </LineChart>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;