import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react'
import './hotelForm.css'
import { nanoid } from '@reduxjs/toolkit';
import {storage,db} from '../../firebaseConfig.js'
import {uploadBytes,ref,getDownloadURL} from 'firebase/storage'

function HotelForm() {

  const [formData,setFormData] = useState({
    name:'',location:'',country:'',state:'',district:'',roomRate:'',tel:'',adultRate:'',childRate:'',IsBeachView:true,
    IsFreeCarParking:true,IsFreeWater:true,IsHotWaterBenefit:true,IsFreeWifi:true,IsModernKitchen:true
  })

  const [imgName,setImgName] = useState()

  const [imgError,setImgError] = useState()
  const [dataError,setDataError] = useState()
  const [dataLoading,setDataLoading] = useState(false)
  const [dataConfirm,setDataConfirm] = useState()
  const [imgLoading,setImgLoading] = useState(false)
  const [imgConfirm,setImgConfirm] = useState()

  const handleChange = (e) => {
    const {name,checked,value,type} = e.target;

    setFormData(pre=>{
      return{
        ...pre,
        [name]: type==='checkbox' ? checked : value
      }
    })
  }


  const handleUploadImg = async(e) => {
    e.preventDefault()


      try{
      if(imgName==null) throw Error('Please choose file')
        setImgLoading(true)
        const id = nanoid();
        const imgRef = ref(storage,`hotelImages/${id}`)
        const uploadImg = await uploadBytes(imgRef,imgName)
        console.log(uploadImg)
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






  return (
    <div className="hotelForm">
      <form action="">

        <input type="text" placeholder='hotel name' name='name' value={formData.name} onChange={handleChange} />

        <input type="text" placeholder='hotel location' name='location' value={formData.location} onChange={handleChange}/>

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
          <option value="trichy">trichy</option>
        </select>

        <input type="text" placeholder='room rate' name='roomRate' value={formData.roomRate} onChange={handleChange} />

        <input type="number" placeholder='tel number' maxLength={10} name='tel' value={formData.tel} onChange={handleChange} />

        <input type="text" placeholder='adult rate' name='adultRate' value={formData.adultRate} onChange={handleChange}/>
        
        <input type="text" placeholder='children rate' name='childRate' value={formData.childRate}onChange={handleChange} />

        <div className="input-checkbox">
        <input type='checkbox' name='IsBeachView' id='beach view' checked={formData.IsBeachView} onChange={handleChange}/>
        <label htmlFor="beach view">Beach View</label>
        </div>

        <div className="input-checkbox">
        <input type='checkbox' name='IsFreeCarParking' id='free car parking' checked={formData.IsFreeCarParking} onChange={handleChange} />
        <label htmlFor="free car parking">Free Car Parking</label>
        </div>
        
        <div className="input-checkbox">
        <input type='checkbox' name='IsFreeWater' id='free water'  checked={formData.IsFreeWater} onChange={handleChange}/>
        <label htmlFor="free water">Free Water</label>
        </div>

        <div className="input-checkbox">
        <input type='checkbox' name='IsHotWaterBenefit' id='hot water benefit' checked={formData.IsHotWaterBenefit} onChange={handleChange} />
        <label htmlFor="hot water benefit">Hot Water Benifit</label>
        </div>

        <div className="input-checkbox">
        <input type='checkbox' name='IsFreeWifi' id='free wifi' checked={formData.IsFreeWifi} onChange={handleChange} />
        <label htmlFor="free wifi">Free Wifi</label>
        </div>

        <div className="input-checkbox">
        <input type='checkbox' name='IsModernKitchen' id='modern kitchen' checked={formData.IsModernKitchen} onChange={handleChange} />
        <label htmlFor="modern kitchen">Modern Kitchen</label>
        </div>

        <input type="file" onChange={(e)=>setImgName(e.target.files[0])} />

        <button onClick={(e)=>handleUploadImg(e)}>Upload image</button>

        <p>{imgLoading ? `Loading..` : imgError ? `${imgError}` : imgConfirm}</p>

        <button>Upload Data</button>

      </form>
    </div>
  )
}

export default HotelForm