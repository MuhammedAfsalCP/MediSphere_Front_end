
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

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/loginmobile' element={<LoginWithMobile/>}/>
          <Route path='/userregister' element={<RegisterUser/>}/>
          <Route path='/doctorregister' element={<RegisterDoctor/>}/>
          <Route path='/forgetpassword' element={<ForgotPassword/>}/>
          
         
        </Routes>
       
      
      <ToastContainer/>
    </>
  )
}

export default App
