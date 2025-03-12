import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';

interface Appointment {
    id: number;
    doctor: string;
    department: string;
    date: string;
    status: string;
    time: string;
}

interface AppointmentHistoryProps {
    appointments: Appointment[];
    rowsPerPage: number;
    page: number;
}

const AppointmentHistory: React.FC<AppointmentHistoryProps> = ({ appointments, rowsPerPage, page }) => {
    return (
        <>
            {/* Appointment Table */}
            <TableContainer 
                component={Paper}
                sx={{
                    borderRadius: '0.5rem',
                    boxShadow: 'none',
                    mb: 4,
                    
                }}
            >
                <Table
                    sx={{
                        width: '100%', // Set table width to 100%
                        tableLayout: 'fixed', // Ensures columns distribute evenly
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ background: '#e0f7fa' }}>
                            <TableCell sx={{ width: '10%' }}>
                                <img
                                    src="https://via.placeholder.com/30"
                                    alt="Avatar"
                                    className="w-6 h-6 mr-2 inline-block"
                                />
                            </TableCell>
                            <TableCell sx={{ width: '15%' }}>Doctor Name</TableCell>
                            <TableCell sx={{ width: '15%' }}>Department</TableCell>
                            <TableCell sx={{ width: '15%' }}>Date</TableCell>
                            <TableCell sx={{ width: '15%' }}>Status</TableCell>
                            <TableCell sx={{ width: '15%' }}>Time</TableCell>
                            <TableCell sx={{ width: '15%' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                                <TableCell sx={{ width: '10%' }}>
                                    <img
                                        src="https://via.placeholder.com/30"
                                        alt="Avatar"
                                        className="w-6 h-6"
                                    />
                                </TableCell>
                                <TableCell sx={{ width: '15%' }}>{appointment.doctor}</TableCell>
                                <TableCell sx={{ width: '15%' }}>{appointment.department}</TableCell>
                                <TableCell sx={{ width: '15%' }}>{appointment.date}</TableCell>
                                <TableCell sx={{ width: '15%' }}>
                                    <span
                                        className={`px-2 py-1 rounded ${appointment.status === 'Pending'
                                                ? 'text-yellow-600 bg-yellow-100'
                                                : 'text-green-600 bg-green-100'
                                            }`}
                                    >
                                        {appointment.status}
                                    </span>
                                </TableCell>
                                <TableCell sx={{ width: '15%' }}>{appointment.time}</TableCell>
                                <TableCell sx={{ width: '15%' }}>
                                    <Button variant="contained" sx={{ mt: 0.5, color: "white" }}>
                                        View More
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default AppointmentHistory;