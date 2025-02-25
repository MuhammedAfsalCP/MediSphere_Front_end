
import './App.css'

import { Routes, Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home/Home';
import Nav from './Components/Nav';
function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/nav' element={<Nav/>}/>
         
        </Routes>
       
      
      <ToastContainer/>
    </>
  )
}

export default App
