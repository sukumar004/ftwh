import React from 'react'
import { useContext } from 'react'
import DataContext from '../context/DataContext'
import './profile.css'
import { IoMdClose } from "react-icons/io"; 



function Profile() {
    const {presentUser,handleAccountToggle,handleProfileToggle} = useContext(DataContext)
  return (
    <div className='profile-top-parent'>
    
    <p id='close-icon' onClick={()=>{handleProfileToggle(); handleAccountToggle()}} ><IoMdClose /></p>

        <div className="profile">
            <img src={presentUser.photoURL} alt={presentUser.providerData[0]["displayName"]} />

            <div className="details">
                <p>Name</p>
                <p>{presentUser ? presentUser.providerData[0]["displayName"] : 'Not Available'}</p>
            </div>
            <div className="details">
                <p>Email</p>
                <p>{presentUser ? presentUser.providerData[0]["email"] : "Not Availabel"}</p>
            </div>
            <div className="details">
                <p>Phone Number</p>
                <p>{presentUser.phoneNumber ? presentUser.providerData[0]["phoneNumber"] : "Not Available"}</p>
            </div>
        </div>

    </div>
  )
}

export default Profile