import React, { useEffect, useState,useContext } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectPostByIdSp,selectAllPost,addData } from '../../feature/place/placeSlice';
import { MdOutlineStarPurple500 } from "react-icons/md";
import './placePage.css'
import { FaLocationDot } from "react-icons/fa6";
import CommentPage from './CommentPage';
import ReviewPage from './ReviewPage';
import HotelCard from '../hotelCard/HotelCard';
import { selectHotelByDistrict,addHotel } from '../../feature/hotel details/hotelDetailsSlice';
import HotelFacilities from './HotelFacilities';
import BookHotelBox from '../bookHotelBox/BookHotelBox';
import { BsExclamationTriangle } from "react-icons/bs";
import DataContext from '../context/DataContext';
import { selectUserByUid } from '../../feature/userDetails/userSlice';
import useRating from '../../hooks/useRating';




function PlacePage() {

    const {id,presentUserUid} = useParams()


    const {timeChange} = useContext(DataContext)

    const post = useSelector(selectAllPost)

    
    const invidualPost = useSelector((state)=>selectPostByIdSp(state,id))

    const user = useSelector((state)=>selectUserByUid(state,invidualPost ? invidualPost.uid : ''))

    // const user = useSelector((state)=>selectUserByUid(state, invidualPost ? invidualPost.hasOwnProperty("uid") ? invidualPost.uid : ''  : ''))
    

    const rating = useRating(id ? id : '')

    const district = invidualPost ? invidualPost.district : null

    const districtHotel = useSelector((state)=>selectHotelByDistrict(state,district?district:''))
    const cheapHotelSort =  districtHotel.sort((a,b)=>(Number(a.roomRate)-(b.roomRate)))
    const copy = [...cheapHotelSort]
    const cheapHotel = cheapHotelSort.length ? cheapHotelSort[0] : null
    const remainingHotel = copy.shift();
 
  return (
    <section className='main-selected-post'>
       { (invidualPost) ?
       
       <div className="selected-post">
          
            <div className="selected-post-title">
              <h1>{invidualPost.title }</h1>
              <div className="selected-post-title-rating">
              <p id='title-rating'><span><MdOutlineStarPurple500 /></span>{`${rating>0 ? Math.floor(rating): '0'}.0`}</p> 
              {/* <p id='title-review'>{rating}</p> */}
              </div>
            </div>

            <img src={invidualPost.imgURL} alt={invidualPost.title} id='place-page-img' />

            <div className="selected-post-location">
              {/* <p id='location-icon'><FaLocationDot /></p> */}
              <p id='location-name'><span><FaLocationDot /></span>{`${invidualPost.location} (${invidualPost.district}), ${invidualPost.state}, ${invidualPost.country}`}</p>
            </div>

            <p id='selected-post-para' >{invidualPost.description}</p>

            <div className="post-author-top-parent">

              <div className="post-autor-details">
              <p>posted by</p>
              
              <p>{user ? user.name : 'sugu' } <span>{invidualPost.date ? timeChange(invidualPost.date) : '1 month'} ago</span></p>
              </div>

            </div>

            {/* <p className='selected-post-para' >{invidualPost.description}</p> */}

            <hr id='line' />

            <h3 id='cheap-hotel-tag'>Here You Can Book a Cheapest Hotel</h3>

          {cheapHotel ?
            <div className="hotel-book-in-place-page">
              {/* <HotelBook district = {invidualPost.district} /> */}

              <div className="hotel-facilities-in-place-page">
              <HotelFacilities 
              hotelIdSp = {cheapHotel.idSp}
              />

              </div>

              <div className="hotel-book-in-box-place-page">
                <BookHotelBox
                hotelIdSp = {cheapHotel.idSp}
                />
              </div>

            </div>  : 
            
            <p id='no-hotel-tag'><span><BsExclamationTriangle /></span>Oops! there is no hotel available here..</p>
          }

          

              <div className="hotel-card-in-place-page">
              <HotelCard 
              districtArray = {copy}
              districtName = {district}
              />
              </div>

              <h1 id='comment-section-id'>Comment section</h1>


            <div className="comment-page">
              <div className="comment-page-form">
              <CommentPage  postIdSp = {id}  />            
              </div>
              <div className="comment-page-reviews">
              <ReviewPage postIdSp = {id} />
              </div>
            </div>
            

        </div> :

        <p>{`Hey There is no post there`}</p>
}
    </section>
  )
}

export default PlacePage