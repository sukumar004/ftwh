import React, { useEffect, useState } from 'react'
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
import { MdKey } from "react-icons/md";
import HotelCard from '../hotelCard/HotelCard';
import Aos from 'aos';
import 'aos/dist/aos.css'

function HotelFacilities({hotelIdSp}) {

    const selectedHotelInHotelFacilities = useSelector((state)=>selectHotelByIdSp(state,hotelIdSp))


    const hotel = selectedHotelInHotelFacilities

    useEffect(()=>{Aos.init()},[])

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

            <h3 data-aos='fade-right'>Image Gallery</h3>

            <div className="hotel-photos" >

                <img src={hotel.imgURL} alt={hotel.name} id='sepicifc-image-id' data-aos='flip-left'/>
                <img src='/images/ht-1.jpg' alt={hotel.name} id='sepicifc-image-id' data-aos='flip-left'/>
                <img src='/images/ht-2.jpg' alt={hotel.name} id='sepicifc-image-id' data-aos='flip-left'/>
                <img src={hotel.imgURL} alt={hotel.name} id='sepicifc-image-id' data-aos='flip-left'/>


               {/* {
                photos.map((photo)=>{
                    return(
                        <img src={photo[1]} alt={`'${photo[0]}'`} />
                    )         
                })
               } */}
            </div>

            <hr id='hotel-facilities-hr' />

            <h3 id='amenities' data-aos='fade-right'>Hotel Facilities</h3>

            <div className="hotel-amenities">

                <p style={{textDecoration: hotel.IsBeachView ? `none` : "line-through"}}><span><LiaUmbrellaBeachSolid /></span>Beach View</p>
                <p style={{textDecoration: hotel.IsFreeWifi ? `none` : "line-through"}}><span><IoWifiOutline/></span>Free Wifi</p>
                <p style={{textDecoration: hotel.IsFreeCarParking ? `none` : "line-through"}}><span><FaCarAlt/></span>Free Car parking</p>
                <p style={{textDecoration: hotel.IsModernKitchen ? `none` : "line-through"}}><span><TbToolsKitchen /></span>Modern Kitchen</p>
                <p style={{textDecoration: hotel.IsHotWaterBenefit ? `none` : "line-through"}}><span><FaWater/></span>Hot water benefit</p>
                <p style={{textDecoration: hotel.IsFreeWater ? `none` : "line-through"}}><span><FaHandHoldingWater /></span>Free Water</p>

            </div>

            <hr id='hotel-facilities-hr' />

            <div className="hotel-rules-top-parent">
                <h3 data-aos='fade-right'>Hotel Rules</h3>

                <div className="hotel-rules">
                
                    <div className="hotel-rules-list">
                        <img src="/images/ckin.png" />
                        <p>Before 11AM</p>
                    </div>
                    <div className="hotel-rules-list">
                        <img src="/images/ckout.png" />
                        <p>After 1PM</p>
                    </div>
                    <div className="hotel-rules-list">
                        <img src="/images/smoke.png" />
                        <p>Smoke allowed</p>
                    </div>
                    <div className="hotel-rules-list">
                        <img src="/images/pets.png" />
                        <p>Pets not allowed</p>
                    </div>
              
                </div>
            </div>

            <hr id='hotel-facilities-hr' />

        </div> : 

        <div className="hotel-details-check">

            <p>{`Sorry! Hotel aren't available there..`}</p>

        </div>

        }
        
    </div>
  )
}

export default HotelFacilities