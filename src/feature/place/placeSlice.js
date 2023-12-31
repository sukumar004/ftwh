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
export const selectPostByIdSp = (state,id) => state.place.datas.find(post => post.idSp.toUpperCase() === id.toUpperCase()) 
export const selectPlaceById = (state,id) => state.place.datas.find(post => post.id.toUpperCase()===id.toUpperCase())
export const selectPlaceByUid = (state,uid) => state.place.datas.filter((post)=>((post.uid) && post.uid.toUpperCase()===uid.toUpperCase()))


export const {addData} = placeSlice.actions;

export default placeSlice.reducer;