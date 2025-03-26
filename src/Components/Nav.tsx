import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  IconButton,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Avatar,
  List,
} from '@mui/material';
import Logo from '../assets/Logo.png'; // Replace with your actual logo import
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { TokenInstance } from '../lib/AxiosInstance';
import { FetchUser,logout } from "../Redux/Slices/AuthSlice";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import ProfileDropdown from '../utils/materialui/Profiledropdown';
const apiUrl = import.meta.env.VITE_API_URL;

const Nav: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const user = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()
  const [dpClick, setDpClick] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const token = localStorage.getItem("token")
  const { data, isLoading } = useQuery({
    queryKey: ["fetchuser"],
    queryFn: async () => {
      const response = await TokenInstance.get('/userdetailsget/')

      return response.data
    },
    enabled: !!token
  })
  useEffect(() => {

    if (data) {
      dispatch(FetchUser(data))
    }



  }, [data])
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());  // Dispatch the logout action to clear user data
        navigate('/');

        toast.success("Successfully Logout"); // Show success message
        // Navigate to homepage
      }
    });
    
    // Redirect the user to the login page after logging out
  };
  const handleLogoutlap = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        setDpClick(false);
        dispatch(logout());  // Dispatch the logout action to clear user data
        navigate('/');

        toast.success("Successfully Logout"); // Show success message
        // Navigate to homepage
      }
    });
    
    
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, #f0f8ff, #ffffff)',
        color: theme.palette.text.primary,
        borderBottom: '2px solid #00a2ff',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, lg: 4 },
        }}
      >
        {/* Left Section: Logo + Brand Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src={Logo} alt="MediSphere Logo" style={{ width: 28, height: 27 }} />
          <Typography
            variant="h6"
            component="a"
            href="#"
            sx={{
              color: '#00a2ff',
              fontWeight: 'bold',
              textDecoration: 'none',
              '&:hover': { opacity: 0.8 },
            }}
          >
            MediSphere
          </Typography>
        </Box>

        {/* Middle Section: Navigation Links (Hidden on Mobile) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: 3,
            }}
          >
            <Button
              startIcon={<HomeIcon />}
              sx={{
                color: theme.palette.text.primary,
                '&:hover': { color: '#00a2ff', backgroundColor: 'transparent' },
              }}
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Button
              startIcon={<EventIcon />}
              disabled={!user?.user}
              sx={{
                color: theme.palette.text.primary,
                '&:hover': { color: '#00a2ff', backgroundColor: 'transparent' },
              }}
              onClick={() => navigate('/AppointmentLayout')}
            >
              Appointment
            </Button>
            <Button
              startIcon={<DescriptionIcon />}
              disabled={!user?.user}
              sx={{
                color: theme.palette.text.primary,
                '&:hover': { color: '#00a2ff', backgroundColor: 'transparent' },
              }}
              onClick={() => navigate('/prescriptions')}
            >
              Prescription
            </Button>
            <Button
              startIcon={<ChatIcon />}
              disabled={true}
              sx={{
                color: theme.palette.text.primary,
                '&:hover': { color: '#00a2ff', backgroundColor: 'transparent' },
              }}
            >
              BOT
            </Button>
            <Button
              startIcon={<InfoIcon />}
              sx={{
                color: theme.palette.text.primary,
                '&:hover': { color: '#00a2ff', backgroundColor: 'transparent' },
              }}
              onClick={() => navigate('/About')}
            >
              About Us
            </Button>
          </Box>
        </Box>

        {/* Right Section: Buttons */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }} >
          <Box sx={user.user ? { display: 'none' } : { display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button
              onClick={() => navigate('/login')}
              variant="outlined"

              sx={{
                color: theme.palette.text.primary,
                borderColor: '#00a2ff',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#00a2ff', color: '#fff' },
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/userregister')}
              variant="contained"
              sx={{
                backgroundColor: '#00a2ff',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#007acc' },
                color: 'white',
              }}
            >
              Register
            </Button>
          </Box>

          <Box sx={user.user ? { display: { xs: 'none', md: 'flex' }, gap: 2 } : { display: 'none' }}>
            {/* Notification Icon */}
            <IconButton>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Profile Picture */}
            <IconButton  onClick={() => setDpClick(!dpClick)}>
              <Avatar src={`${apiUrl}${user?.user?.userdetail?.profile_pic}` || "/default-avatar.png"} />
            </IconButton>
            {dpClick && (
        <ProfileDropdown
          user={user?.user?.userdetail}
          dpClick={dpClick}
          setDpClick={setDpClick}
          handleLogout={handleLogoutlap}
        />
      )}
            
          </Box>



          {/* Hamburger Menu for Mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250, display: "flex", flexDirection: "column", justifyContent: "space-between" },
        }}
      >
        {/* Navigation List */}
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton disabled={!user?.user} onClick={() => navigate('/AppointmentLayout')}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Appointment" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton disabled={!user?.user} onClick={() => navigate('/prescriptions')}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Prescription" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton disabled={true}>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="BOT" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/About')}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("/profile")}>
          <Avatar
            src={`${apiUrl}${user?.user?.userdetail?.profile_pic}` || "/default-avatar.png"}
            sx={{ width: 40, height: 40, mr: 2 }} // Margin-right for spacing
            alt="Profile"
          />
          <ListItemText primary="Profile" />
        </ListItemButton>
      </ListItem>
        </List>

        {/* Sign In and Sign Up Buttons at the Bottom */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            borderTop: "1px solid #e0e0e0",
          }}
        >
          {user?.user ? (
            <Button
              variant="contained"
              color="error" // Red color for logout
              fullWidth
              sx={{
                textTransform: "none",
                bgcolor: "#d32f2f", // Custom red
                "&:hover": { bgcolor: "#b71c1c" }, // Darker red on hover
              }}
              onClick={handleLogout} // Use provided handler or placeholder
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  color: "#fff",
                  borderColor: "#00a2ff",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#00a2ff", color: "#fff" },
                }}
                onClick={() => navigate('/login')} // Replace with sign-in logic
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={() => navigate('/userregister')} // Replace with sign-up logic
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>

      </Drawer>
    </AppBar>
  );
};

export default Nav;
