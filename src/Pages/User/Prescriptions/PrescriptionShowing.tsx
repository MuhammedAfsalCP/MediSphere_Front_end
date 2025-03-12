import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
} from '@mui/material';

import Logo from '../../../assets/Logo.png'
import { fadeIn } from '../../../utils/materialui/Materialui';
// Mock details for the selected prescription
const selectedPrescription = {
  patient: 'demo',
  age: 18,
  doctor: 'Dr. Name',
  department: 'Department',
  notes: 'demo 3\ndemo jjk\ndldk3cdffffd',
};

const PrescriptionShowing: React.FC = () => {
  return (


    <Box sx={{ flexGrow: 1, p: 6, animation: `${fadeIn} 1s ease-in-out`, }}>
      {/* Use Flexbox */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
        <Card
          sx={{
            background: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 1)), url(${Logo})`, // Overlay + image
            
            backgroundSize: '40% auto',
            backgroundPosition: 'center 80%',
            backgroundRepeat: 'no-repeat',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            mx: 'auto',
            border: '1px solid #e0e0e0',
            width: '100%',
            minHeight: '550px',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Header with Icon and Title */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
                textAlign: 'center',
              }}
            > <img src={Logo} alt="" className='w-[30px]' />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>

                <Typography
                  variant="h6"
                  sx={{ color: '#00bcd4', fontWeight: 'bold', fontSize: '1.5rem' }}
                >
                  MediSphere
                </Typography>
              </Box>
            </Box>

            {/* Patient Details */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Box>
                <Typography sx={{ color: 'gray', mb: 1, fontSize: '1rem' }}>
                  <strong>Patient:</strong> {selectedPrescription.patient}
                </Typography>
                <Typography sx={{ color: 'gray', mb: 1, fontSize: '1rem' }}>
                  <strong>age:</strong> {selectedPrescription.age}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ color: 'gray', mb: 1, fontSize: '1rem' }}>
                  {selectedPrescription.doctor}
                </Typography>
                <Typography sx={{ color: 'gray', mb: 1, fontSize: '1rem' }}>
                  {selectedPrescription.department}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Prescription Notes */}
            <Typography sx={{ color: 'gray', whiteSpace: 'pre-wrap', fontSize: '1rem' }}>
              {selectedPrescription.notes}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>

  );
};

export default PrescriptionShowing;