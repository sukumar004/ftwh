import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState={
    datas : []
}


const placeSlice = createSlice({
    name:'place',
    initialState,
    reducers:{
        addData:(state,action)=>{
            state.datas = action.payload
        }

    }
})

export const selectAllPost = (state)=> state.place.datas
export const selectPostById = (state,id) => state.place.datas.find(post => post.idSp.toUpperCase() === id.toUpperCase()) 


export const {addData} = placeSlice.actions;

export default placeSlice.reducer;