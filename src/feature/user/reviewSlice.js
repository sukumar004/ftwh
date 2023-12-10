import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id:1,
        name:'Sukumar',
        date:'2 months ago',
        img:'/images/ht-1.jpg',
        ids:{
            placeId:5,
            userId:1
            },
        rating:5,
        topic:'Nice Place',
        comments:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit tenetur nisi atque magni dolore debitis commodi quo suscipit magnam veniam! A sequi mollitia optio dolores qui quo vero, quasi similique.'       
    },
    {
        id:2,
        name:'Sukumar',
        date:'2 months ago',
        img:'/images/ht-1.jpg',
        ids:{
            placeId:5,
            userId:1
            },
        rating:4,
        topic:'Beautiful place for Family Trip',
        comments:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit tenetur nisi atque magni dolore debitis commodi quo suscipit magnam veniam! A sequi mollitia optio dolores qui quo vero, quasi similique.'       
    },
    {
        id:3,
        name:'Sukumar',
        date:'2 months ago',
        img:'/images/ht-1.jpg',
        ids:{
            placeId:5,
            userId:1
            },
        rating:1,
        topic:'Worst Place',
        comments:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit tenetur nisi atque magni dolore debitis commodi quo suscipit magnam veniam! A sequi mollitia optio dolores qui quo vero, quasi similique.'       
    }
]


const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers:{

    }
})

export const selectReviewByPlaceAndUser = (state,placeId,userId) =>(state.review.filter(review =>(review.ids.placeId === placeId) && (review.ids.userId === userId)))
    



export default reviewSlice.reducer;