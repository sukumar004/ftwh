import React, { useEffect, useState } from 'react'
import './home.css'
import { FaGreaterThan } from "react-icons/fa6";
import Card from '../card/Card';
import Header from '../header/Header';
import db from '../../firebaseConfig.js'
import {storage} from '../../firebaseConfig.js'
import { collection,doc,getDocs } from 'firebase/firestore';
import {ref,listAll,getDownloadURL} from 'firebase/storage'



const Home = () => {


    let state = [ "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand",
"Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
"Tripura","Uttarakhand","Uttar Pradesh","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Delhi",
"Lakshadweep","Puducherry"]





    const stateList = state.map((val,index)=>(<option key={index} value={`"${val}"`}>{val}</option>))
  return (

<div className="home-page">

   
    <div className='home-component'>
        

        <div className="heading-text">

            <h1>Here You Can Find Where You Go</h1>
            <p>Search deals on hotels,homes and much more...</p>

        </div>

        <div className="select">

            <select name="country" id="country">
                <option value="">select country</option>
                <option value="India">India</option>
                <option value="Thailand">Thailand</option>
                <option value="Sri Lanka">Sri Lanka</option>

            </select>
            <select name="state" id="state">
                <option value="">select state</option>
                {stateList}
            </select>
            <select name="district" id="district">
                <option value="">select district</option>
            </select>


        </div>

       

        <div className="high-rated-places">

            <button>SEARCH</button>

        </div>

        {/* <div className="add-new-post">

            <h3>Add new place</h3>
            <p><FaGreaterThan /></p>
            
        </div> */}

    </div>


    <div className="card-component">
        <Card />
    </div>
 

 </div>

    
  )
}

export default Home