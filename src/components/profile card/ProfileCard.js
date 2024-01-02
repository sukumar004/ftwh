import React from 'react'
import { useContext,useState } from 'react';
import DataContext from '../context/DataContext';
import './profileCard.css'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import {ref,deleteObject} from 'firebase/storage'
import { storage,db } from '../../firebaseConfig';
import {deleteDoc,doc} from 'firebase/firestore';
import { SlOptionsVertical } from "react-icons/sl";
import { BiSolidError } from "react-icons/bi";
import EditForm from '../add/EditForm';
import { FaIndianRupeeSign } from "react-icons/fa6";
import EditProfile from '../profile/EditProfile';






function ProfileCard({posts,type}) {


    const {setEditPostType,timeChange,handleEditPostToggle,editPostToggle,setEditPostId,scrollToTop} = useContext(DataContext)
    const [deleteLoading,setDeleteLoading] = useState(false)
    const [deleteError,setDeleteError] = useState(null)
    const [deleteConfirm,setDeleteConfirm] = useState(null)
    const [compressedPostToggle,setCompressedToggle] = useState(false)


   const [indexToggle,setIndexToggle] = useState(null)

   const compressedPost = posts.slice(0,(posts.length > 3) ? 3 : posts.length)





    // delete function

    const handleDeletePost = async(e,type,post) => {
        e.preventDefault();

        try{
            setDeleteLoading(true)
            const dataref = ref(storage,(type==='hotel')?(`hotelImages/${post.imgId}`):(`placeImages/${post.imgId}`))
            await deleteObject(dataref)
            const collectionRef = doc(db,((type==='hotel') ? `hotelDetails` : 'placeDetails'),((type==='hotel') ? post.id : post.id))
            await deleteDoc(collectionRef)
            setDeleteError(null)
            setDeleteConfirm('Deleted Successfully..')
            window.location.reload()
        }catch(err){
            setDeleteError(err.message)
        }finally{
            setDeleteLoading(false)
        }
    }


    const profileCardList = (compressedPostToggle ? posts : compressedPost).map((post,index)=>{

               
        return(
            
       

        <div className="profile-individual-card" key={index}>

            

            <Link to={type === 'place' ? `/place/${post.idSp}` : `/bookNow/${post.idSp}`}> 
            <div className="profile-card-image" onClick={()=>{scrollToTop()}}>
                <img src={post.imgURL} alt={post.title?post.title:post.name?post.name:'no title'} />
            </div>
            </Link>


            <div className="profile-card-details">

                <button id='profile-card-edit-icon' onClick={()=>setIndexToggle(index===indexToggle ? null : index)}><SlOptionsVertical /></button>

                {indexToggle===index &&  
                <ul id='profile-card-edit-delete-button'>
                <li onClick={()=>{setEditPostType(type);setEditPostId(post.id);handleEditPostToggle();setIndexToggle(null)}}>Edit Post</li>
                    <li onClick={(e)=>{handleDeletePost(e,type,post);setIndexToggle(null)}}>Delete Post</li>
                </ul>
                }
                <Link to={type === 'place' ? `/place/${post.idSp}` : `/bookNow/${post.idSp}`}> 
                <div className="link-profile-card" onClick={()=>{scrollToTop()}}>
                <p id='profile-card-location'><span>{<FaLocationDot />}</span>{`${post.location.length>13?`${post.location.slice(0,13)}...`:post.location}, ${post.district}`}</p>
                <h1>{post.title?(post.title.length>20 ? `${post.title.slice(0,20)}...`:post.title):post.name?(post.name.length>20 ? `${post.name.slice(0,20)}...`:post.name):'no title'}</h1>
                <p id='post-card-descrition'>{post.description?post.description.length>30 ? `${post.description.slice(0,30)}...`:post.description:post.roomRate?<h2><span><FaIndianRupeeSign /></span>{post.roomRate}</h2>:'no description'}</p>
                <p id='post-card-time'>{post.date?`${timeChange(post.date)} ago`:'no date'}</p>
                </div>
                </Link>
            </div>
            
        </div>

        )
        
    })

  return (
    <>
    <div className="profile-card-head-parent">

        { deleteLoading && <p style={{width:'100%',height:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>{deleteLoading ? `Delete post..` : deleteError ? `${deleteError}` : deleteConfirm}</p>}

        <>
        {(posts.length && !deleteLoading) ?
        
        <>

        {profileCardList}
       
        </>

        :
        
        <div className="profile-card-error-div">
        <p><span><BiSolidError /></span>There is no {(type==='hotel')?`Hotel Posts` : `Tourists Place Posts`} here.. </p>
        </div>

        }
        </>

    
        <>
        {editPostToggle && 
        <div id="edit-post-list-parent">
        <EditForm />
        </div>
        }
        
        </>
    </div> 

     {(!compressedPostToggle && posts.length>3) &&
        <div className="profile-toggle-button">
        <button id='profile-post-toggle-button' onClick={()=>setCompressedToggle(pre=>(pre=!pre))}>Show all Posts</button>
        </div>
    } 
    </>
  )
}

export default ProfileCard