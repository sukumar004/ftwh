import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usersData : [],
    currentUser : {}
}

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        addUserData:(state,action)=>{
            state.usersData = action.payload
        },

        addCurrentUserData:(state,action)=>{
            state.currentUser = action.payload
        }

    }
})

export const selectAllUsers = (state) => (state.users.usersData);
export const selectUserByUid = (state,id) => (state.users.usersData.find((user)=>(user.uId.toUpperCase() === id.toUpperCase())));
export const selectCurrentUser = (state) => state.users.currentUser

export const {addUserData,addCurrentUserData} = userSlice.actions; 
export default userSlice.reducer;