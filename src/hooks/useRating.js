import { useSelector } from "react-redux";
import { selectPlaceReviewByIdSp } from "../feature/review/reviewSlice";
import { useState } from "react";

function useRating(idSp) {
    const selectAllComments = useSelector((state)=>selectPlaceReviewByIdSp(state,idSp ? idSp : '')) 
        // let rating = 0;

       let rating = 0

        if(selectAllComments.length !== 0){
        for(let x of selectAllComments){
           rating = (rating) + (x.rating)
        }
    }

        return ((rating)/((selectAllComments.length)))
        // return selectAllComments
}

export default useRating