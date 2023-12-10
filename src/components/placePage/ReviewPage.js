import React, { useEffect, useState } from 'react'
import './reviewPage.css'
import { useSelector } from 'react-redux'
import { selectReviewByPlaceAndUser } from '../../feature/user/reviewSlice'
import { FaStar } from 'react-icons/fa6'

function ReviewPage() {

    const [selectedPlaceReviews,setSelectedPageReviews] = useState([])

    const arr = Array(5).fill(0)

    const reviews = useSelector((state)=>selectReviewByPlaceAndUser(state,Number(5),Number(1)))

    useEffect(()=>{
        setSelectedPageReviews(reviews)
    },[])

    const starColor = {
        active:'#FFBA5A',
        inActive:'#a9a9a9'
      }


    // maping function


    const reviewList = selectedPlaceReviews.map((review,index)=>{

        return(

        <div className="review-list" key={index}>

            <div className="review-user-photo">
                <img src={review.img} alt={review.name} />
            </div>

            <div className="review-column-list">

                <h1>{review.name}</h1>

                <div className="review-ratings-date">

                    <div className="rating-star">

                        {arr.map((val,index)=>(
                            <FaStar
                            key={index}
                            size={20}
                            style={{margin:'0 5px 0 0'}}
                            color={review.rating > index ? starColor.active : starColor.inActive }
                            
                            />
                        ))}
                    </div>

                    <div className="rating-date">
                        <p>{review.date}</p>
                    </div>

                </div>

                <div className="review-comments">
                    <p>{review.comments}</p>
                </div>
            </div>

        </div>

        )
    })

  return (
    <div className='review-parent'>
    {reviewList}   
    </div>
  )
}

export default ReviewPage