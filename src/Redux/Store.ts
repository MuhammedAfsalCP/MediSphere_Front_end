import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../Redux/Slices/AuthSlice'
const Store=configureStore({
    reducer:{
        auth:AuthReducer
    }
})

export default Store