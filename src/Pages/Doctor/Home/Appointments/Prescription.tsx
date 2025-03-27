import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useFormik } from 'formik'; // Import Formik
import * as Yup from 'yup'; // Import Yup for validation (optional)

import Logo from '../../../../assets/Logo.png';
import { fadeIn } from '../../../../utils/materialui/Materialui';

// Mock details for the selected prescription (using state to allow updates)
const initialPrescription = {
  patient: 'demo',
  age: 18,
  doctor: 'Dr. Name',
  department: 'Department',
  notes: 'demo 3\ndemo jjk\ndldk3cdffffd',
};

const Prescription: React.FC = () => {
  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State to store the prescription data (to allow updates)
  const [prescription, setPrescription] = useState(initialPrescription);

  // Formik setup for the notes field
  const formik = useFormik({
    initialValues: {
      notes: prescription.notes,
    },
    validationSchema: Yup.object({
      notes: Yup.string().required('Notes are required'), // Optional validation
    }),
    onSubmit: (values) => {
      // Update the prescription notes
      setPrescription((prev) => ({
        ...prev,
        notes: values.notes,
      }));
      // Exit edit mode
      setIsEditing(false);
    },
  });

  // Handle Edit button click
  const handleEditClick = () => {
    setIsEditing(true);
    // Reset Formik values to the current prescription notes
    formik.setValues({ notes: prescription.notes });
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 4, md: 6 }, animation: `${fadeIn} 1s ease-in-out` }}>
      {/* Use Flexbox to center the card */}
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
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            {/* Header with Icon and Title */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <img src={Logo} alt="Logo" style={{ width: '30px', height: 'auto' }} />
              <Typography
                variant="h6"
                sx={{ color: '#00bcd4', fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '1.5rem' } }}
              >
                MediSphere
              </Typography>
            </Box>

            {/* Patient Details */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 3,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: 'gray',
                    mb: 1,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontWeight: 500,
                  }}
                >
                  <strong>Patient:</strong> {prescription.patient}
                </Typography>
                <Typography
                  sx={{
                    color: 'gray',
                    mb: 1,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontWeight: 500,
                  }}
                >
                  <strong>Age:</strong> {prescription.age}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  sx={{
                    color: 'gray',
                    mb: 1,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontWeight: 500,
                  }}
                >
                  <strong>Doctor:</strong> {prescription.doctor}
                </Typography>
                <Typography
                  sx={{
                    color: 'gray',
                    mb: 1,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontWeight: 500,
                  }}
                >
                  <strong>Department:</strong> {prescription.department}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Prescription Notes (Editable or Static) */}
            {isEditing ? (
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="notes"
                  label="Prescription Notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                  sx={{
                    mb: 4,
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      color: 'gray',
                      lineHeight: 1.6,
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '0.9rem', md: '1rem' },
                    },
                  }}
                />
              </form>
            ) : (
              <Typography
                sx={{
                  color: 'gray',
                  whiteSpace: 'pre-wrap',
                  textAlign: "start",
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                {prescription.notes}
              </Typography>
            )}

            {/* Edit and Save Buttons at Bottom Center */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 2,
              }}
            >
              {isEditing ? (
                <Button
                  type="submit"
                  onClick={() => formik.handleSubmit()} // Trigger Formik submit
                  variant="contained"
                  sx={{
                    backgroundColor: '#2ecc71',
                    color: '#fff',
                    textTransform: 'none',
                    fontSize: { xs: '0.8rem', md: '0.875rem' },
                    padding: { xs: '4px 12px', md: '6px 16px' },
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#27ae60',
                    },
                  }}
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={handleEditClick} // Enter edit mode
                  variant="contained"
                  sx={{
                    backgroundColor: '#00bcd4',
                    color: '#fff',
                    textTransform: 'none',
                    fontSize: { xs: '0.8rem', md: '0.875rem' },
                    padding: { xs: '4px 12px', md: '6px 16px' },
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#00acc1',
                    },
                  }}
                >
                  Edit
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Prescription;