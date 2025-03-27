import { createSlice } from '@reduxjs/toolkit'

const initialState={
    show:true,
    
    
}
const DashBoardSlice = createSlice({
    name: "dash",
   initialState,
    reducers: {
        showing:(state)=>{
            state.show=false
            // console.log(action.payload.doctors)
            // state.doctors=action.payload.doctors;
        }
    }
})

export default DashBoardSlice.reducer

export const {showing}= DashBoardSlice.actions