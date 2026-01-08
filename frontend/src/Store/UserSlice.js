import { createSlice } from "@reduxjs/toolkit";

const UserSlice =  createSlice({
    name :"user",
    initialState :{},
    
   reducers:{
     setUserDetalis :(state , action)=>{
        return action.payload
     }

   }

})

export const {setUserDetalis} = UserSlice.actions
export default UserSlice.reducer


