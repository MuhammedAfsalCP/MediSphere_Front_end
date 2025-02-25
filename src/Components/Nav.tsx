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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Logo from '../assets/Logo.png'; // Replace with your actual logo import
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';

function Nav() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {[
          { text: 'Home', icon: <HomeIcon /> },
          { text: 'Appointment', icon: <EventIcon /> },
          { text: 'Prescription', icon: <DescriptionIcon /> },
          { text: 'BOT', icon: <ChatIcon /> },
          { text: 'About Us', icon: <InfoIcon /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>

        ))}
      </List>
    </Box>
  );

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
          <Button
            startIcon={<HomeIcon />}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': { color: '#00a2ff', backgroundColor: 'transparent' },
            }}
          >
            Home
          </Button>
          <Button
            startIcon={<EventIcon />}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': { color: '#00a2ff', backgroundColor: 'transparent' },
            }}
          >
            Appointment
          </Button>
          <Button
            startIcon={<DescriptionIcon />}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': { color: '#00a2ff', backgroundColor: 'transparent' },
            }}
          >
            Prescription
          </Button>
          <Button
            startIcon={<ChatIcon />}
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
          >
            About Us
          </Button>
        </Box>

        {/* Right Section: Buttons */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button
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
              variant="contained"
              sx={{
                backgroundColor: '#00a2ff',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#007acc' },
                color:'white'
              }}
            >
              Register
            </Button>
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
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Nav;