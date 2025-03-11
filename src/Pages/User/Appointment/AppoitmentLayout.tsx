import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Nav from '../../../Components/Nav';


// Mock data for doctors
const doctors = [
  {
    name: 'Doctor Name',
    specialization: 'Department',
    experience: 2,
    fees: 300,
  },
  {
    name: 'Doctor Name',
    specialization: 'Department',
    experience: 2,
    fees: 300,
  },
  {
    name: 'Doctor Name',
    specialization: 'Department',
    experience: 2,
    fees: 300,
  },
];

const specializations = [
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
];

const AppointmentLayout: React.FC = () => {
  const [filter, setFilter] = React.useState<string>('');

  const filteredDoctors = filter
    ? doctors.filter((doctor) => doctor.specialization === filter)
    : doctors;

  return (
    <div>
        <Nav/>
        <Box sx={{ background: 'linear-gradient(90deg, #f0f8ff, #ffffff)', minHeight: '100vh' }}>
      {/* Top Navbar */}
      

      <Box className="flex">
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 200,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 200,
              background: 'linear-gradient(180deg, #f0f8ff, #ffffff)',
              borderRight: 'none',
              marginTop:9
            },
          }}
        >
          <Box className="p-4">
            <Typography variant="h6" className="text-blue-900 font-semibold">
              Doctors
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="History" className="text-blue-900" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box className="flex-1 p-6">
          {/* Specialization Filter */}
          <Box className="flex justify-end mb-6">
            <TextField
              select
              label="Specialization"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{
                width: 200,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0.5rem',
                  background: 'white',
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              {specializations.map((spec) => (
                <MenuItem key={spec} value={spec}>
                  {spec}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Doctors Grid */}
          <Grid container spacing={3}>
            {filteredDoctors.map((doctor, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    border: '2px solid #e0f7fa',
                    borderRadius: '0.5rem',
                    background: 'white',
                    boxShadow: 'none',
                  }}
                  className="flex flex-col items-center p-4"
                >
                  <CardContent className="text-center">
                    {/* Doctor Avatar */}
                    <Box className="mb-4">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="Doctor Avatar"
                        className="w-12 h-12 mx-auto"
                      />
                    </Box>

                    <Typography variant="h6" className="text-black mb-2">
                      {doctor.name}
                    </Typography>
                    <Typography className="text-gray-600">
                      Specialization: {doctor.specialization}
                    </Typography>
                    <Typography className="text-gray-600">
                      Years of Experience: {doctor.experience}
                    </Typography>
                    <Typography className="text-gray-600 mb-4">
                      Fees: {doctor.fees}
                    </Typography>

                    {/* Book Now Button */}
                    <Button
                      variant="contained"
                      className="bg-red-500 hover:bg-red-600"
                      sx={{
                        borderRadius: '0.5rem',
                        textTransform: 'none',
                        px: 4,
                      }}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
    </div>
  );
};

export default AppointmentLayout;