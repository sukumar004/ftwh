import React, { useState } from 'react'
import './placeForm.css'
import { nanoid } from '@reduxjs/toolkit'
import {storage,db} from '../../firebaseConfig.js'
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage'
import { collection,addDoc } from 'firebase/firestore'
import {  useNavigate } from 'react-router-dom'

function PlaceForm() {


    const [formData,setFormData] = useState({
        title:'',description:'',location:'',country:'',state:'',district:''
    })
    const [imgName,setImgName] = useState()
    const [imgDbName,setImgDbName] = useState('')
    const [imgDbUrl,setImgDbUrl] = useState('')
    const [imgError,setImgError] = useState()
    const [dataError,setDataError] = useState()
    const [dataLoading,setDataLoading] = useState(false)
    const [dataConfirm,setDataConfirm] = useState()
    const [imgLoading,setImgLoading] = useState(false)
    const [imgConfirm,setImgConfirm] = useState()

    const navigate = useNavigate()

const handleChange = (e) =>{

    const name = e.target.name;

    setFormData(pre=>{
        return{
            ...pre,
            [name]:e.target.value
        }

    })
}


const handleUploadImg = async(e) =>{

    e.preventDefault();
    try{
        if(imgName==null) throw Error('Please select file')
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
        setImgDbName(uploadImage.ref.name)
        setImgConfirm('uploaded Successfully')

    }catch(err){
        setImgError(err.message)
    }finally{
        setImgLoading(false)
    }
}

const handleUploadData = async(e) =>{
    e.preventDefault()
    if(!formData) return console.log('Data must be filled')
    
    try{       
        setDataLoading(true)
       const collectionRef = collection(db,'placeDetails');
       const uploadData = await addDoc(collectionRef,formData);
       setDataConfirm('Place Uploaded successfully')
       
    }catch(err){
        setDataError(err.message)
    }finally{
        setFormData({
            title:'',description:'',location:'',country:'',state:'',district:''
        })
        setImgDbName('')
        setImgName(null)
        setImgDbUrl('')
        setDataLoading(false)
        navigate('/')
    }
}



// console.log(imgError)

  return (
    <div className="addPlace">
        <form >
            <input type="text" name='title' placeholder='place title' onChange={(e)=>handleChange(e)} value={formData.title} />

            <textarea name="description" id="" cols="30" rows="10" placeholder='place description' onChange={(e)=>handleChange(e)} value={formData.description}></textarea>
            
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
                <option value="namakkal">namakkal</option>
                <option value="trichy">trichy</option>
            </select>

            <input type="file" placeholder='upload img' onChange={(e)=>setImgName(e.target.files[0])} />

            <button onClick={(e)=>handleUploadImg(e)}>upload image</button>

            {<p>{imgLoading ? `Image uploading..` : imgError ? imgError : imgConfirm}</p> }

            <button role='submit' onClick={(e)=>handleUploadData(e)}>upload</button>

            {<p>{dataLoading ? `Data Updating..` : dataError ? dataError : dataConfirm}</p>}
        </form>
    </div>
  )
}

export default PlaceForm