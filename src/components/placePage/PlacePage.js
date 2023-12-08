import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectPostById } from '../../feature/place/placeSlice';
import { MdOutlineStarPurple500 } from "react-icons/md";
import './placePage.css'
import { FaLocationDot } from "react-icons/fa6";



function PlacePage() {

    const {id} = useParams()

    const selectedPost = useSelector((state)=>selectPostById(state,Number(5)))

    const rating = selectedPost.rating >= 4 ? `Most vistied Place` : selectedPost.rating >=2 ? `Moderate Visited Place` : `Average Visited Place`

    console.log(selectedPost.description.length);

  return (
    <section className='main-selected-post'>
        <div className="selected-post">
          
            <div className="selected-post-title">
              <h1>{selectedPost.title }</h1>
              <div className="selected-post-title-rating">
              <p id='title-rating'>{<MdOutlineStarPurple500 />}{`${selectedPost.rating}`}</p> 
              <p id='title-review'>{rating}</p>
              </div>
            </div>

            <img src={selectedPost.img} alt={selectedPost.title} />

            <div className="selected-post-location">
              <p id='location-icon'><FaLocationDot /></p>
              <p id='location-name'>{`${selectedPost.place}, ${selectedPost.state}, ${selectedPost.country}`}</p>
            </div>

            <p className='selected-post-para' >{selectedPost.description}</p>

            <hr className='line' />

        </div>
    </section>
  )
}

export default PlacePage