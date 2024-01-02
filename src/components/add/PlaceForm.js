import React, { useState,useContext } from 'react'
import './placeForm.css'
import { nanoid } from '@reduxjs/toolkit'
import {storage,db} from '../../firebaseConfig.js'
import { ref,uploadBytes,getDownloadURL,deleteObject } from 'firebase/storage'
import { collection,addDoc } from 'firebase/firestore'
import {  useNavigate } from 'react-router-dom'
import { IoMdClose } from "react-icons/io"; 
import DataContext from '../context/DataContext.js'

function PlaceForm() {

const {handlePlaceToggle,districtList,presentUserUid,presentUser} = useContext(DataContext)


    const [formData,setFormData] = useState({
        title:'',description:'',location:'',country:'',state:'',district:'',idSp:'',imgId:'',imgURL:'',date:new Date().toISOString(),uid:presentUserUid?presentUserUid:''

    })
    const [imgName,setImgName] = useState()
    const [imgError,setImgError] = useState()
    const [dataError,setDataError] = useState()
    const [dataLoading,setDataLoading] = useState(false)
    const [dataConfirm,setDataConfirm] = useState()
    const [imgLoading,setImgLoading] = useState(false)
    const [imgConfirm,setImgConfirm] = useState()

    const navigate = useNavigate()


    const dataVerify = Boolean(formData.title.length>0 && formData.description.length>0 && formData.location.length>0 && formData.country.length>0
    && formData.state.length>0 && formData.district.length>0 && formData.idSp.length>0 && formData.imgId.length>0 && formData.imgId.length>0)

// onChange function for form input

const handleChange = (e) =>{

    const name = e.target.name;

    setFormData(pre=>{
        return{
            ...pre,
            [name]:e.target.value
        }

    })
}

// this upload function for image upload in database

const handleUploadImg = async(e) =>{

    e.preventDefault();
    try{
        if(imgName==null) throw Error('Please select file')
        if(imgName.type !== 'image/jpeg') throw Error('Image file should be jpeg,jpg format only')
        setImgLoading(true)
        const id = nanoid();
        const imageRef = ref(storage,`placeImages/${id}`)
        const uploadImage = await uploadBytes(imageRef,imgName)
        getDownloadURL(uploadImage.ref).then(val=>{
            setFormData(pre=>{
                return{
                    ...pre,
                    idSp:nanoid(),
                    imgId:uploadImage.ref.name,
                    imgURL:val
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

// this onSubmit function for data upload to firebase

const handleUploadData = async(e) =>{
  
    e.preventDefault()

    //delete storage function while data not uploaded..

    const deleteStorage = async() => {
        const dataRef = ref(storage,`placeImages/${formData.imgId}`)
        await deleteObject(dataRef)
        setImgName(null)
        setFormData(pre=>{return{...pre,imgURL:'',imgId:''}})
    }


    try{ 
        setDataLoading(true)
       const collectionRef = collection(db,'placeDetails');
       const uploadData = await addDoc(collectionRef,formData);
       setImgConfirm(null)
       setDataConfirm('Place Uploaded successfully')
       setDataError(null)
       handlePlaceToggle()
    //    navigate('/')
       window.location.reload()
       
    }catch(err){
        setDataError(err.message)
       if(err.message){
        deleteStorage()
       }
    }finally{
        setFormData({
            title:'',description:'',location:'',country:'',state:'',district:'',idSp:'',imgId:'',imgURL:'',uid:'',date:''
        })
        setDataLoading(false)
        // navigate('/')
    }
}



  return (
    <div className="addPlace-top-parent">
    <p id='close-icon' onClick={()=>handlePlaceToggle()}><IoMdClose /></p>
    <div className="addPlace">
        <h1>Post Your favourite Tourist place here</h1>
        <p id='note-tag'>Note : Entered Details must be correct</p>
        <form >
            <input type="text" name='title' placeholder='place title' onChange={(e)=>handleChange(e)} value={formData.title} />

            <textarea name="description"  cols="30" rows="10" placeholder='place description' onChange={(e)=>handleChange(e)} value={formData.description}></textarea>
            
            <input type="text" name='location' placeholder='location' onChange={(e)=>handleChange(e)} value={formData.location} />
          
         
            <select name="country" id="country" onChange={(e)=>handleChange(e)} value={formData.country}>
                <option value="">select country</option>
                <option value="india">india</option>
            </select>

            <select name="state" id="state" onChange={(e)=>handleChange(e)} value={formData.state}>
                <option value="">select state</option>
                <option value="tamilnadu">tamilnadu</option>
            </select>

            <select name="district" id="district" onChange={(e)=>handleChange(e)} value={formData.district}>
                <option value="">select district</option>
               {(formData.state === 'tamilnadu') &&  districtList }
            </select>

            <input type="file" id='file-input' placeholder='upload img' onChange={(e)=>setImgName(e.target.files[0])} />

            {/* {<p>{imgLoading ? `Image uploading..` : imgError ? imgError : imgConfirm}</p> } */}


            <button disabled={!imgName} onClick={(e)=>handleUploadImg(e)}>upload image</button>


            <button disabled={!dataVerify} onClick={(e)=>handleUploadData(e)}>upload</button>

            {<p style={{fontSize:'.5rem',textTransform:'capitalize',margin:'1rem 0 0 0'}}>{imgLoading ? `Image uploading..` : dataLoading ? `Data uploading` : imgError ? imgError : dataError ? dataError : imgConfirm ? imgConfirm : dataConfirm}</p>}
        </form>
    </div>
    </div>
  )
}


export default PlaceForm