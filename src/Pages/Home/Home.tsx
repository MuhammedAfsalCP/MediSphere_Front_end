import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import image from '../../assets/Vector.png'; // Replace with your actual image import
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import About from '../../Components/About';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(90deg, #f0f8ff, #ffffff)',
  animation: `${fadeIn} 1s ease-in-out`,
  padding: theme.spacing(6, 0),
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0),
  },
}));

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Nav />
      <HeroSection>
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: { xs: 2, md: 4 },
            }}
          >
            {/* Left Side: Text Content */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontSize: { xs: '2rem', md: '3rem' } }} // Responsive headline size
              >
                We Simplify Online Medical Appointments
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                With AI diagnostics and real-time updates.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3, color: 'white' }}
              >
                Book an Appointment
              </Button>
            </Box>

            {/* Right Side: Image */}
            <Box sx={{ flex: 3 }}>
              <img
                src={image}
                alt="Smart Healthcare Appointment System"
                style={{
                  width: '100%',
                  borderRadius: theme.shape.borderRadius,
                }}
              />
            </Box>
          </Box>
        </Container>
      </HeroSection>
      <About />
      <Footer />
    </Box>
  );
};

export default Home;
