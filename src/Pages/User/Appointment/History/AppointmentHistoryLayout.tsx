import React, { useEffect } from 'react';
import {
  Box,
  Pagination,
} from '@mui/material';

import AppointmentHistory from './AppointmentHistory';
import { fadeIn } from '../../../../utils/materialui/Materialui';
import { useQuery } from '@tanstack/react-query';
import { AxiosInstance, TokenInstance } from '../../../../lib/AxiosInstance';

// Mock data for appointments
// const appointments = [
//   {
//     id: 1,
//     doctor: 'Dr. Name',
//     department: 'Department',
//     date: '18-06-1024',
//     status: 'Pending',
//     time: '10:00 to 11:00 am',
//   },
//   {
//     id: 2,
//     doctor: 'Dr. Name',
//     department: 'Department',
//     date: '18-06-1024',
//     status: 'Pending',
//     time: '10:00 to 11:00 am',
//   },
//   {
//     id: 3,
//     doctor: 'Dr. Name',
//     department: 'Department',
//     date: '18-06-1024',
//     status: 'Completed',
//     time: '10:00 to 11:00 am',
//   },
//   {
//     id: 4,
//     doctor: 'Dr. Name',
//     department: 'Department',
//     date: '18-06-1024',
//     status: 'Completed',
//     time: '10:00 to 11:00 am',
//   },
//   {
//     id: 7,
//     doctor: 'Dr. Name',
//     department: 'Department',
//     date: '18-06-1024',
//     status: 'Completed',
//     time: '10:00 to 11:00 am',
//   },
 
// ];

const AppointmentHistoryLayout: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6;
  const {data:appointments , isLoading} = useQuery({
          queryKey:["historyfetch"],
          queryFn: async()=>{
            const response = await TokenInstance.get('/appointmenthistory/')
           console.log(response.data.History)
            return response.data.History
          },
        })
        
        
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const paginatedAppointments = appointments?.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ background: 'linear-gradient(90deg, #f0f8ff, #ffffff)', minHeight: '80vh',animation: `${fadeIn} 1s ease-in-out`,}}>
      {/* Top Navbar */}
      

      {/* Main Content */}
      <Box className="p-6">
        

        {/* Appointment Table */}
        <AppointmentHistory appointments={paginatedAppointments} rowsPerPage={rowsPerPage} page={page} />

        {/* Pagination */}
        <Box className="flex justify-center mt-4" sx={{ background: '#e0f7fa', padding: '1rem', borderRadius: '0.5rem', margin:0}}>
          <Pagination
            count={Math.ceil(appointments?.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentHistoryLayout;