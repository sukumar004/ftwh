import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import './commentPage.css'
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import { db } from '../../firebaseConfig';
import {collection,addDoc} from 'firebase/firestore'
import { selectUserByUid } from '../../feature/userDetails/userSlice';
import { useSelector } from 'react-redux';

const CommentPage = ({postIdSp}) => {

  const {presentUser,presentUserUid} = useContext(DataContext)
  const user = useSelector((state)=>selectUserByUid(state,presentUserUid))

  const [commentDataError,setCommentDataError] = useState(null)

  const start = Array(5).fill(0)

  const [currentValue,setCurrentValue] = useState(3)

  const handleClick = value => {
    
    if(currentValue === value){
      return setCurrentValue(0)
    }else{
      return setCurrentValue(value)
    }
  }


  const starColor = {
    active:'#FFBA5A',
    inActive:'#a9a9a9'
  }


  const [formData,setFormData] = useState({
    topic:'',rating:5,comments:'',postIdSp:postIdSp,date:new Date().toISOString(),name:user?user.name:'',
    email:user?user.email:'',photoURL:user?user.photoURL:'',uid:presentUserUid?presentUserUid:''
  })

  const dataVerify = Boolean(formData.topic.length > 0 && formData.comments.length > 0)



  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      if(!presentUserUid) throw Error ('Please Login in')
      if(!dataVerify) throw Error('Please fill the fields')
      const collectionRef = collection(db,'commentDetails')
      const request = await addDoc(collectionRef,formData)
      setCommentDataError(null)
      window.location.reload()

    }catch(err){
      setCommentDataError(err.message)
    }finally{
      setFormData({
        email:'',topic:'',rating:'',comments:'',postIdSp:'',date:'',photoURL:'',name:''
      })
    }
  }

  
  return (
    <div className="comment-parent-top">
      <div className="comment-parent">
          <h1>Feedback About this place</h1>
      
              <div className="star-rating">
                  {start.map((start,index)=>{
                    return(
                    <FaStar key={index} 
                    color={(currentValue > index ? starColor.active : starColor.inActive)}
                    style={{cursor:'pointer',margin:'0 .2rem'}}
                    onClick={()=>{handleClick(index+1);setFormData(pre=>{return{...pre,rating:index+1}})}}   
                    
                    />
                    ) 
                  })}
              </div>

              <div className="review-form">

                <label htmlFor="review-topic">select category</label>
                <select name="review-topic" id="review-topic" value={formData.topic} onChange={(e)=>setFormData(pre=>{return{...pre,topic:e.target.value}})}>
                    <option value="">select related topics</option>
                    <option value="Nice Place">Nice Place</option>
                    <option value="Beautiful place for Family Trip">Beautiful place for Family Trip</option>
                    <option value="Fully Enjoyable">Fully Enjoyable</option>
                    <option value="Boring">Boring</option>
                    <option value="Worst Place">Worst Place</option>
                </select>
                <label htmlFor="review">write review</label>
                <textarea  name="review" id="review" cols="30" rows="10" value={formData.comments} onChange={(e)=>setFormData(pre=>{return{...pre,comments:e.target.value}})} placeholder='comment your experience..'></textarea>
                {commentDataError && <p>{commentDataError}</p>}

                <button onClick={(e)=>handleSubmit(e)}>Submit</button>

              </div>      

      </div>
    </div>
  )
}

export default CommentPage