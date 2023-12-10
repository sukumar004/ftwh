import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'

const CommentPage = () => {

  const [state,setState] = useState({rating:''})

  const changeRating = (newRating) => {setState({rating:newRating})}
  
  return (
    <div className="comment-parent">
        <h1>Feedback About this place</h1>
        <div className="comment-form">
            <div className="star-rating">
                <StarRatings
                rating={state.rating}
                starRatedColor='blue'
                changeRating={changeRating}
                numberOfStars={5}
                name='rating'
                />
            </div>
            <select name="review-topic" id="review-topic">
                <option value="">select related topics</option>
                <option value="Nice Place">Nice Place</option>
                <option value="Good for Family Trip">Good for Family Trip</option>
                <option value="Fully Enjoyable">Fully Enjoyable</option>
                <option value="Boring">Boring</option>
                <option value="Worst Place">Worst Place</option>
            </select>
            <textarea name="review" id="review" cols="30" rows="10" placeholder='Enter your journey'></textarea>
            <button>Submit</button>
        </div>

    </div>
  )
}

export default CommentPage