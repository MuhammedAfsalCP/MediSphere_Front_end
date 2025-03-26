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
import { useNavigate } from 'react-router-dom';
const profileurl = import.meta.env.VITE_API_URL;
interface Appointment {
    id: number;
    department: string;
    date: string;
    status: string;
    doctor: {
        first_name: string,
        department: string,
        id: number,
        profile_pic:string,
    },
    slot: string;
}

interface AppointmentHistoryProps {
    appointments: Appointment[];
    rowsPerPage: number;
    page: number;
}

const AppointmentHistory: React.FC<AppointmentHistoryProps> = ({ appointments, rowsPerPage, page }) => {
    console.log(appointments)
    const navigate = useNavigate()
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
                        {appointments?.map((appointment) => (
                            <TableRow key={appointment?.id}>
                                <TableCell sx={{ width: '10%' }}>
                                    <img
                                        src={`${profileurl}/${appointment.doctor.profile_pic}`}
                                        alt="Avatar"
                                        className="w-6 h-6"
                                    />
                                </TableCell>
                                <TableCell sx={{ width: '15%' }}>{appointment.doctor.first_name}</TableCell>
                                <TableCell sx={{ width: '15%' }}>{appointment.doctor.department}</TableCell>
                                <TableCell sx={{ width: '15%' }}>{appointment.date}</TableCell>
                                <TableCell sx={{ width: '15%' }}>
                                    <span
                                        className={`px-2 py-1 rounded ${appointment.status === 'Pending'
                                            ? 'text-yellow-600 bg-yellow-100'
                                            : appointment.status === "Cancelled"
                                                ? "text-gray-600 bg-gray-100"
                                                : "text-green-600 bg-green-100"
                                            }`}
                                    >
                                        {appointment.status}
                                    </span>
                                </TableCell>
                                <TableCell sx={{ width: '15%' }}>{appointment.slot}</TableCell>
                                <TableCell sx={{ width: '15%' }}>
                                    <Button variant="contained" sx={{ mt: 0.5, color: "white" }} onClick={() =>
                                        navigate("/Viewmore", { state: { id: appointment.id, date: appointment.date, slot: appointment.slot } })
                                    }>
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