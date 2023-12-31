import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usersData : []
}

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        addUserData:(state,action)=>{
            state.usersData = action.payload
        }

    }
})

export const selectAllUsers = (state) => (state.users.usersData);
export const selectUserByUid = (state,uId) => (state.users.usersData.find((user)=>((user.uid).toUpperCase() === uId.toUpperCase())))

export const {addUserData} = userSlice.actions; 
export default userSlice.reducer;