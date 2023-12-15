import React, { useState } from 'react'
import './hotelFacilities.css'
import { FaLocationDot } from "react-icons/fa6";
import { LiaUmbrellaBeachSolid } from "react-icons/lia";
import { IoWifiOutline } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import { TbToolsKitchen } from "react-icons/tb";
import { FaWater } from "react-icons/fa";  // for hot water
import { FaHandHoldingWater } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { selectHotelByIdSp } from '../../feature/hotel details/hotelDetailsSlice';
import HotelCard from '../hotelCard/HotelCard';


function HotelFacilities({hotelIdSp}) {

    const selectedHotelInHotelFacilities = useSelector((state)=>selectHotelByIdSp(state,hotelIdSp))


    const hotel = selectedHotelInHotelFacilities



    


  return (
    <div className="hotelDetails">

        {selectedHotelInHotelFacilities ? 

        <div className='hotel-details-check'>

        
        
            <div className="hotelTitle">
                <h3>{hotel.name}</h3>
            </div>

            <div className="hotel-address">
                <p><span>{<FaLocationDot />}</span>{hotel.district},</p>
                <p>{`${hotel.state}, ${hotel.country}`}</p>
            </div>

            <h3>Image Gallery</h3>

            <div className="hotel-photos">

                <img src={hotel.imgURL} alt={hotel.name} />

               {/* {
                photos.map((photo)=>{
                    return(
                        <img src={photo[1]} alt={`'${photo[0]}'`} />
                    )         
                })
               } */}
            </div>

            <hr />

            <h3 id='amenities'>Hotel Facilities</h3>

            <div className="hotel-amenities">

                <p style={{textDecoration: hotel.IsBeachView ? `none` : "line-through"}}><span><LiaUmbrellaBeachSolid /></span>Beach View</p>
                <p style={{textDecoration: hotel.IsFreeWifi ? `none` : "line-through"}}><span><IoWifiOutline/></span>Free Wifi</p>
                <p style={{textDecoration: hotel.IsFreeCarParking ? `none` : "line-through"}}><span><FaCarAlt/></span>Free Car parking</p>
                <p style={{textDecoration: hotel.IsModernKitchen ? `none` : "line-through"}}><span><TbToolsKitchen /></span>Modern Kitchen</p>
                <p style={{textDecoration: hotel.IsHotWaterBenefit ? `none` : "line-through"}}><span><FaWater/></span>Hot water benefit</p>
                <p style={{textDecoration: hotel.IsFreeWater ? `none` : "line-through"}}><span><FaHandHoldingWater /></span>Free Water</p>

            </div>

            <hr />

            

        </div> : 

        <div className="hotel-details-check">

            <p>{`Sorry! Hotel aren't available there..`}</p>

        </div>

        }
        
    </div>
  )
}

export default HotelFacilities