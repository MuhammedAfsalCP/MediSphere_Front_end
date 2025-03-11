import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';



const Nav: React.FC = () => {
  const theme = useTheme();
  const navigate=useNavigate()
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
const user=useSelector((state:any)=>state.auth)


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
            onClick={()=>navigate('/')}
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
            onClick={()=>navigate('/AppointmentLayout')}
          >
            Appointment
          </Button>
          <Button
            startIcon={<DescriptionIcon />}
            disabled={true}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': { color: '#00a2ff', backgroundColor: 'transparent' },
            }}
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
            onClick={()=>navigate('/About')}
          >
            About Us
          </Button>
        </Box>
        </Box>

        {/* Right Section: Buttons */}
        <Box sx={{display: 'flex' , gap: 2, alignItems: 'center' }} >
          <Box sx={user.user ? {display:'none'}:{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button
            onClick={()=>navigate('/login')}
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
            onClick={()=>navigate('/userregister')}
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

          <Box sx={user.user ? { display: { xs: 'none', md: 'flex' }, gap: 2 }:{display:'none'}}>
          {/* Notification Icon */}
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile Picture */}
          <IconButton onClick={() => navigate("/profile")} >
            <Avatar src={user?.user?.profilePicture || "/default-avatar.png"} />
          </IconButton>
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
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon><HomeIcon /> </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon><EventIcon /> </ListItemIcon>
              <ListItemText primary="Appointment" />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon><DescriptionIcon /></ListItemIcon>
              <ListItemText primary="Prescription" />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon><ChatIcon /> </ListItemIcon>
              <ListItemText primary="BOT" />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon><InfoIcon /> </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItemButton>
          </ListItem>
      </Drawer>
    </AppBar>
  );
};

export default Nav;
