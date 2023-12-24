import React, { useContext, useEffect, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import PlaceForm from '../add/PlaceForm';
import DataContext from '../context/DataContext';
import HotelForm from '../add/HotelForm';
import Profile from '../profile/Profile.js';
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io"; 
import {auth,provider} from '../../firebaseConfig.js'
import {signInWithPopup,signOut} from 'firebase/auth'
import {collection,addDoc} from 'firebase/firestore'
import { db } from '../../firebaseConfig.js';
import { useNavigate } from 'react-router-dom';




const Header = () => {

const {placeState,handlePlaceToggle,hotelState,handleHotelToggle,navState,handleNavToggle,presentUser,setPresentUser,accountShow,handleAccountToggle,
  profileState,handleProfileToggle} = useContext(DataContext)

const navigate = useNavigate()
  
  useEffect(()=>{
    const existingUser = JSON.parse(localStorage.getItem("user"))
    setPresentUser(existingUser)
    console.log("presentUser",presentUser)
  },[])

  // User login function

  const handleLogin = async() => {
    try{

      const request = await signInWithPopup(auth,provider)
      localStorage.setItem('token',request.user.accessToken);
      localStorage.setItem('user',JSON.stringify(request.user));
      // const collectionRef = collection(db,'userDetails')
      // const uploadUserData = await addDoc(collectionRef,request.user)
      navigate('/')
      window.location.reload()

    }catch(err){
      console.log(err.message)
    }
  }

  const handleLogout = async() =>{
    try{
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/')
      window.location.reload()
    }catch(err){
      console.log(err.message)
    }
  }

  return (
    <header>
      <div className="header" id='header-id'>
        <div className="logo">

          <Link to='/'><img src="/FTWH.png" alt="ftwh logo" /></Link>

        </div>

        <div className="nav"> 

            <ul id='nav-id'>
                <Link to='/'><li>Home</li></Link>
                {presentUser && <li onClick={()=>handlePlaceToggle()} style={{ borderBottom: placeState && '1px solid rgb(255,255,255)'}} >Post Place</li>}
                {presentUser && <li onClick={()=>handleHotelToggle()} style={{ borderBottom: hotelState && '1px solid rgb(255,255,255)'}} >Post Hotel</li>}
                <li>About Us</li>
                <li id='login-icon-id' onClick={()=>{!presentUser ? handleLogin() : handleAccountToggle()}}>{presentUser ? <FaRegUserCircle size='1.3rem' style={{ borderBottom: accountShow && '1px solid rgb(255,255,255)'}} /> : "Login"}</li>
                {accountShow &&<ul id='account-show-laptop'>
                  <li onClick={()=>handleProfileToggle()}>Profile</li>
                  <li onClick={()=>handleLogout()}>Logout</li>
                </ul>}

            </ul>                        
        </div>

        <p id='menu-id' onClick={()=>handleNavToggle()}><IoMdMenu /></p>

        <div className="menu-nav" style={{transform:navState?'translateX(0%)' : 'translateX(100%)'}}>
          <ul id='nav-id'>
            <p id='nav-close-button-id' onClick={()=>{handleNavToggle()}}><IoMdClose /></p>
            <Link to='/' onClick={()=>handleNavToggle()}><li>Home</li></Link>
            {presentUser &&<li onClick={()=>{handlePlaceToggle();handleNavToggle()}}>Post Place</li>}
            {presentUser &&<li onClick={()=>{handlePlaceToggle();handleNavToggle()}}>Post Hotel</li>}
            <li>About Us</li>
            <li onClick={()=>{!presentUser ? handleLogin() : handleAccountToggle()}}>{presentUser ? 'My Account' : 'Login'}</li>
            {accountShow &&<ul id='account-show-mobile'>
              <li onClick={()=>{handleProfileToggle();handleNavToggle()}}>Profile</li>
              <li onClick={()=>handleLogout()}>Logout</li>
            </ul>}
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

        {
          profileState &&
          <Profile />
        }
      </div>
    </header>

  )
}


export default Header