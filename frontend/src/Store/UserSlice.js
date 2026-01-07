import { createSlice } from "@reduxjs/toolkit";

const userSlice =  createSlice({
    name :"user",
    initialState :{},
    
   reducers:{
     setUserDetalis :(state , action)=>{
        return action.payload
     }

   }

})

export const {setUserDetalis} = userSlice.actions
export default userSlice.reducer


