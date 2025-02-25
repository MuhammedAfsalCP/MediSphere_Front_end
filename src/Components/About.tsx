import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import { keyframes } from '@emotion/react';

// Animation for the section
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

const AboutSectionWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, #f0f8ff, #ffffff)`,
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  animation: `${fadeIn} 1s ease-in-out`,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
  flexWrap: 'wrap',
}));

const IconCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  width: '200px',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[6],
  },
}));

function About() {
  const theme = useTheme();

  return (
    <AboutSectionWrapper>
      <Container>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}
        >
          About MediSphere Hospital
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          
          sx={{ maxWidth: '800px', margin: '0 auto', mb: 4 }}
        >
          At MediSphere Hospital, we are committed to delivering compassionate, state-of-the-art healthcare to our community. Our dedicated team of experienced professionals and cutting-edge medical technology ensure that every patient receives personalized care. Whether it's emergency services or specialized treatments, we strive to provide a holistic healthcare experience designed to promote healing and enhance quality of life.
        </Typography>
        <IconWrapper>
          <IconCard>
            <MedicalServicesIcon sx={{ fontSize: '3rem', color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
              Advanced Technology
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We use the latest medical technology to ensure accurate diagnoses and effective treatments.
            </Typography>
          </IconCard>
          <IconCard>
            <LocalHospitalIcon sx={{ fontSize: '3rem', color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
              Expert Team
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Our team of specialists is dedicated to providing the best care possible.
            </Typography>
          </IconCard>
          <IconCard>
            <HealingIcon sx={{ fontSize: '3rem', color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
              Patient-Centered Care
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your health and well-being are our top priorities.
            </Typography>
          </IconCard>
        </IconWrapper>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              fontWeight: 'bold',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              color:"white"
            }}
          >
            Learn More
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              fontWeight: 'bold',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
    </AboutSectionWrapper>
  );
}

export default About;