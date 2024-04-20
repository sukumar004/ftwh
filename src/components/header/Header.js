import React, { useContext, useEffect, useState } from 'react'
import './header.css'
// import { Link, json } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import PlaceForm from '../add/PlaceForm';
import DataContext from '../context/DataContext';
import HotelForm from '../add/HotelForm';
import Profile from '../profile/Profile.js';
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io"; 
import {auth,provider} from '../../firebaseConfig.js'
import {signInWithPopup,signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig.js';
import {collection,addDoc} from 'firebase/firestore'
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../../feature/userDetails/userSlice.js';
import { BrowserRouter } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';






const Header = () => {

const {placeState,handlePlaceToggle,hotelState,handleHotelToggle,navState,handleNavToggle,presentUser,setPresentUser,accountShow,handleAccountToggle,presentUserUid,setPresentUserUid} = useContext(DataContext)

const allUsers = useSelector(selectAllUsers)


const navigate = useNavigate()
  
  useEffect(()=>{
    const existingUser = JSON.parse(localStorage.getItem("user"))
    setPresentUser(existingUser)
    const userUid = JSON.parse(localStorage.getItem('userUid'))
    setPresentUserUid(userUid)
  },[])

  // User login function


  const handleLogin = async() => {
    try{

      const request = await signInWithPopup(auth,provider)
      localStorage.setItem('token',request.user.accessToken);
      localStorage.setItem('user',JSON.stringify(request.user));
      localStorage.setItem('userUid',JSON.stringify(request.user.uid));

      const user = {name:request?request.user.displayName:'',email:request?request.user.email:'',phoneNumber:request?request.user.phoneNumber:'',uid:request?request.user.uid:'',accessToken:request?request.user.accessToken:'',photoURL:request?request.user.photoURL:'',imgId:''}
      const existingUid = allUsers.find(val=>(val.uid===user.uid))
      if(!existingUid){
      const collectionRef = collection(db,'userDetails')
      await addDoc(collectionRef,request?user:'').then((val)=>(console.log('database response',val)))
      }
      // navigate('/')
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
      localStorage.removeItem('userUid')
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
               
                <Link to='/#aboutUs'><li>About Us</li></Link>
              
                <li id='login-icon-id' onClick={()=>{!presentUser ? handleLogin() : handleAccountToggle()}}>{presentUser ? <FaRegUserCircle size='1.3rem' style={{ borderBottom: accountShow && '1px solid rgb(255,255,255)'}} /> : "Login"}</li>
                {accountShow &&<ul id='account-show-laptop'>
                  {presentUserUid && <Link to={`/profile/${presentUserUid}`} onClick={()=>handleAccountToggle()}><li>Profile</li></Link> }
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
            {presentUser &&<li onClick={()=>{handleHotelToggle();handleNavToggle()}}>Post Hotel</li>}
            <Link to='/#aboutUs' onClick={()=>{handleNavToggle()}}><li>About Us</li></Link>
            <li onClick={()=>{!presentUser ? handleLogin() : handleAccountToggle()}}>{presentUser ? 'My Account' : 'Login'}</li>
            {accountShow &&<ul id='account-show-mobile'>
            {presentUserUid && <Link to={`/profile/${presentUserUid}`} onClick={()=>{handleAccountToggle();handleNavToggle()}}><li>Profile</li></Link> }
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
      </div>
    </header>

  )
}


export default Header