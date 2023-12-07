import { configureStore } from "@reduxjs/toolkit";
import postReducer from'../feature/place/placeSlice.js'

export const store = configureStore({
    reducer:{
        place : postReducer,
        
    }
})