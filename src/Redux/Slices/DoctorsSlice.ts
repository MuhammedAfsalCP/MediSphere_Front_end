import { createSlice } from '@reduxjs/toolkit'

const initialState={
    doctors: [],
    error: null,
    
}
const DoctorsSlice = createSlice({
    name: "doctor",
   initialState,
    reducers: {
        DoctorsFetch:(state,action)=>{
            console.log(action.payload.doctors)
            state.doctors=action.payload.doctors;
        }
    }
})

export default DoctorsSlice.reducer

export const {DoctorsFetch}= DoctorsSlice.actions