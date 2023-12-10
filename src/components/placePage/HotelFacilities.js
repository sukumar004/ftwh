import React, { useState } from 'react'
import './hotelFacilities.css'
import { FaLocationDot } from "react-icons/fa6";
import { LiaUmbrellaBeachSolid } from "react-icons/lia";
import { IoWifiOutline } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import { TbToolsKitchen } from "react-icons/tb";
import { FaWater } from "react-icons/fa";  // for hot water
import { FaHandHoldingWater } from "react-icons/fa";


function HotelFacilities({sortedHotel}) {

    const [hotel,setHotel] = useState(sortedHotel)

    const photos = Object.entries(hotel.photos)

    console.log(hotel)


  return (
    <div className="hotelDetails">
        
            <div className="hotelTitle">
                <h3>{hotel.name}</h3>
            </div>

            <div className="hotel-address">
                <p><span>{<FaLocationDot />}</span>{hotel.district},</p>
                <p>{`${hotel.state}, ${hotel.country}`}</p>
            </div>

            <h3>Image Gallery</h3>

            <div className="hotel-photos">
               {
                photos.map((photo)=>{
                    return(
                        <img src={photo[1]} alt={`'${photo[0]}'`} />
                    )         
                })
               }
            </div>

            <hr />

            <h3 id='amenities'>Hotel Facilities</h3>

            <div className="hotel-amenities">

                <p><span><LiaUmbrellaBeachSolid /></span>Beach View</p>
                <p><span><IoWifiOutline/></span>Free Wifi</p>
                <p><span><FaCarAlt/></span>Free Car parking</p>
                <p><span><TbToolsKitchen /></span>Modern Kitchen</p>
                <p><span><FaWater/></span>Hot water benefit</p>
                <p><span><FaHandHoldingWater /></span>Free Water</p>

            </div>

            <hr />

            <div className="show-hotel-button">
                <button>Show other hotels</button>
            </div>
        
    </div>
  )
}

export default HotelFacilities