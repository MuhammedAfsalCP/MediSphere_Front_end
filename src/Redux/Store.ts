import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../Redux/Slices/AuthSlice'
import DoctorsSlice from '../Redux/Slices/DoctorsSlice'
const Store=configureStore({
    reducer:{
        auth:AuthReducer,
        doctor:DoctorsSlice
    }
})

export default Store