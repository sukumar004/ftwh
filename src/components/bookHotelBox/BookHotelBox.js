import React, { useEffect, useState } from 'react'
import { selectHotelByIdSp } from '../../feature/hotel details/hotelDetailsSlice'
import { useSelector } from 'react-redux'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import './bookHotelBox.css'




function BookHotelBox({hotelIdSp}) {

    const selectedPost = useSelector((state)=>selectHotelByIdSp(state,hotelIdSp))

    const [IsShown,setShown] = useState(false)

    const handleShown = () => {
        setShown(pre=>pre=!pre)
    }

    // for amount calculation
    
    const [checkIn,setCheckIn] = useState()
   const [checkOut,setCheckOut] = useState()
   const [days,setDays] = useState(0)
   const [adult,setAdult] = useState(1)
   const [children,setChildren] = useState(0)
   const [room,setRoom] = useState(1)
   const [amount,setAMount] = useState()
   const [amountWithDays,SetAmountWithDays] = useState()
   const [serviceAmount,setServiceAmount] = useState()
   const [TotalAmount,setTotalAmount] = useState()

   const adultAmount = selectedPost.adultRate
   const childrenAmount = selectedPost.childRate
   const initialAmount = selectedPost.roomRate

   const addCount = (method) => {
    method(pre=>{
        return(
            pre = pre + 1
        )
    })
    }

    const subCount = (method) => {
        if(method === setAdult || method === setRoom){
            method(pre=>{
                if(pre===1) {return pre=1}
                else{
                    return pre = pre-1
                }
            })
        } else
        method(pre=>{
            if(pre===0) {return pre = 0;}
            else
            return(
                pre = pre -1
            )
        })
    }

    const daysCalculate = (a,b) => {

        const milliSecondsPerDay  = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        console.log(utc1,utc2)

        return Math.floor((utc2 - utc1) / milliSecondsPerDay);
    }

    useEffect(()=>{

        // For days call and set the values

        const daysCount =  daysCalculate(new Date(checkIn),new Date(checkOut))
        setDays(pre=>{
            if(daysCount >= 1) return setDays(daysCount)
            else{
            return(
                setDays(0)
                )    
            }
        })

        // For actual amount and days calculate

        const amountCalaculate = () => {
            
            const subAmount = adult >= 1 ? adultAmount : 0
            const actualAmount = ((Number(adultAmount)*Number(adult)) + (Number(childrenAmount)*Number(children))) - Number(subAmount)
            const showAmount = (((Number(room))*initialAmount) + actualAmount)
            setAMount(pre=>(pre = showAmount < 1 ? 0 : showAmount))
            SetAmountWithDays(pre=>(pre =  ((Number(days)*Number(showAmount)).toFixed(2))))
            const serviceCharge = ((5/100)*amountWithDays).toFixed(2)
            setServiceAmount(pre=>(pre = serviceCharge < 1 ? 0 : serviceCharge))
            const finalAmount = (Number(amountWithDays) + Number(serviceAmount)).toFixed(2)
            setTotalAmount(pre => (pre =finalAmount))

            console.log("actualAmount",actualAmount)
            console.log("showAmount ",showAmount)

        }

        amountCalaculate()

    },[checkIn,checkOut,adult,room,children,amountWithDays,days,serviceAmount])

    


  return (
    <>
  
    <div className="top-parent-book-hotel-box">

        
        <div className="book-hotel-outer-box">

             {/* Amount and day-night div */}

            <div className="top-column-parent">

                <div className="top-parent-cost-hotel-name">

                    <h1><FaIndianRupeeSign />{`${selectedPost ? initialAmount : `0`}`}<span id='amount-day'>{`night`}</span></h1>

                </div>

                {/* Hotel name and review div */}

                <div className="top-parent-review-counts-rating">

                    <div className="hotel-details-name">
                            <h3>{selectedPost ? `${selectedPost.name.substring(0,20)}` : `Hotel Name`}</h3>
                    </div>
                    <div className="hotel-review-rating">
                        <h4><span><MdOutlineStarPurple500 /></span>{`4.91`}<span id='review-count'>{`.58 reviews`}</span></h4> 
                    </div>   

                </div>
            </div>
             {/* dates and guest div */}

            <div className="hotel-dates-guest-selecting">

                 {/* check in/out dates selecting */}

                <div className="hotel-dates-selecting">

                    <div className="hotel-dates-check-in-selecting">
                        <label  htmlFor="date-check-in">CHECK-IN</label>
                        <input type="date" id='date-check-in' name='date-check-in' onChange={(e)=>setCheckIn(e.target.value)} />
                    </div>

                    <div className="hotel-dates-check-out-selecting">
                        <label htmlFor="date-check-out">CHECKOUT</label>
                        <input type="date" id='date-check-out' name='date-check-out' onChange={(e)=>setCheckOut(e.target.value)} />
                    </div>

                </div>

                {/* Guest selecting div  */}

                <div className="hotel-guests-rooms-selecting" >

                    <div className="shown-div" onClick={handleShown}>

                        <div className="hotel-guests-listing">
                            <h4>{`GUESTS`}</h4>
                            <p>{`${adult+children} guests, ${room} room`}</p>
                        </div>

                        <div className="hotel-guests-arrow-listing">
                            <p><span>{IsShown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></p>
                        </div>

                    </div>
                     {/* if selected this div will open that fixed position */}

                    {IsShown && 

                    <div className="members-room-parent-selecting">

                        <div className="members-room-child-selecting">

                            <div className="members-room-common-selecting">

                                <div className="members-selecting">
                                    <h3>Adults</h3>
                                    <p>Age 13+</p>
                                </div>

                                <div className="members-count-selecting">
                                    <button className='button-members' onClick={()=>subCount(setAdult)}>-</button>
                                    <p><span>{`${adult}`}</span></p>
                                    <button className='button-members' onClick={()=>addCount(setAdult)}>+</button>
                                </div>

                            </div>

                            <div className="members-room-common-selecting">

                                <div className="members-selecting">
                                    <h3>Children</h3>
                                    <p>Age 2-12</p>
                                </div>

                                <div className="members-count-selecting">
                                    <button className='button-members' onClick={()=>subCount(setChildren)}>-</button>
                                    <p><span>{`${children}`}</span></p>
                                    <button className='button-members' onClick={()=>addCount(setChildren)}>+</button>
                                </div>

                            </div>

                            <div className="members-room-common-selecting">

                                <div className="members-selecting">
                                    <h3>Rooms</h3>
                                    <p>Max 4 members/room</p>
                                </div>

                                <div className="members-count-selecting">
                                    <button className='button-members' onClick={()=>subCount(setRoom)}>-</button>
                                    <p><span>{`${room}`}</span></p>
                                    <button className='button-members' onClick={()=>addCount(setRoom)}>+</button>
                                </div>
                                
                            </div>

                            <div className="members-selecting-close">
                                <button onClick={handleShown}>Close</button>
                            </div>

                        </div>
                    </div>
                    }

                </div>


            </div>

            {/* Book confirm button  */}
            
            <div className="hotel-booking-confirm">
                <button>Book Now</button>
            </div>


            {/* Amount calculation div */}


            <div className="hotel-booking-amonunt-calculation">

                <div className="actual-amount-days">
                    <h5 ><span id='rupees'><FaIndianRupeeSign /></span>{amount ? amount : 0}{<RxCross2 />}{days>1 ? `${days} nights` : `${days} night`}</h5>
                    <h5><span id='rupees'><FaIndianRupeeSign /></span>{amountWithDays ? amountWithDays : 0}</h5>
                </div>

                <div className="actual-amount-days">
                    <h5 >{`FTWH service fee 5%`}</h5>
                    <h5><span id='rupees'><FaIndianRupeeSign /></span>{serviceAmount && Number(serviceAmount) ? serviceAmount : 0}</h5>
                </div>

                <hr />

                <div className="actual-amount-days" id='selected'>
                    <h5 >{`Total amount`}<span>{`(Include all tax)`}</span></h5>
                    <h5><span id='rupees'><FaIndianRupeeSign /></span>{TotalAmount && Number(TotalAmount) ? TotalAmount : 0}</h5>
                </div>


            </div>






        </div>


    </div>
    </>
  )
}

export default BookHotelBox