import React, { useEffect } from 'react'
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import './hotelBook.css'
import { useState } from 'react';
import { selectHotelByDistrict } from '../../feature/hotel details/hotelDetailsSlice';
import { FaIndianRupeeSign } from "react-icons/fa6";
import HotelFacilities from './HotelFacilities';



function HotelBook({district}) {


    const [select,setSelect] = useState(false)


   const handleSelect = () => (setSelect(pre => pre = !pre))

    

    const hotelsInDistrict = useSelector((state)=>selectHotelByDistrict(state,district))
    const cheapHotelSort =  hotelsInDistrict.sort((a,b)=>(Number(a.roomRate)-(b.roomRate)))
    const cheapHotel = cheapHotelSort.length ? cheapHotelSort[0] : []





    // console.log("cheapHotelSort",cheapHotel)

 


   
   // After this for booking slice

   



   const [checkIn,setCheckIn] = useState()
   const [checkOut,setCheckOut] = useState()
   const [days,setDays] = useState(0)
   const [adult,setAdult] = useState(1)
   const [children,setChildren] = useState(0)
   const [infant,setInfant] = useState(0)
   const [amount,setAMount] = useState()
   const [serviceAmount,setServiceAmount] = useState()
   const [TotalAmount,setTotalAmount] = useState()

   const adultAmount = cheapHotel.adultRate
   const childrenAmount = cheapHotel.childRate
   const initialAmount = cheapHotel.roomRate
   const [showAmount,setShowAmount] = useState(0)
   

   

   const addAdult = () =>{
    setAdult(pre => {

        return(
            pre = pre+1
        )
       
    })
   }
   const subAdult = () => {
    setAdult((pre)=>{
        if(pre===1) {return pre = 1;}
        else{
          return  pre = pre - 1
        }
    })
   }

   const addCount = (method) => {
        method(pre=>{
            return(
                pre = pre + 1
            )
        })
   }

   const subCount = (method) => {
    method(pre=>{
        if(pre===0) {return pre = 0;}
        else
        return(
            pre = pre -1
        )
    })
   }


   function dateDiffInDays(a, b) {
    const milliSecondsPerDay = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / milliSecondsPerDay);
  }


  useEffect(()=>{
   const days =  dateDiffInDays(new Date(checkIn),new Date(checkOut))
        setDays(pre=>{
        if(days >= 1) return setDays(days)
        else{
        return(
            setDays(0)
        )    
        }
        })

        const amountCalculate = () =>{
            const total_amount = (Number(adult) * Number(adultAmount)) + ((Number(children) * Number(childrenAmount))-Number(adultAmount))  
            const amount = Number(cheapHotel.roomRate) + total_amount
            setShowAmount((pre)=>{
                if(amount<1) return pre = 0
                else{
                    return(
                        pre = amount
                    )
                }
            })
            setAMount((pre)=>{
                return(
                    pre = Number(amount) * Number(days)
                )
            })
        }

        const taxCalculate = () => {
            const serviceCharges = ((5/100)*amount).toFixed(2)
            setServiceAmount(serviceCharges)
            const finalTotal = (Number(amount) + Number(serviceCharges)).toFixed(2)
            setTotalAmount(finalTotal)
        }

        amountCalculate()
        taxCalculate()

  },[checkIn,checkOut,adult,children,amount])

  


  return (

<div className="parent-body">

    {cheapHotelSort.length ?

    <div className="parent-error-check">

            


        <div className="child-1">

            <HotelFacilities hotelIdSp = {cheapHotel.idSp} />

            </div>

    

        <div className="child-2">

        
        

            <div className="hotel">

                <div className="hotel-title">
                    <h1>Book Rooms with Cheapest %</h1>
                </div>
                
                <div className="hotel-amount-review">

                    <div className="hotel-amount">
                        <h1><FaIndianRupeeSign />{cheapHotel && `${cheapHotel.roomRate}`} <span id='amount-day'>{`night`}</span></h1>
                    </div>

                    <div className="hotel-review">
                        <div className="hotel-details">
                            <h3>{cheapHotel && `${cheapHotel.name.substring(0,20)}`}</h3>
                        </div>
                        <div className="hotel-review-rating">
                        <p id='review-icon'>{<MdOutlineStarPurple500 />}</p>
                        <h4>{`4.91`}<span id='review-count'>{`.58 reviews`}</span></h4> 
                        </div>        
                    </div>
                
                </div>

                    <div className="hotel-dates-members">

                        <div className="hotel-check-dates">

                                <div className="hotel-check-in">
                                    <label  htmlFor="date-check-in">
                                        CHECK-IN
                                    </label>
                                    <input type="date" id='date-check-in' name='date-check-in' value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} />
                                </div>


                            <div className="v-line"></div>

                                <div className="hotel-check-out">
                                    <label htmlFor="date-check-out">
                                        CHECKOUT
                                    </label>
                                    <input type="date" id='date-check-out' name='date-check-out'value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} />
                                </div>

                        </div>

                        <div className="h-line">
                        </div>

                        {/* <hr /> */}

            
                        <div className="guests" >

                            

                            <div className="guest-heading"  onClick={handleSelect}>
                                <h4>{`GUESTS`}</h4>
                                <p>{`${adult + children} guests, ${infant} infants`}</p>
                            </div>

                                
                            <div className="guest-list"  onClick={handleSelect}>
                                {select ? <p>{<IoIosArrowUp/>}</p> : <p>{<IoIosArrowDown/>}</p>}
                            </div>



                            {select &&  
                            
                            <div className="select-main">

                                <div className="select-members">
                                    
                                    <div className="common-members">

                                        <div className="adult-description">
                                            <h3>Adults</h3>
                                            <p>Age 13+</p>
                                        </div>

                                        <div className="adult-counter">
                                            <button className='button-members' onClick={subAdult}>-</button>
                                            <p><span>{`${adult}`}</span></p>
                                            <button className='button-members' onClick={addAdult}>+</button>
                                        </div>

                                    </div>

                                    <div className="common-members">

                                        <div className="children-description">
                                            <h3>Children</h3>
                                            <p>Age 2-12</p>
                                        </div>

                                        <div className="children-counter">
                                            <button className='button-members' onClick={()=>subCount(setChildren)} >-</button>
                                            <p><span>{`${children}`}</span></p>
                                            <button className='button-members' onClick={()=>addCount(setChildren)} >+</button>
                                        </div>

                                    </div>

                                    <div className="common-members">

                                        <div className="infants-description">
                                            <h3>Infants</h3>
                                            <p>Under Age 2</p>
                                        </div>

                                        <div className="infants-counter">
                                            <button className='button-members' onClick={()=>subCount(setInfant)}>-</button>
                                            <p><span>{`${infant}`}</span></p>
                                            <button className='button-members' onClick={()=>addCount(setInfant)}>+</button>
                                        </div>

                                    </div>

                                    
                                <div className="close-button">
                                    <button onClick={handleSelect}>Close</button>
                                </div>

                                </div>
                            </div>
                                
                            }

                        </div>
                    </div>


                    
                    
        


                    <div className="hotel-booking-button">
                        <button>Book Now</button>
                    </div>


                    <div className="amount-specific">

                        <div className="amount-actual">
                            <h5 id='underline'>{`${showAmount} `}{<RxCross2 />}{days>1 ? `${days} nights` : `${days} night`}</h5>
                            <h5><span id='rupees'><FaIndianRupeeSign /></span>{amount >= 0 ? `${amount}`: `0`}</h5>
                        </div>

                        <div className="amount-service">
                            <h5 id='underline'>{`FTWH service fee 5%`}</h5>
                            <h5><span id='rupees'><FaIndianRupeeSign /></span>{serviceAmount >= 0 ? `${serviceAmount}`: `0`}</h5>
                        </div>

                        <hr />

                        <div className="amount-total">
                            <h5>{`Total amount`} <span>{`(Include all tax)`}</span></h5>
                            <h5><span id='rupees'><FaIndianRupeeSign /></span>{TotalAmount >= 0 ? `${TotalAmount}`: `0`}</h5>
                        </div>

                    </div>
            
            </div>

        </div>
    
    </div> :
     

    <div className="hotel-not-found">
        <p>{`Sorry! Hotels aren't available in your selected place..`}</p> 
        <button>Click here for more hotels</button>
    </div>
    }


</div>

  )
}

export default HotelBook