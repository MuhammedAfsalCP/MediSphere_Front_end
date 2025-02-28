import { createSlice } from '@reduxjs/toolkit'

const initialState={
    user: null,
    error: null
}
const AuthSlice = createSlice({
    name: "auth",
   initialState,
    reducers: {
        LoginSuccess:(state,action)=>{
            state.user=action.payload
        }
    }
})

export default AuthSlice.reducer

export const {LoginSuccess}= AuthSlice.actions