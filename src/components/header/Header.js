import React, { useContext } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import PlaceForm from '../add/PlaceForm';
import DataContext from '../context/DataContext';
import HotelForm from '../add/HotelForm';

const Header = () => {

const {placeState,handlePlaceToggle,hotelState,handleHotelToggle} = useContext(DataContext)

console.log("placeState",placeState)
console.log("handlePlaceToggle",handlePlaceToggle)

  return (
    <header>
      <div className="header" id='header'>
        <div className="logo">

          {/* <h1>Find Travel with Happy</h1> */}
          <img src="/FTWH.png" alt="ftwh logo" />

        </div>

        <div className="nav">

            <ul>
                <Link to='/'><li>Home</li></Link>
                <li onClick={()=>handlePlaceToggle()}>Post Place</li>
                <li onClick={()=>handleHotelToggle()}>Post Hotel</li>
                  <li>About Us</li>
                <li><FaRegUserCircle /></li>
            </ul>
            
        </div>
      </div>

      <div className="post-form">
        {
          (placeState && !hotelState) &&
          <PlaceForm />
        }
        {
          (hotelState && !placeState) &&
          <HotelForm />
        }
      </div>
    </header>

  )
}


export default Header