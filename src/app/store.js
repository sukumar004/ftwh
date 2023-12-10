import { configureStore } from "@reduxjs/toolkit";
import postReducer from'../feature/place/placeSlice.js'
import hotelDetailsSlice from "../feature/hotel details/hotelDetailsSlice.js";
import bookingDetailsSlice from "../feature/hotel details/bookingDetailsSlice.js";
import reviewSlice from "../feature/user/reviewSlice.js";

export const store = configureStore({
    reducer:{
        place : postReducer,
        hotelDetails : hotelDetailsSlice,
        bookings : bookingDetailsSlice,
        review : reviewSlice,
        
        
    }
})