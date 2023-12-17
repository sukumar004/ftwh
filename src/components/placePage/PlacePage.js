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
import { selectHotelByDistrict } from '../../feature/hotel details/hotelDetailsSlice';
import HotelFacilities from './HotelFacilities';
import BookHotelBox from '../bookHotelBox/BookHotelBox';





function PlacePage() {

    const {id} = useParams()


    const post = useSelector(selectAllPost)
    
    
    const invidualPost = useSelector((state)=>selectPostById(state,id))

    const district = invidualPost.district

    const districtHotel = useSelector((state)=>selectHotelByDistrict(state,district))
    const cheapHotelSort =  districtHotel.sort((a,b)=>(Number(a.roomRate)-(b.roomRate)))
    const copy = [...cheapHotelSort]
    const cheapHotel = cheapHotelSort.length ? cheapHotelSort[0] : []
    const remainingHotel = copy.shift();





    console.log("post",post)
    console.log("inividual",invidualPost)
    console.log("id",id)

    const invidualPostByFilter = post.filter(post=>((post.idSp.toUpperCase()) === (id.toUpperCase())))

    console.log("invidualPostByFilter",invidualPostByFilter)
    console.log("districtHotel",districtHotel)
    console.log("cheapHotelSort",cheapHotelSort)
    console.log("cheapHotel",cheapHotel)

  




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

            {/* <p className='selected-post-para' >{invidualPost.description}</p> */}

            <hr className='line' />

            <h3 id='cheap-hotel-tag'>Here You Can Book a Cheapest Hotel</h3>

          {cheapHotel ?
            <div className="hotel-book-in-place-page">
              {/* <HotelBook district = {invidualPost.district} /> */}

              <div className="hotel-facilities-in-place-page">
              <HotelFacilities 
              hotelIdSp = {cheapHotel.idSp}
              />

              </div>

              <div className="hotel-book-in-place-page">
                <BookHotelBox
                hotelIdSp = {cheapHotel.idSp}
                />
              </div>

            </div>  : 
            
            <p>There is no cheap hotel here..</p>
          }

              <div className="hotel-card-in-place-page">
              <HotelCard 
              districtArray = {copy}
              districtName = {district}
              />
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