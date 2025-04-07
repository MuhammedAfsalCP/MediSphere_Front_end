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
import { useQuery } from "@tanstack/react-query";
import { AppointmentInstance } from "../../../lib/AxiosInstance";

// Dummy data for charts


// Colors for the donut chart
const COLORS = ["#D3E5F5", "#87CEEB", "#4682B4"];
export interface WeeklyGraphEntry {
  date: string;
  appointments: number;
  earnings: string;
}
const Dashboard: React.FC = () => {

  const { data: bookingTime } = useQuery({
    queryKey: ["dashboard_bookint_time"],
    queryFn: async () => {
      
      const response = await AppointmentInstance.get(`bookingtimes/`);
      return response.data.Booking_Times;
    }
  });
  const { data: weekly_earnings } = useQuery({
    queryKey: ["weekly_earnings"],
    queryFn: async () => {
      
      const response = await AppointmentInstance.get(`weekly_earnings/`);
      return response.data
      ;
    }
  });
  console.log(weekly_earnings)
  const bookingTimeData = [
    { name: "Morning", value: bookingTime?.morning_bookings },
    { name: "Afternoon", value: bookingTime?.afternoon_bookings },
    { name: "Evening", value: bookingTime?.evening_bookings},
  ];
  const revenueData = weekly_earnings?.weekly_graph?.map((entry:WeeklyGraphEntry, i:number) => ({
    day: entry.date, // Full date (e.g., "2025-03-31")
    Bookings: entry.appointments,
    earnings:entry.earnings,
    index: i + 1 // Sequential index starting at 1 (1, 2, 3, 4, 5, 6, 7)
  }));

  const bookingsData = weekly_earnings?.weekly_graph?.map((entry:WeeklyGraphEntry, i:number) => ({
    day: i + 1, // Sequential index (1 to 7) for X-axis
    last10Days: entry.appointments, // Current week's appointments
    // lastWeek: 0 // No data for last week yet
  }));
  console.log(revenueData)
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
               IND {weekly_earnings?.Weekly_Earnings}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "green", fontWeight: 500, fontSize: "0.75rem" }}
              >
               last 10 Days
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
              <XAxis dataKey="index" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
        formatter={(value, name) => [value, name]}
        labelFormatter={(label) => revenueData[label - 1]?.day || label} // Show full date in tooltip
      />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="earnings" fill="#4682B4" name="Bookings" />
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
              Last One Month
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
                  {entry.value}
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
                {weekly_earnings?.weekly_total_appointments}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "red", fontWeight: 500, fontSize: "0.75rem" }}
              >
               
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#666", fontSize: "0.75rem" }}
              >
                Booking Last 10 days
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
                dataKey="last10Days"
                stroke="#4682B4"
                name="Last 10 days"
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