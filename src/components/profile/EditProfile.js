import React from 'react'
import { useContext,useState } from 'react'
import DataContext from '../context/DataContext'
import { useSelector } from 'react-redux'
import { selectUserByUid } from '../../feature/userDetails/userSlice'
import { db,storage } from '../../firebaseConfig'
import { nanoid } from '@reduxjs/toolkit'
import {updateDoc,doc} from 'firebase/firestore'
import {uploadBytes,ref,getDownloadURL,deleteObject} from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import './editProfile.css'
import { IoMdClose } from "react-icons/io"; 





function EditProfile() {

    const {presentUserUid,handleEditProfileToggle} =  useContext(DataContext)
    const navigate = useNavigate()

    const user = useSelector((state)=>(selectUserByUid(state,presentUserUid ? presentUserUid : null)))

    const [userData,SetUserData] = useState({
        accessToken:user?user.accessToken:'',email:user?user.email:'',id:user?user.id:'',name:user?user.name:'',phoneNumber:user?user.phoneNumber:'',photoURL:user?user.photoURL:'',uid:user?user.uid:''
    })

    // const dataVerify = Boolean(userData.email.length>0 && userData?.name?.length>0 && userData?.phoneNumber?.length===10)

    const [imgName,setImgName] = useState(null)
    const [imgLoading,setImgLoading] = useState(false)
    const [imgError,setImgError] = useState(null)
    const [imgConfirm,setImgConfirm] = useState(null)
    const [dataLoading,setDataLoading] = useState(false)
    const [dataError,setDataError] = useState(null)
    const [dataConfirm,setDataConfirm] = useState(null)

    const handleUploadImage = async(e) => {
        e.preventDefault();
        if(userData.imgId && userData.imgId.length){
            const dataref = ref(storage,`profileImages/${userData.imgId}`)
             await deleteObject(dataref)
        }

        try{
            if(imgName==null) throw Error('Please select file')
            if(imgName.type !== 'image/jpeg') throw Error('Image file should be jpeg,jpg format only')
            setImgLoading(true)
            const id = nanoid();
            const imageRef = ref(storage,`profileImages/${id}`)
            const uploadImage = await uploadBytes(imageRef,imgName)

            getDownloadURL(uploadImage.ref).then(val=>{
                SetUserData(pre=>{
                    return{
                        ...pre,
                        imgId:uploadImage.ref.name,
                        photoURL:val
                    }
                })
            })

            setImgConfirm('Image uploaded Successfully')
            setImgError(null)
            setImgName(null)
        }catch(err){
            setImgError(err.message)
        }finally{
        setImgLoading(false)
        }
    }

    const handleUploadData = async(e) => {
        e.preventDefault()

        //delete storage function while data not uploaded..

    const deleteStorage = async() => {
        const dataRef = ref(storage,`profileImages/${userData.imgId}`)
        await deleteObject(dataRef)
        setImgName(null)
        SetUserData(pre=>{return{...pre,photoURL:'',imgId:''}})
    }

    try{
    
        setDataLoading(true)
        if(userData.name.length<1) throw Error('Please enter your name')
        if(userData.phoneNumber && userData.phoneNumber.length<10) throw Error('Please enter your mobile number')
        const collectionRef = doc(db,'userDetails',userData.id)
        const updateData = await updateDoc(collectionRef,userData)
        setImgConfirm(null)
        setDataConfirm('Data Updated Successfully')
        setDataError(null)
        navigate(`/profile/${presentUserUid}`)
        window.location.reload()


    }catch(err){
    setDataError(err.message)
    // if(err.message){
    //     deleteStorage()
    //    }

    }finally{
    setDataLoading(false)
    }
    }
    

  return (
    <div className="edit-profile-top-parent">
    {/* <p id='close-icon'><IoMdClose /></p> */}


        <div className="edit-profile-parent">
    <p onClick={()=>handleEditProfileToggle()} style={{position:'absolute',right:'2rem',fontSize:'1.3rem',cursor:'pointer'}}><IoMdClose /></p>


        <h1>Edit Your Profile Details here</h1>

            <div className="edit-profile-sub-parent">
            <label htmlFor="name">Name</label>
            <input type="text" value={userData.name} id='name' onChange={(e)=>(SetUserData(pre=>{return {...pre,name:e.target.value}}))} />
            </div>

            <div className="edit-profile-sub-parent">
            <label htmlFor="email">Email</label>
            <input type="email" disabled  value={userData.email} id='email'/>
            <p>You can't change email. If you want to change your email please login with other one..</p>
            </div>

            <div className="edit-profile-sub-parent">
            <label htmlFor="phoneNumber">Mobile Number</label>
            <input type="text"  maxLength={10} value={userData.phoneNumber} id='phoneNumber' onChange={(e)=>(SetUserData(pre=>{return {...pre,phoneNumber:e.target.value}}))} />
            </div>


            <div className="edit-profile-sub-parent">
            <label htmlFor="profile-img">Profile Image</label>
            <input type="file" id='profile-img' onChange={(e)=>(setImgName(e.target.files[0]))} />
            <img src={userData.photoURL} alt={userData.name} style={{width:'2rem',height:'2rem'}} />
            </div>

            <div className="edit-profile-buttons">
            <button disabled={!imgName} onClick={(e)=>handleUploadImage(e)}>Upload Image</button>
            <button  onClick={(e)=>handleUploadData(e)}>confirm Changes</button>
            </div>

            {<p id='edit-profile-error-confirm-loading-id' style={{fontSize:'.6rem',margin:'1rem 0 0 0'}} >{imgLoading ? `Image uploading..` : dataLoading ? `Data uploading` : imgError ? imgError : dataError ? dataError : imgConfirm ? imgConfirm : dataConfirm}</p> }

        </div>

    </div>
  )
}

export default EditProfile