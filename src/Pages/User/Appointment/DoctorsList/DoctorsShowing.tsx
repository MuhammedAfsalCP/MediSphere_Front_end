import React, { useEffect, useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import DoctorCard from "./DoctorCard"; // Ensure this is correctly imported
import { useQuery } from "@tanstack/react-query";
import { AppointmentInstance } from "../../../../lib/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { DoctorsFetch } from "../../../../Redux/Slices/DoctorsSlice";

// Define the Doctor type
interface Doctor {
    name: string;
    specialization: string;
    fees: string;
}

// Doctor data


// Specializations
const specializations: string[] = ["All", "Cardiology", "Dermatology", "Pediatrics"];

const DoctorsShowing: React.FC = () => {
    const [filter, setFilter] = useState<string>("All");
    const {doctors}=useSelector((state:any)=>state.doctor)
    const dispatch=useDispatch()
    const {data, isLoading} = useQuery({
        queryKey:["fetchdoctors"],
        queryFn: async()=>{
          const response = await AppointmentInstance.get('/book_appointment/')
         
          return response.data
        },
        
      })
      useEffect(()=>{
      
       if(data){
        
        dispatch(DoctorsFetch(data))
       }
    
          
        
      },[data])
      

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
                {doctors?.map((doctor:any, index:any) => (
                    <DoctorCard key={index} doctor={doctor} />
                ))}
            </Box>
        </Box>
    );
};

export default DoctorsShowing;
