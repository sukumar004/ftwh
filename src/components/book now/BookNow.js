import React from 'react'
import { useParams } from 'react-router-dom'
import { selectHotelByIdSp } from '../../feature/hotel details/hotelDetailsSlice'
import { useSelector } from 'react-redux'
import HotelFacilities from '../placePage/HotelFacilities'
import BookHotelBox from '../bookHotelBox/BookHotelBox'
import './bookNow.css'

function BookNow() {

    const {id} = useParams()

    const selectedPost = useSelector((state)=>selectHotelByIdSp(state,"6k86Fk8xDxVV5JLL2T2bI"))
    


  return (
  <div className="book-hotel-confirm-parent">

    <section className='book-hotel-child-1'>
    
    <div className="child-hotel-facilities">
        <HotelFacilities
        hotelIdSp = {id}
        />
    </div>

    <div className="child-hotel-book">
      <BookHotelBox 
      hotelIdSp = {id}
      />
    </div>

    </section>

  </div>
  )
}

export default BookNow