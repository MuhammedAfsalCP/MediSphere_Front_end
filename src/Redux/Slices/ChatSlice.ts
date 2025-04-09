import { createSlice } from '@reduxjs/toolkit'

const initialState={
    show:false,
    
    
}
const ChatSlice = createSlice({
    name: "chat",
   initialState,
    reducers: {
        chatshowing:(state)=>{
            state.show=true
            // console.log(action.payload.doctors)
            // state.doctors=action.payload.doctors;
        },
        closing:(state)=>{
            state.show=false
            // console.log(action.payload.doctors)
            // state.doctors=action.payload.doctors;
        }
    }
})

export default ChatSlice.reducer

export const {chatshowing,closing}= ChatSlice.actions