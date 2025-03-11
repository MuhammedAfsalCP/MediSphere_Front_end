import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    MenuItem,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
} from "@mui/material";
import Nav from "../../../Components/Nav";
import DoctorCard from "./DoctorCard";
import { fadeIn } from "../../../utils/materialui/Materialui";

// Mock data for doctors


const AppointmentLayout: React.FC = () => {
    const [filter, setFilter] = React.useState<string>("All");
    const doctors = [
        {
            name: "Dr. John Doe",
            specialization: "Cardiology",
            experience: 8,
            fees: 500,
        },
        {
            name: "Dr. Emily Smith",
            specialization: "Dermatology",
            experience: 5,
            fees: 400,
        },
        {
            name: "Dr. David Brown",
            specialization: "Pediatrics",
            experience: 7,
            fees: 450,
        },
    ];

    const specializations = ["All", "Cardiology", "Dermatology", "Pediatrics"];
    const filteredDoctors =
        filter === "All" ? doctors : doctors.filter((doc) => doc.specialization === filter);
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
                                    transform: 'scale(1.05)', // Add a slight scale effect on hover
                                },
                                fontSize: 17,
                                // Make the text bold
                                borderBottom: '2px solid transparent', // Add a bottom border
                                '&:hover::after': {
                                    content: '""',
                                    display: 'block',
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: '#00a2ff', // Animated underline on hover
                                    transition: 'all 0.3s ease',
                                },
                                transition: 'all 0.3s ease',
                                marginLeft:2 // Smooth transition for hover effects
                            }}
                        >
                            Doctors
                        </Button>
                        <Button
                            sx={{
                                color: theme.palette.text.primary,
                                '&:hover': {
                                    color: '#00a2ff', // Use a different color for the History button
                                    backgroundColor: 'transparent',
                                    transform: 'scale(1.05)', // Add a slight scale effect on hover
                                },
                                fontSize: 17,

                                borderBottom: '2px solid transparent', // Add a bottom border
                                '&:hover::after': {
                                    content: '""',
                                    display: 'block',
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: '#ff6b6b', // Animated underline on hover
                                    transition: 'all 0.3s ease',
                                },
                                transition: 'all 0.3s ease',
                                marginLeft:2 // Smooth transition for hover effects
                            }}
                        >
                            History
                        </Button>
                    </Box>
                </Drawer>

                {/* Main Content */}
                <Box sx={{ flex: 1, p: 4 }}>
                    {/* Specialization Filter */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
                        <TextField
                            select
                            label="Specialization"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            sx={{ width: 200 }}
                        >
                            {specializations.map((spec) => (
                                <MenuItem key={spec} value={spec}>
                                    {spec}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {/* Doctors Flex Container */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                        {filteredDoctors.map((doctor, index) => (
                            <DoctorCard key={index} doctor={doctor} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AppointmentLayout;
