import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllHotels,selectHotelByDistrict } from '../../feature/hotel details/hotelDetailsSlice'
import './hotelCard.css'
import { FaStar } from 'react-icons/fa6'

function HotelCard() {

    const districtHotels = useSelector((state)=>selectHotelByDistrict(state,'trichy'))
    const allHotels = useSelector(selectAllHotels)

    const start = Array(5).fill(0)

    const starColor = {
        active:'#FFBA5A',
        inActive:'#a9a9a9'
      }
    



  return (
    <div className="hotel-card-parent">

        <div className="district-hotel-parent">

            <div className="hotel-cover-image">
                <img src="/images/ht-1.jpg" alt="hotel title" />
            </div>

            <div className="hotel-details">

                <div className="hotel-title">
                    <h1>Hotel Name</h1>
                </div>

                <div className="hotel-ratings">
                    <p>
                    {start.map((val,index)=>(
                                <FaStar
                                key={index}
                                size={10}
                                style={{margin:'0 5px 0 0'}}
                                color={3 > index ? starColor.active : starColor.inActive }

                                />
                        ))} 3.0 
                    </p>
                       
                </div>

                <div className="hotel-location">
                    <p>{`location,district`}</p>
                </div>

                <div className="hotel-amenities-amount">

                    <div className="hotel-amenities-top">
                        
                        <h5>This place offers</h5>
                       

                        <div className="hotel-amenities-topics">
                        <p>Free wifi</p>
                        <p>Free wifi</p>
                        <p>Free wifi</p>
                        </div>

                    </div>

                    <div className="hotel-amount-bottom">
                        <h3>Rs 10000</h3>
                        <button>Book Now</button>
                    </div>

                </div>

            </div>



        </div>

    </div>
  )
}

export default HotelCard