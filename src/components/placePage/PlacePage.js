import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectPostById,selectAllPost } from '../../feature/place/placeSlice';
import { MdOutlineStarPurple500 } from "react-icons/md";
import './placePage.css'
import { FaLocationDot } from "react-icons/fa6";
import HotelBook from './HotelBook';
import CommentPage from './CommentPage';
import ReviewPage from './ReviewPage';
import HotelCard from '../hotelCard/HotelCard';




function PlacePage() {

    const {id} = useParams()


    const post = useSelector(selectAllPost)
    
    
    const invidualPost = useSelector((state)=>selectPostById(state,id))

    console.log("post",post)
    console.log("inividual",invidualPost)
    console.log("id",id)

    const invidualPostByFilter = post.filter(post=>((post.idSp.toUpperCase()) === (id.toUpperCase())))

    console.log("invidualPostByFilter",invidualPostByFilter)

  




    // const selectedPost = useSelector((state)=>selectPostById(state,id))

    // const rating = selectedPost.rating >= 4 ? `Most vistied Place` : selectedPost.rating >=2 ? `Moderate Visited Place` : `Average Visited Place`

 
  return (
    <section className='main-selected-post'>
       { invidualPost ?
       
       <div className="selected-post">
          
            <div className="selected-post-title">
              <h1>{invidualPost.title }</h1>
              <div className="selected-post-title-rating">
              <p id='title-rating'>{<MdOutlineStarPurple500 />}{`${invidualPost.rating ? invidualPost.rating : '3.0'}`}</p> 
              {/* <p id='title-review'>{rating}</p> */}
              </div>
            </div>

            <img src={invidualPost.imgURL} alt={invidualPost.title} />

            <div className="selected-post-location">
              <p id='location-icon'><FaLocationDot /></p>
              <p id='location-name'>{`${invidualPost.location}, ${invidualPost.state}, ${invidualPost.country}`}</p>
            </div>

            <p className='selected-post-para' >{invidualPost.description}</p>

            <p className='selected-post-para' >{invidualPost.description}</p>

            <hr className='line' />

            <div className="hotel-book">
              <HotelBook district = {invidualPost.district} />
            </div>

            <div className="comment-page">

            <CommentPage  />            
            <ReviewPage />
            </div>

            {/* <HotelCard /> */}
            

        </div> :
        <p>{`Hey There is no post there`}</p>
}
    </section>
  )
}

export default PlacePage