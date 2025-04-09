import React from 'react';
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import { useSelector } from 'react-redux';
import Nav from '../../../Components/Nav';
import About from '../../../Components/About';
import Footer from '../../../Components/Footer'; // Added Footer import
import ChatBot from '../ChatBot/ChatBot';

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

// Animation for sliding in the ChatBot from bottom-right
const slideIn = keyframes`
  from {
    transform: translate(100%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

// Styled ChatBot Container
const ChatBotContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  width: '350px',
  height: '500px',
  zIndex: 1000,
  animation: `${slideIn} 0.5s ease-out forwards`,
  [theme.breakpoints.down('sm')]: {
    width: '300px',
    height: '400px',
  },
}));

// Styled About Section Wrapper
const AboutSectionWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, #f0f8ff, #ffffff)`,
  minHeight: '100vh', // Ensures full page height
  display: 'flex',
  flexDirection: 'column',
  animation: `${fadeIn} 1s ease-in-out`,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  flex: 1, // Allows content to take available space
  padding: theme.spacing(8, 0), // Consistent padding with Home page
  textAlign: 'center',
}));

const AboutWithNavbar: React.FC = () => {
  const theme = useTheme();
  const { show } = useSelector((state: any) => state.chat);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AboutSectionWrapper>
        <Nav />
        <ContentWrapper>
          <About />
        </ContentWrapper>
        {show && (
          <ChatBotContainer>
            <ChatBot />
          </ChatBotContainer>
        )}
       
      </AboutSectionWrapper>
    </Box>
  );
};

export default AboutWithNavbar;