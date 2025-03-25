
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
import ViewMore from './Pages/User/Appointment/History/Viewmore';



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
          
          
         
        </Routes>
       
      
      <ToastContainer/>
    </>
  )
}

export default App
