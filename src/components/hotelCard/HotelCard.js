import React, { useState,useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllHotels,selectHotelByDistrict } from '../../feature/hotel details/hotelDetailsSlice'
import './hotelCard.css'
import { FaStar } from 'react-icons/fa6'
import { MdOutlineEventAvailable } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'
import Aos from 'aos'
import 'aos/dist/aos.css'


function HotelCard({districtArray,districtName}) {

    const [showResult,setShowResult] = useState(false)

    const {scrollToTop} = useContext(DataContext)


    // const remain = useSelector((state)=>selectRemainingDistrictHotles(state,districtName))
    // const districtHotels = useSelector((state)=>selectHotelByDistrict(state,'trichy'))
    const allHotels = useSelector(selectAllHotels)
    const remainingDistrictHotels = allHotels.filter(val=>(val.district !== districtName))
    const districtArrayLength = districtArray.length
    const allShowHotels = [...districtArray,remainingDistrictHotels].flat()
    const smallHotels = allShowHotels.slice(0,6)



    const start = Array(5).fill(0)

    const starColor = {
        active:'#FFBA5A',
        inActive:'#a9a9a9'
      }

    useEffect(()=>{
        Aos.init()
    },[])

    
    const districtHotelList = (!showResult ? smallHotels : allShowHotels ).map(val=>{

        return(
        
        
     
            <div className="district-hotel-parent" data-aos='fade-up'>
                <Link id='hotel-link' to={`/bookNow/${val.idSp}`} onClick={()=>scrollToTop()}>

            <div className="hotel-cover-images" id='selected-img-div'>
                <img src={val.imgURL} alt={`${val.title}`} id='selected-img'/>
            </div>

            <div className="hotel-details-card">

                <div className="hotel-title">
                    <h1>{val.name ? val.name.length < 20 ? val.name : `${val.name.slice(0,20)}..` : `Hotel Name`}</h1>
                </div>

                <div className="hotel-ratings">
                    <p>
                    {start.map((val,index)=>(
                                <FaStar
                                key={index}
                                size={8}
                                style={{margin:'0 5px 0 0'}}
                                color={3 > index ? starColor.active : starColor.inActive }

                                />
                        ))} 3.0 
                    </p>
                       
                </div>

                <div className="hotel-location">
                    <p><span><FaLocationDot /></span>{`${val.location}, ${val.district}`}</p>
                </div>

                <div className="amenities-amount">

                    <div className="hotel-amenities-top">
                        
                        <h5>This place offers</h5>
                       

                        <div className="hotel-amenities-topics">
                        <p style={{textDecoration: val.IsFreeCarParking ? `none` : "line-through"}}><span><MdOutlineEventAvailable /></span>Free car parking</p>
                        <p style={{textDecoration: val.IsFreeWifi ? `none` : "line-through"}}><span><MdOutlineEventAvailable /></span>Free Wifi</p>
                        <p style={{textDecoration: val.IsModernKitchen ? `none` : "line-through"}}><span><MdOutlineEventAvailable /></span>Modern Kitchen</p>
                        <p style={{textDecoration: val.IsHotWaterBenefit ? `none` : "line-through"}}><span><MdOutlineEventAvailable /></span>Hot Water benefit wifi</p>
                        <p style={{textDecoration: val.IsBeachView ? `none` : "line-through"}}><span><MdOutlineEventAvailable /></span>Beach View</p>
                        <p style={{textDecoration: val.IsFreeWater ? `none` : "line-through"}}><span><MdOutlineEventAvailable /></span>Free Water</p>
                        </div>

                    </div>

                    <div className="hotel-amount-bottom">
                        <h3><span><FaIndianRupeeSign /></span> {val.roomRate}</h3>
                        <Link to={`/bookNow/${val.idSp}`}><button>Book Now</button></Link>
                    </div>

                </div>

            </div>


            </Link>
        </div>

        )
      })


  return (
    <div className="hotel-card-parent">

        {/* {showResult && 
        <div className="filter-hotel-parent">

            <select name="costFilter" id="CostFilter" value={costFilter} onChange={(e)=>setCostFilter(e.target.value)}>
                <option >Search Filter</option>
                <option value="lth">Low to High</option>
                <option value="htl">High to Low</option>
            </select>

        </div>
        } */}


        <div className="other-district-hotels-heading">
            <h3 data-aos='fade-right'>Other hotels</h3>
        </div>
        
        
        <div className="hotel-card-grid-parent">
        {districtHotelList}
        </div>


        {(districtArray && !showResult && allShowHotels.length>6) &&
            <div className="show-other-hotels-button" style={{margin:'1rem 0 2rem 0'}}>
                <button onClick={()=>setShowResult(pre=>(pre=!pre))} style={{margin:'1rem 0 2rem 0'}} data-aos='fade-down'>Show More hotels</button>
            </div>

            
        }

        <hr id='load-more-hotels-button-space'/>
    </div>
  )
}

export default HotelCard