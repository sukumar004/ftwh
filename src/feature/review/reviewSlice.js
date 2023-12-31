import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    placeReview : []
}


const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers:{
        addPlaceReviewData:(state,action)=>{
            state.placeReview = action.payload
        }

    }
})


export const selectAllPlaceReview = (state) => state.review.placeReview;
export const selectPlaceReviewByIdSp = (state,id) => state.review.placeReview.filter(val=>(val.postIdSp.toUpperCase()) === (id.toUpperCase()))
    
export const {addPlaceReviewData} = reviewSlice.actions
export default reviewSlice.reducer;