import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  useTheme,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from '../../../Components/Nav';
import PrescriptionShowing from './PrescriptionShowing';
import { fadeIn } from '../../../utils/materialui/Materialui';

// Mock data for prescriptions
const prescriptions = [
  { id: 1, doctor: 'Faris Muhammed', time: '12:24 TO 1:24' },
  { id: 2, doctor: 'Faris Muhammed', time: '12:24' },
  { id: 3, doctor: 'Faris Muhammed', time: '12:24' },
];

// Mock details for the selected prescription
const selectedPrescription = {
  patient: 'demo',
  age: 18,
  doctor: 'Dr. Name',
  department: 'Department',
  notes: 'demo 3\ndemo jjk\ndldk3cdffffd',
};

const PrescriptionsLayout: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const theme = useTheme();

  const handleSelectPrescription = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  return (
    <Box sx={{ background: 'linear-gradient(90deg, #f0f8ff, #ffffff)', minHeight: '100vh' }}>
      <Nav />
      <Box sx={{ display: 'flex' }}>
        {/* Drawer for Prescription List */}
        <Drawer
          variant="permanent"
          sx={{
            width: 200,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 300,
              background: 'linear-gradient(180deg, #f0f8ff, #2DBDFE)',
              borderRight: 'none',
              mt: 9,
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            {prescriptions.map((prescription) => (
              <Box
                key={prescription.id}
                onClick={() => handleSelectPrescription(prescription.id)}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: '0.3s',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': { background: 'rgba(255, 255, 255, 0.1)' },
                  
                }}
              >
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
                    marginLeft: 2,
                  }}
                  
                >
                  {prescription.doctor} : {prescription.time}
                </Button>
              </Box>
            ))}
          </Box>
        </Drawer>

        {/* Main Content */}
        <PrescriptionShowing/>
      </Box>
    </Box>
  );
};

export default PrescriptionsLayout;