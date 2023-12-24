
import React, { useState,useContext } from 'react'
import './hotelForm.css'
import { nanoid } from '@reduxjs/toolkit';
import {storage,db} from '../../firebaseConfig.js'
import {uploadBytes,ref,getDownloadURL} from 'firebase/storage'
import {collection,addDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext.js';
import { IoMdClose } from "react-icons/io";


function HotelForm() {

  const {handleHotelToggle,districtList} = useContext(DataContext)

  const [formData,setFormData] = useState({
    name:'',location:'',country:'',state:'',district:'',roomRate:'',tel:'',adultRate:'',childRate:'',IsBeachView:true,
    IsFreeCarParking:true,IsFreeWater:true,IsHotWaterBenefit:true,IsFreeWifi:true,IsModernKitchen:true,idSp:'',imgId:'',imgURL:''
  })

  const [imgName,setImgName] = useState()

  const [imgError,setImgError] = useState()
  const [dataError,setDataError] = useState()
  const [dataLoading,setDataLoading] = useState(false)
  const [dataConfirm,setDataConfirm] = useState()
  const [imgLoading,setImgLoading] = useState(false)
  const [imgConfirm,setImgConfirm] = useState()
  const navigate = useNavigate()

  const dataVerify = Boolean(formData.name.length>0 && formData.location.length>0 && formData.state.length>0 && formData.district.length>0 && formData.roomRate.length>0
    && formData.tel.length===10 && formData.adultRate.length>0 && formData.childRate.length>0 && formData.idSp.length>0 && formData.imgId.length>0
    && formData.imgURL.length>0)

  // Handle change function for input form 

  const handleChange = (e) => {
    const {name,checked,value,type} = e.target;

    setFormData(pre=>{
      return{
        ...pre,
        [name]: type==='checkbox' ? checked : value
      }
    })
  }




  // Upload function for image upload

  const handleUploadImg = async(e) => {
    e.preventDefault()

      try{
      if(imgName==null) throw Error('Please choose file')
      if(imgName.type !== 'image/jpeg') throw Error('Image file should be jpeg,jpg format only')
        setImgLoading(true)
        const id = nanoid();
        const imgRef = ref(storage,`hotelImages/${id}`)
        const uploadImg = await uploadBytes(imgRef,imgName)
        getDownloadURL(uploadImg.ref).then(val=>{
          setFormData(pre=>{
            return{
              ...pre,
              idSp:nanoid(),
              imgId:uploadImg.ref.name,
              imgURL:val
            }
          })
        })

        setImgConfirm('Image Uploaded Successfull')
        setImgError(null)


      }catch(Error){
        setImgError(Error.message)
      } finally{
        setImgLoading(false)
      }
  }

  // Upload function for data upload

  
  const handleUploadData = async(e) => {
    e.preventDefault()

    try{
      setDataLoading(true)
      const collectionRef = collection(db,'hotelDetails')
      const updateData = addDoc(collectionRef,formData)
      setDataConfirm('Data Updated Successfully')
      setDataError(null)
      // handleHotelToggle()
      // navigate('/')
      window.location.reload()
    }catch(err){
      setDataError(err.message)

    }finally{
      setDataLoading(false)
      setImgName()
      setFormData({
        name:'',location:'',country:'',state:'',district:'',roomRate:'',tel:'',adultRate:'',childRate:'',IsBeachView:true,
        IsFreeCarParking:true,IsFreeWater:true,IsHotWaterBenefit:true,IsFreeWifi:true,IsModernKitchen:true,idSp:'',imgId:'',imgURL:''
      })
      // navigate('/')

    }

  }






  return (
    <div className="add-hotel-top-parent">
    <p id='close-icon' onClick={()=>handleHotelToggle()}><IoMdClose /></p>
    <div className="addHotel">
      <h1>Post Your hotel here</h1>
      <p id='note-tag'>Note : Entered Details must be correct</p>


      <form action="">

        <input type="text" id='text-input' placeholder='hotel name' name='name' value={formData.name} onChange={handleChange} />

        <input type="text" id='text-input'  placeholder='hotel location' name='location' value={formData.location} onChange={handleChange}/>

        <select name="country" id="country" value={formData.country} onChange={handleChange} >
          <option value="">select country</option>
          <option value="india">india</option>
        </select>

        <select name="state" id="state" value={formData.state} onChange={handleChange}>
          <option value="">select state</option>
          <option value="tamilnadu">tamilnadu</option>
        </select>

        <select name="district" id="district" value={formData.district} onChange={handleChange}>
          <option value="">select district</option>
          {districtList}
        </select>

        <input type="text" id='text-input'  placeholder='room rate' name='roomRate' value={formData.roomRate} onChange={handleChange} />

        <input type="text" id='text-input'  placeholder='tel number' maxLength={10} name='tel' value={formData.tel} onChange={handleChange} />

        <input type="text" id='text-input'  placeholder='adult rate' name='adultRate' value={formData.adultRate} onChange={handleChange}/>
        
        <input type="text" id='text-input'  placeholder='children rate' name='childRate' value={formData.childRate}onChange={handleChange} />
        
        <div className="input-checkbox-parent">

          <div className="input-checkbox" >
          <input type='checkbox' name='IsBeachView' id='beach view' checked={formData.IsBeachView} onChange={handleChange}/>
          <label htmlFor="beach view">Beach View</label>
          </div>

          <div className="input-checkbox" >
          <input type='checkbox' name='IsFreeCarParking' id='free car parking' checked={formData.IsFreeCarParking} onChange={handleChange} />
          <label htmlFor="free car parking">Free Car Parking</label>
          </div>
          
          <div className="input-checkbox" >
          <input type='checkbox' name='IsFreeWater' id='free water'  checked={formData.IsFreeWater} onChange={handleChange}/>
          <label htmlFor="free water">Free Water</label>
          </div>

          <div className="input-checkbox" >
          <input type='checkbox' name='IsHotWaterBenefit' id='hot water benefit' checked={formData.IsHotWaterBenefit} onChange={handleChange} />
          <label htmlFor="hot water benefit">Hot Water Benifit</label>
          </div>

          <div className="input-checkbox" >
          <input type='checkbox' name='IsFreeWifi' id='free wifi' checked={formData.IsFreeWifi} onChange={handleChange} />
          <label htmlFor="free wifi">Free Wifi</label>
          </div>

          <div className="input-checkbox" >
          <input type='checkbox' name='IsModernKitchen' id='modern kitchen' checked={formData.IsModernKitchen} onChange={handleChange} />
          <label htmlFor="modern kitchen">Modern Kitchen</label>

          </div>
        </div>

        <input type="file" id='file-input' onChange={(e)=>setImgName(e.target.files[0])} />

        <p>{imgLoading ? `Image uploading..` : imgError ? `${imgError}` : imgConfirm}</p>

        <button onClick={(e)=>handleUploadImg(e)}>Upload image</button>

        <button disabled={!dataVerify} onClick={(e)=>handleUploadData(e)}>Upload Data</button>

        {<p>{dataLoading ? `Data Updating..` : dataError ? dataError : dataConfirm}</p>}


      </form>
    </div>
  </div>
  )
}

export default HotelForm