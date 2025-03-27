// DashboardLayout.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HistoryIcon from "@mui/icons-material/History";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, Outlet } from "react-router-dom";
import Dashboard from "../Home/DashBoard";
import Nav from "../Nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import { showing } from "../../../Redux/Slices/DashboardSlice";
import { FetchUser } from "../../../Redux/Slices/AuthSlice";
import { useQuery } from "@tanstack/react-query";
import { TokenInstance } from "../../../lib/AxiosInstance";
const DashboardLayout: React.FC = () => {
  const {show} = useSelector((state: any) => state.dash)
  const dispatch =useDispatch()
console.log(show)
const token = localStorage.getItem("token")
const user = useSelector((state: any) => state.auth)
const { data, isLoading,error } = useQuery({
  queryKey: ["fetchuser"],
  queryFn: async () => {
    const response = await TokenInstance.get('/userdetailsget/')

    return response.data
  },
  
  enabled: !!token
  
})
  console.log(user)
  useEffect(() => {

      if (data) {
        dispatch(FetchUser(data))
      }
      
  
  
  
    }, [data])
    console.log(user)
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <Nav />

      {/* Sidebar for desktop, hidden on mobile */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Box
          sx={{
            width: "20%", // 20% width on desktop
            height: "93vh", // Adjusted height below Nav
            background: "linear-gradient(180deg, #f0f8ff, #2DBDFE)",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: 50, // Offset for Nav height
            left: 0,
            boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          }}
        >
          {/* Top List (Dashboard, Appointments, Availability, User History) */}
          <List sx={{ mt: 2 }}>
            <ListItem disablePadding>
              <ListItemButton
              component={Link} // Use Link as the component
              to="/dashboard"
              onClick={()=>dispatch(showing())}
                sx={{
                  px: 3, // Horizontal padding for better alignment
                  py: 1.5, // Vertical padding for spacing
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.05)", // Hover effect
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#333", minWidth: "40px" }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{ color: "#333", fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
              component={Link} // Use Link as the component
              to="/appointments"
              onClick={()=>dispatch(showing())}
                sx={{
                  px: 3,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#333", minWidth: "40px" }}>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Appointments"
                  sx={{ color: "#333", fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
              component={Link} // Use Link as the component
              to="/availability"
              onClick={()=>dispatch(showing())}
                sx={{
                  px: 3,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#333", minWidth: "40px" }}>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Availability"
                  sx={{ color: "#333", fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
              onClick={()=>dispatch(showing())}
                sx={{
                  px: 3,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#333", minWidth: "40px" }}>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary="User History"
                  sx={{ color: "#333", fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          </List>

          {/* Spacer to push Wallet to the bottom */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Bottom List (Wallet) */}
          <List sx={{ mb: 2 }}>
            <ListItem disablePadding>
              <ListItemButton
              onClick={()=>dispatch(showing())}
                sx={{
                  px: 3,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Hover effect for darker background
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
                  <AccountBalanceWalletIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Wallet"
                  sx={{ color: "#fff", fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 }, // Responsive padding
          ml: { md: "20%" }, // Offset for sidebar width on desktop
           // Offset for Nav height
          minHeight: "100vh",
          background: "linear-gradient(90deg, #f0f8ff, #ffffff)", // Match your previous background
        }}
      >
        {show ?<Dashboard/>:<Outlet/>}
      </Box>
    </Box>
  );
};

export default DashboardLayout;