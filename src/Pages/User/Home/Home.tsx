// import React from 'react';
// import { Box, Typography, Button, Container, useTheme } from '@mui/material';
// import { styled } from '@mui/system';
// import image from '../../../assets/Vector.png'; // Replace with your actual image import
// import Nav from '../../../Components/Nav';
// import Footer from '../../../Components/Footer';
// import About from '../../../Components/About';
// import { keyframes } from '@emotion/react';
// import { fadeIn } from '../../../utils/materialui/Materialui';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ChatBot from '../ChatBot/ChatBot';


// const HeroSection = styled(Box)(({ theme }) => ({
//   background: 'linear-gradient(90deg, #f0f8ff, #ffffff)',
//   animation: `${fadeIn} 1s ease-in-out`,
//   padding: theme.spacing(6, 0),
//   textAlign: 'center',
//   [theme.breakpoints.up('md')]: {
//     padding: theme.spacing(8, 0),
//   },
// }));

// const Home: React.FC = () => {
//   const {show} = useSelector((state: any) => state.chat)
//   console.log(show)
//   const theme = useTheme();
//   const navigate=useNavigate()
//   const user = useSelector((state: any) => state.auth)
//   console.log(user)
//   const appointment=()=>{
//     if(user?.user){
//       navigate("/AppointmentLayout")
//     }else{
//       navigate("/login")
//     }
//   }
//   return (
//     <Box>
//       <Nav />
//       <HeroSection>
//         <Container>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: { xs: 'column', md: 'row' },
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               gap: { xs: 2, md: 4 },
//             }}
//           >
//             {/* Left Side: Text Content */}
//             <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
//               <Typography
//                 variant="h2"
//                 component="h1"
//                 gutterBottom
//                 sx={{ fontSize: { xs: '2rem', md: '3rem' } }} // Responsive headline size
//               >
//                 We Simplify Online Medical Appointments
//               </Typography>
//               <Typography variant="h5" color="text.secondary" paragraph>
//                 With AI diagnostics and real-time updates.
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 sx={{ mt: 3, color: 'white' }}
//                 onClick={appointment}
//               >
//                 Book an Appointment
//               </Button>
//             </Box>

//             {/* Right Side: Image */}
//             <Box sx={{ flex: 3 }}>
//               <img
//                 src={image}
//                 alt="Smart Healthcare Appointment System"
//                 style={{
//                   width: '100%',
//                   borderRadius: theme.shape.borderRadius,
//                 }}
//               />
//             </Box>
//           </Box>
//         </Container>
//         {show?<ChatBot/>:null}
//       </HeroSection>
//       <About />
//       <Footer />
//     </Box>
//   );
// };

// export default Home;


import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import image from '../../../assets/Vector.png'; // Replace with your actual image import
import Nav from '../../../Components/Nav';
import Footer from '../../../Components/Footer';
import About from '../../../Components/About';
import { keyframes } from '@emotion/react';
import { fadeIn } from '../../../utils/materialui/Materialui';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatBot from '../ChatBot/ChatBot';

// Animation for sliding in from bottom-right
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

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(90deg, #f0f8ff, #ffffff)',
  animation: `${fadeIn} 1s ease-in-out`,
  padding: theme.spacing(6, 0),
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0),
  },
}));

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

const Home: React.FC = () => {
  const { show } = useSelector((state: any) => state.chat);
  console.log(show);
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth);
  console.log(user);

  const appointment = () => {
    if (user?.user) {
      navigate("/AppointmentLayout");
    } else {
      navigate("/login");
    }
  };

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
                onClick={appointment}
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

      {/* ChatBot in Bottom Right Corner */}
      {show && (
        <ChatBotContainer>
          <ChatBot />
        </ChatBotContainer>
      )}

      <About />
      <Footer />
    </Box>
  );
};

export default Home;