import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../Redux/Slices/AuthSlice'
import DashBoardSlice from '../Redux/Slices/DashboardSlice'
const Store=configureStore({
    reducer:{
        auth:AuthReducer,
        dash:DashBoardSlice
    }
})

export default Store