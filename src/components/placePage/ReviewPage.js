import React, { useEffect, useState,useContext } from 'react'
import './reviewPage.css'
import { useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa6'
import { selectPlaceReviewByIdSp } from '../../feature/review/reviewSlice'
import { VscSearchStop } from "react-icons/vsc";
import DataContext from '../context/DataContext'



function ReviewPage(postIdSp) {

    const {timeChange,commentsMore,handleCommentsToggle} = useContext(DataContext)
    const reviews = useSelector((state)=>selectPlaceReviewByIdSp(state,postIdSp.postIdSp))

    const reviewShowData = reviews.map(val=>{
        return{
            ...val,
            date:timeChange(val.date)
        }
    })

    const showArray = reviewShowData.sort(function(a,b){return -(b.date).localeCompare(a.date)})

    const sliceArray = showArray.slice(0,3)

    // console.log(reviews)

    const arr = Array(5).fill(0)

    const starColor = {
        active:'#FFBA5A',
        inActive:'#a9a9a9'
      }

    // maping function


    const reviewList = (commentsMore ? showArray : sliceArray).map((review,index)=>{

        return(

        <div className="review-list" key={index}>

            <div className="review-column-list">
                
                <div className="review-list-column-img">
                    <img src={review.photoURL} alt={review.name} />

                        <div className="new-div">
                            <h1>{review.topic ? review.topic : 'Topic not available'}</h1>

                            <div className="ratins-star-column">

                                <div className="rating-star">

                                {arr.map((val,index)=>(
                                <FaStar
                                key={index}
                                // size={20}
                                style={{margin:'0 5px 0 0'}}
                                color={review.rating > index ? starColor.active : starColor.inActive }

                                />
                                ))}
                                </div>

                                <div className="rating-date">
                                <p id='review-date-show'>{review.date ? `${review.date} ago` : '2 months ag0'}</p>
                                </div>
                            </div>
                        </div>
                </div>

                <div className="review-comments">
                    <h3>{review.name?review.name:'Name not available'}</h3>
                    <p id='review-comments-id'>{review.comments.length <= 500 ? review.comments : `${review.comments.substring(0,500)}...`}</p>
                </div>
                
            </div>

        </div>

        

        )
    })

  return (
    <div className='review-parent'>
    

    {reviewList}

    {(reviewList.length >= 3 && !commentsMore) &&
    <div className="more-comments-button">
    <button onClick={()=>handleCommentsToggle()}>Show More Comments</button>
    </div>}
    
    {!reviewList.length &&
    
    <div className='review-comment-error'>
        <p><span><VscSearchStop /></span>There is no comments for this place</p>
    </div>
  }  

   
    </div>
  )
}

export default ReviewPage