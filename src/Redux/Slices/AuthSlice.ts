import { createSlice } from '@reduxjs/toolkit'

const initialState={
    user: null,
    error: null,
    
}
const AuthSlice = createSlice({
    name: "auth",
   initialState,
    reducers: {
        LoginSuccess:(state,action)=>{
            state.user=action.payload.userdetail;
        },
        FetchUser:(state,action)=>{
            
            state.user=action.payload;
        },
        logout: (state) => {
            state.user=null
            localStorage.removeItem('token'); // Clear token from localStorage
          }
    }
})

export default AuthSlice.reducer

export const {LoginSuccess,FetchUser,logout}= AuthSlice.actions