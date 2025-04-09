import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../Redux/Slices/AuthSlice'
import DashBoardSlice from '../Redux/Slices/DashboardSlice'
import ChatSlice from '../Redux/Slices/ChatSlice'
const Store=configureStore({
    reducer:{
        auth:AuthReducer,
        dash:DashBoardSlice,
        chat:ChatSlice
    }
})

export default Store