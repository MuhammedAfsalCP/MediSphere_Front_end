import React, { useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import DoctorCard from "./DoctorCard"; // Ensure this is correctly imported

// Define the Doctor type
interface Doctor {
    name: string;
    specialization: string;
    fees: string;
}

// Doctor data
const doctorsData: Doctor[] = [
    { name: "Dr. John Doe", specialization: "Cardiology", fees: "300" },
    { name: "Dr. Jane Smith", specialization: "Dermatology", fees: "400" },
    { name: "Dr. Emily Davis", specialization: "Pediatrics", fees: "500" },
    { name: "Dr. Robert Wilson", specialization: "Cardiology", fees: "300" },
];

// Specializations
const specializations: string[] = ["All", "Cardiology", "Dermatology", "Pediatrics"];

const DoctorsShowing: React.FC = () => {
    const [filter, setFilter] = useState<string>("All");

    const filteredDoctors: Doctor[] = filter === "All" 
        ? doctorsData 
        : doctorsData.filter((doc) => doc.specialization === filter);

    return (
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
    );
};

export default DoctorsShowing;
