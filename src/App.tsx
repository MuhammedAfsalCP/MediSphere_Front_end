
import './App.css'

import { Routes, Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Authentication/Login'
import RegisterUser from './Pages/Authentication/UserRegister';
import RegisterDoctor from './Pages/Authentication/DoctorRegiste';
import LoginWithMobile from './Pages/Authentication/LoginWithMobile';
import ForgotPassword from './Pages/Authentication/Forgetpassword';
import DoctorCall from './Pages/Videocall/DoctorCall';
import PatientCall from './Pages/Videocall/PatientCall';
import About from './Components/About';
import DoctorsShowing from './Pages/User/Appointment/DoctorsList/DoctorsShowing';
import AppointmentLayout from './Pages/User/Appointment/AppoitmentLayout';
import AppointmentHistoryLayout from './Pages/User/Appointment/History/AppointmentHistoryLayout';
import PrescriptionsLayout from './Pages/User/Prescriptions/PrescriptionsLayout';
import PrescriptionShowing from './Pages/User/Prescriptions/PrescriptionShowing';
import Booking from './Pages/User/Appointment/BookingSection/Booking';
import ViewMore from './Pages/User/Appointment/History/ViewMore';
import ProfilePage from './Pages/User/Profile/ProfilePage';
import DashboardLayout from './Pages/Doctor/Layout/DashboardLayout';
import Dashboard from './Pages/Doctor/Home/DashBoard';
import Appointments from './Pages/Doctor/Home/Appointments/Appointments';
import PatientDetails from './Pages/Doctor/Home/Appointments/PatientDetails';
import Availability from './Pages/Doctor/Home/Availabilities/Availability';
import PatienentsHistory from './Pages/Doctor/Home/PatientsHistory/PatienentsHistory';
import Wallet from './Pages/Doctor/Home/Wallet/Wallet';



function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='About' element={<About/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='loginmobile' element={<LoginWithMobile/>}/>
          <Route path='userregister' element={<RegisterUser/>}/>
          <Route path='doctorregister' element={<RegisterDoctor/>}/>
          <Route path='forgetpassword' element={<ForgotPassword/>}/>
          <Route path='doctorcall' element={<DoctorCall/>}/>
          <Route path='patientcall' element={<PatientCall/>}/>
          <Route path='AppointmentLayout' element={<AppointmentLayout/>}>
            <Route path='DoctorsShowing' element={<DoctorsShowing/>}/>
            <Route path='AppointmentHistoryLayout' element={<AppointmentHistoryLayout/>}/>
          </Route>
          <Route path='prescriptions' element={<PrescriptionsLayout/>}/>
          <Route path='prescriptionShowing' element={<PrescriptionShowing/>}/>
          <Route path='Booking' element={<Booking/>}/>
          <Route path='Viewmore' element={<ViewMore/>}/>
          <Route path='Profile' element={<ProfilePage/>}/>
          <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patientdetails" element={<PatientDetails />} />
          <Route path="availability" element={<Availability />} />
          <Route path="patientshistory" element={<PatienentsHistory/>} />
          <Route path="wallet" element={<Wallet/>} />
          </Route>
          
         
        </Routes>
       
      
      <ToastContainer/>
    </>
  )
}

export default App
