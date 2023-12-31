import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import DataContext from '../context/DataContext'
import './profile.css'
import { IoMdClose } from "react-icons/io"; 
import { useSelector } from 'react-redux';
import { selectUserByUid } from '../../feature/userDetails/userSlice';
import { selectPlaceByUid } from '../../feature/place/placeSlice';
import ProfileCard from '../profile card/ProfileCard';
import { selectHotelByUid } from '../../feature/hotel details/hotelDetailsSlice'



function Profile() {
    const {presentUser,handleAccountToggle,handleProfileToggle,presentUserUid} = useContext(DataContext)


    const {id} = useParams()


    const user = useSelector((state)=>selectUserByUid(state,id))
    const userPlacePosts = useSelector((state)=>selectPlaceByUid(state,id))
    const userHotelPosts = useSelector((state)=>selectHotelByUid(state,id))

    console.log("user",user)
  

  return (
    <div className='profile-top-parent'>
    
    {/* <p id='close-icon' onClick={()=>{handleProfileToggle(); handleAccountToggle()}} ><IoMdClose /></p> */}
        <h2 id='profile-heading-id'>Personal Details</h2>

        <div className="profile">
                <div className="profile-child">

                    <img src={user?user.photoURL:null} alt={user?user.displayName:null} />
          
                    <div className="details">
                    
                        <table>
                            <tr>
                                <td>Name</td>
                                <td>{user ? user.name : 'Not Available'}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{user ? user.email : "Not Availabel"}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{user ? user.phoneNumber === null ? "Not Available" : user.phoneNumber : null}</td>
                            </tr>
                        </table>


                    </div>

                    {/* <button>Edit</button> */}


                </div>

        </div>


        <div className="profile-card-top-parent">

        
            <div className="profiel-card-place-parent">

                <h2 id='profile-heading-id'>Place Posts</h2>
                
                <ProfileCard posts = {userPlacePosts} type = {"place"}/>

            </div>
        <hr id='profile-hr-line' />

            <div className="profile-card-hotel-parent">

                <h2 id='profile-heading-id'>Hotel Posts</h2>

            
                <ProfileCard posts = {userHotelPosts} type = {"hotel"}/>
               
            </div>

        </div>

    </div>
  )
}

export default Profile