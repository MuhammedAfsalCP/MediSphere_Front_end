// src/components/DoctorInfo.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

interface DoctorInfoProps {
  name: string;
  specialization: string;
  experience: number;
  fee: number;
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ name, specialization, experience, fee }) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body1">Specialization: {specialization}</Typography>
      <Typography variant="body1">Years of Experience: {experience}</Typography>
      <Typography variant="body1">Fees: ${fee}</Typography>
    </Box>
  );
};

export default DoctorInfo;