import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import './commentPage.css'

const CommentPage = () => {

  const start = Array(5).fill(0)

  const [currentValue,setCurrentValue] = useState(5)


  const handleClick = value => {
    
    if(currentValue === value){
      return setCurrentValue(0)
    }else{
      return setCurrentValue(value)
    }
  }


  const starColor = {
    active:'#FFBA5A',
    inActive:'#a9a9a9'
  }

  
  return (
    <div className="comment-parent-top">
      <div className="comment-parent">
          <h1>Feedback About this place</h1>
      
              <div className="star-rating">
                  {start.map((start,index)=>{
                    return(
                    <FaStar key={index} 
                    // size={24}
                    color={(currentValue > index ? starColor.active : starColor.inActive)}
                    style={{cursor:'pointer',margin:'0 .2rem'}}
                    onClick={()=>handleClick(index+1)}   
              
                    />
                    ) 
                  })}
              </div>

              <div className="review-form">

                <label htmlFor="review-topic">select category</label>
                <select name="review-topic" id="review-topic">
                    <option value="">select related topics</option>
                    <option value="Nice Place">Nice Place</option>
                    <option value="Beautiful place for Family Trip">Beautiful place for Family Trip</option>
                    <option value="Fully Enjoyable">Fully Enjoyable</option>
                    <option value="Boring">Boring</option>
                    <option value="Worst Place">Worst Place</option>
                </select>
                <label htmlFor="review">write review</label>
                <textarea  name="review" id="review" cols="30" rows="10" placeholder='comment your experience..'></textarea>
                <button>Submit</button>

              </div>      

      </div>
    </div>
  )
}

export default CommentPage