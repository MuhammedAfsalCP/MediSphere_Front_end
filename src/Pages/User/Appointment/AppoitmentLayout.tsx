import React, { useState } from "react";
import {
    Box,
    Button,
    Drawer,
    keyframes,
    useTheme,
} from "@mui/material";
import Nav from "../../../Components/Nav";

import { fadeIn } from "../../../utils/materialui/Materialui";
import DoctorsShowing from "./DoctorsList/DoctorsShowing";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import ChatBot from "../ChatBot/ChatBot";
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
const AppointmentLayout: React.FC = () => {
    const [IsShow,setIsShow]=useState(true)
    const { show } = useSelector((state: any) => state.chat);
    console.log(show)
    const navigate=useNavigate()
    const theme = useTheme();
    return (
        <Box sx={{ background: "linear-gradient(90deg, #f0f8ff, #ffffff)", minHeight: "100vh" }}>
            <Nav />
            <Box sx={{ display: "flex" }}>
                {/* Sidebar */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: 200,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: 200,
                            background: "linear-gradient(180deg, #f0f8ff, #2DBDFE)",
                            borderRight: "none",
                            marginTop: 9,
                            animation: `${fadeIn} 1s ease-in-out`,
                        },
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Button
                            sx={{
                                color: theme.palette.text.primary,
                                '&:hover': {
                                    color: '#00a2ff',
                                    backgroundColor: 'transparent',
                                    transform: 'scale(1.05)',
                                },
                                fontSize: 17,
                                borderBottom: '2px solid transparent',
                                '&:hover::after': {
                                    display: 'block',
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: '#00a2ff',
                                    transition: 'all 0.3s ease',
                                },
                                transition: 'all 0.3s ease',
                                marginLeft: 2
                            }}
                            onClick={()=>{navigate('DoctorsShowing'),setIsShow(false)}}
                        >
                            Doctors
                        </Button>
                        <Button
                            sx={{
                                color: theme.palette.text.primary,
                                '&:hover': {
                                    color: '#00a2ff',
                                    backgroundColor: 'transparent',
                                    transform: 'scale(1.05)',
                                },
                                fontSize: 17,

                                borderBottom: '2px solid transparent',
                                '&:hover::after': {
                                    display: 'block',
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: '#ff6b6b',
                                    transition: 'all 0.3s ease',
                                },
                                transition: 'all 0.3s ease',
                                marginLeft: 2
                            }}
                            onClick={()=>{navigate('AppointmentHistoryLayout'),setIsShow(false)}}
                        >
                            History
                        </Button>
                    </Box>
                </Drawer>
                {/* Main Content */}
                {IsShow?<DoctorsShowing/>:<Outlet/>}
            </Box>
            {show && (
        <ChatBotContainer>
          <ChatBot />
        </ChatBotContainer>
      )}
        </Box>
    );
};

export default AppointmentLayout;