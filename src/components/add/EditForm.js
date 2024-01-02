import React from 'react'
import { useState,useContext } from 'react'
import './editForm.css'
import { useSelector } from 'react-redux'
import { selectPlaceById } from '../../feature/place/placeSlice'
import { selectHotelById } from '../../feature/hotel details/hotelDetailsSlice'
import DataContext from '../context/DataContext'
import {uploadBytes,ref,getDownloadURL,deleteObject} from 'firebase/storage'
import {updateDoc,doc} from 'firebase/firestore'
import { storage,db } from '../../firebaseConfig'
import { nanoid } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";


function EditForm() {

  const {editPostType,presentUserUid,handleEditPostToggle,editPostId,districtList} = useContext(DataContext)
  const id = editPostId
  const navigate = useNavigate()
  const type = editPostType

  const selectedPlacePost = useSelector((state)=>selectPlaceById(state,id))
  const selectedHotelPost = useSelector((state)=>selectHotelById(state,id))

  const [placeImgData,setPlaceImgData] = useState(null)
  const [hotelImgData,setHotelImgData] = useState(null)
  const [imgConfirm,setImgConfirm] = useState(null)
  const [imgLoading,setImgLoading] = useState(false)
  const [imgError,setImgError] = useState(null)
  const [dataConfirm,setDataConfirm] = useState(null)
  const [dataLoading,setDataLoading] = useState(false)
  const [dataError,setDataError] = useState(null)


  const [hotelData,setHotelData] = useState({
    name:selectedHotelPost ? selectedHotelPost.name : '',location:selectedHotelPost ? selectedHotelPost.location : '',id:selectedHotelPost ? selectedHotelPost.id : '',country:selectedHotelPost ? selectedHotelPost.country : '',state:selectedHotelPost ? selectedHotelPost.state : '',district:selectedHotelPost ? selectedHotelPost.district : '',roomRate:selectedHotelPost ? selectedHotelPost.roomRate : '',tel:selectedHotelPost ? selectedHotelPost.tel : '',adultRate:selectedHotelPost ? selectedHotelPost.adultRate : '',childRate:selectedHotelPost ? selectedHotelPost.childRate : '',IsBeachView:selectedHotelPost ? selectedHotelPost.IsBeachView : '',
    IsFreeCarParking:selectedHotelPost ? selectedHotelPost.IsFreeCarParking : '',IsFreeWater:selectedHotelPost ? selectedHotelPost.IsFreeWater : '',IsHotWaterBenefit:selectedHotelPost ? selectedHotelPost.IsHotWaterBenefit : '',IsFreeWifi:selectedHotelPost ? selectedHotelPost.IsFreeWifi : '',IsModernKitchen:selectedHotelPost ? selectedHotelPost.IsModernKitchen : '',idSp:selectedHotelPost ? selectedHotelPost.idSp : '',imgId:selectedHotelPost ? selectedHotelPost.imgId : '',imgURL:selectedHotelPost ? selectedHotelPost.imgURL : '',date:selectedHotelPost ? selectedHotelPost.date : '',uid:selectedHotelPost ? selectedHotelPost.uid : ''
  })

  const [placeData,setPlaceData] = useState({
    title:selectedPlacePost ? selectedPlacePost.title:'',description:selectedPlacePost ? selectedPlacePost.description:'',location:selectedPlacePost ? selectedPlacePost.location:'',country:selectedPlacePost ? selectedPlacePost.country:'',state:selectedPlacePost ? selectedPlacePost.state:'',district:selectedPlacePost ? selectedPlacePost.district:'',idSp:selectedPlacePost ? selectedPlacePost.idSp:'',imgId:selectedPlacePost ? selectedPlacePost.imgId:'',imgURL:selectedPlacePost ? selectedPlacePost.imgURL:'',date:selectedPlacePost ? selectedPlacePost.date:'',uid:selectedPlacePost ? selectedPlacePost.uid:'',id:selectedPlacePost ? selectedPlacePost.id:''
})


const dataVerify = (type === 'hotel') ? Boolean((hotelData && hotelData.name.length>0) && (hotelData && hotelData.location.length>0) && (hotelData && hotelData.state.length>0) && (hotelData && hotelData.district.length>0) && (hotelData && hotelData.roomRate.length>0)
  && (hotelData && hotelData.tel.length===10) && (hotelData && hotelData.adultRate.length>0) && (hotelData && hotelData.childRate.length>0) && (hotelData && hotelData.idSp.length>0) && (hotelData && hotelData.imgId.length>0) && (hotelData && hotelData.imgURL.length>0)) :  Boolean((placeData && placeData.title.length>0) && (placeData && placeData.description.length>0) && (placeData && placeData.location.length>0) && (placeData && placeData.country.length>0) && (placeData && placeData.state.length>0) && (placeData && placeData.district.length>0) && (placeData && placeData.idSp.length>0) && (placeData && placeData.imgId.length>0) && (placeData && placeData.imgId.length>0))



//onchange function

  const handleChange= (e,stateType) => {
    const {name,checked,value,type} = e.target;

    stateType(pre=>{
      return{
        ...pre,
        [name]: type==='checkbox' ? checked : value
      }
    })
  }

// handle upload image function

const handleUploadImg = async(e,type) => {

  e.preventDefault()

  const deleteImageFunction = async () => {
    const dataref = ref(storage,(type==='hotel')?(`hotelImages/${hotelData.imgId}`):(`placeImages/${placeData.imgId}`))
    await deleteObject(dataref)

  }

    try{
    if(((type==='hotel') ? hotelImgData : placeImgData) ===null) throw Error('Please choose file')
    if(((type==='hotel') ? hotelImgData : placeImgData).type !== 'image/jpeg') throw Error('Image file should be jpeg,jpg format only')
      setImgLoading(true)
    
      //delete existing image

      {(type==='hotel' ? hotelData.imgId : placeData.imgId).length>0 && deleteImageFunction() }
      
      //add new image
      const id = nanoid();
      const imgRef = ref(storage,(type==='hotel') ? (`hotelImages/${id}`) : (`placeImages/${id}`))
      const uploadImg = await uploadBytes(imgRef,(type==='hotel') ? hotelImgData : placeImgData )  
      await getDownloadURL(uploadImg.ref).then(val=>{
        ((type==='hotel') ? setHotelData : setPlaceData)(pre=>{
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
      if(type==='hotel'){
        setHotelImgData(null)
      } else{
        setPlaceImgData(null)
      }


    }catch(Error){
      setImgError(Error.message)
    } finally{
      setImgLoading(false)
    }
}


const handleUploadEditedData = async(e,type) => {
  e.preventDefault();

  try{
    setDataLoading(true)
    const collectionRef = doc(db,((type==='hotel') ? `hotelDetails` : 'placeDetails'),((type==='hotel') ? hotelData.id : placeData.id))
    const updateData = await updateDoc(collectionRef,((type==='hotel')? hotelData : placeData))
    setDataConfirm('Data Updated Successfully')
    setDataError(null)
    navigate(`/profile/${presentUserUid}`)
    window.location.reload()

  }catch(err){
    setDataError(err.message)

  }finally{
    setDataLoading(false)
  }
}



  
  return (
   <div className="edit-form-top-parent" id='edit-top-bg-color'>

  {/* <p id='close-icon' style={{color:'black'}} onClick={()=>handleEditPostToggle()}><IoMdClose /></p> */}


    {type === 'hotel' && 

    <div className="edit-form-parent">

      <p id='edit-form-close-icon' style={{color:"black",right:'1.5rem',fontSize:'1.3rem',cursor:'pointer'}} onClick={()=>handleEditPostToggle()}><IoMdClose /></p>


        <h1>Edit Your favourite Hotel place here</h1>
        <p id='note-tag'>Note : Entered Details must be correct</p>

    <form id='edit-form-id'>


        <input type="text" id='text-input' placeholder='hotel name' name='name' value={hotelData.name} onChange={(e)=>handleChange(e,setHotelData)} />

        <input type="text" id='text-input'  placeholder='hotel location' name='location' value={hotelData.location} onChange={(e)=>handleChange(e,setHotelData)}/>

        <select name="country" id="country" value={hotelData.country} onChange={(e)=>handleChange(e,setHotelData)} >
          <option value="">select country</option>
          <option value="india">india</option>
        </select>

        <select name="state" id="state" value={hotelData.state} onChange={(e)=>handleChange(e,setHotelData)}>
          <option value="">select state</option>
          <option value="tamilnadu">tamilnadu</option>
        </select>

        <select name="district" id="district" value={hotelData.district} onChange={(e)=>handleChange(e,setHotelData)}>
          <option value="">select district</option>
          {(hotelData.state === 'tamilnadu') &&  districtList }

        </select>

        <input type="text" id='text-input'  placeholder='room rate' name='roomRate' value={hotelData.roomRate} onChange={(e)=>handleChange(e,setHotelData)} />

        <input type="text" id='text-input'  placeholder='tel number' maxLength={10} name='tel' value={hotelData.tel} onChange={(e)=>handleChange(e,setHotelData)} />

        <input type="text" id='text-input'  placeholder='adult rate' name='adultRate' value={hotelData.adultRate} onChange={(e)=>handleChange(e,setHotelData)}/>
        
        <input type="text" id='text-input'  placeholder='children rate' name='childRate' value={hotelData.childRate}onChange={(e)=>handleChange(e,setHotelData)} />
        
        <div className="hotel-facilities-amenities-parent">

          <div className="hotel-facilities-amenities" id='hotel-facilities-amenities-id'>
          <input type='checkbox' name='IsBeachView' id='beach view' checked={hotelData.IsBeachView} onChange={(e)=>handleChange(e,setHotelData)}/>
          <label htmlFor="beach view">Beach View</label>
          </div>

          <div className="hotel-facilities-amenities" id='hotel-facilities-amenities-id'>
          <input type='checkbox' name='IsFreeCarParking' id='free car parking' checked={hotelData.IsFreeCarParking} onChange={(e)=>handleChange(e,setHotelData)} />
          <label htmlFor="free car parking">Free Car Parking</label>
          </div>
          
          <div className="hotel-facilities-amenities" id='hotel-facilities-amenities-id' >
          <input type='checkbox' name='IsFreeWater' id='free water'  checked={hotelData.IsFreeWater} onChange={(e)=>handleChange(e,setHotelData)}/>
          <label htmlFor="free water">Free Water</label>
          </div>

          <div className="hotel-facilities-amenities" id='hotel-facilities-amenities-id' >
          <input type='checkbox' name='IsHotWaterBenefit' id='hot water benefit' checked={hotelData.IsHotWaterBenefit} onChange={(e)=>handleChange(e,setHotelData)} />
          <label htmlFor="hot water benefit">Hot Water Benifit</label>
          </div>

          <div className="hotel-facilities-amenities" id='hotel-facilities-amenities-id' >
          <input type='checkbox' name='IsFreeWifi' id='free wifi' checked={hotelData.IsFreeWifi} onChange={(e)=>handleChange(e,setHotelData)} />
          <label htmlFor="free wifi">Free Wifi</label>
          </div>

          <div className="hotel-facilities-amenities" id='hotel-facilities-amenities-id' >
          <input type='checkbox' name='IsModernKitchen' id='modern kitchen' checked={hotelData.IsModernKitchen} onChange={(e)=>handleChange(e,setHotelData)} />
          <label htmlFor="modern kitchen">Modern Kitchen</label>
          </div>

        </div>

        <img src={hotelData.imgURL} alt={hotelData.title} style={{width:'4rem',height:'4rem'}} />

        <input type="file" id='file-input' onChange={(e)=>setHotelImgData(e.target.files[0])} />

        <p>{imgLoading ? `Image uploading..` : imgError ? `${imgError}` : imgConfirm}</p>

        <button disabled={!hotelImgData} onClick={async(e)=>handleUploadImg(e,type)} >Upload image</button>

        <button disabled={!dataVerify} onClick={async(e)=>handleUploadEditedData(e,type)}>Confirm Changes</button>

        {<p>{dataLoading ? `Data Updating..` : dataError ? dataError : dataConfirm}</p>}


      </form>

      </div>
    
    }

    {type === 'place' &&

    <div className="edit-form-parent">

        <h1>Edit Your favourite Tourist place here</h1>
        <p id='note-tag'>Note : Entered Details must be correct</p>

     <form >
     <input type="text" name='title' placeholder='place title' onChange={(e)=>handleChange(e,setPlaceData)} value={placeData.title} />

     <textarea  name="description"  cols="30" rows="10" placeholder='place description' onChange={(e)=>handleChange(e,setPlaceData)} value={placeData.description}></textarea>
     
     <input type="text" name='location' placeholder='location' onChange={(e)=>handleChange(e,setPlaceData)} value={placeData.location} />
   
  
     <select name="country" id="country" onChange={(e)=>handleChange(e,setPlaceData)} value={placeData.country}>
         <option value="">select country</option>
         <option value="india">india</option>
     </select>

     <select name="state" id="state" onChange={(e)=>handleChange(e,setPlaceData)} value={placeData.state}>
         <option value="">select state</option>
         <option value="tamilnadu">tamilnadu</option>
     </select>

     <select name="district" id="district" onChange={(e)=>handleChange(e,setPlaceData)} value={placeData.district}>
         <option value="">select district</option>
         {(placeData.state === 'tamilnadu') &&  districtList }

     </select>

     <img src={placeData.imgURL} alt={placeData.title} style={{width:'4rem',height:'4rem'}} />


      <input type="file" id='file-input' placeholder='upload img' onChange={(e)=>setPlaceImgData(e.target.files[0])} />

     {<p className='error-tag' id='img-error-tag' style={{color:imgLoading?'#414756' : imgError ? 'red' : imgConfirm ? 'rgb(2,13,33)' : 'black'}}>{imgLoading ? `Image uploading..` : imgError ? imgError : imgConfirm}</p> }


     <button disabled={!placeImgData} onClick={(e)=>handleUploadImg(e,type)}>upload image</button>


     <button disabled={!dataVerify}  onClick={(e)=>handleUploadEditedData(e,type)}>Confirm Changes</button>

     {<p className='error-tag' id='data-error-tag' style={{color:imgLoading?'#414756' : imgError ? 'red' : imgConfirm ? 'rgb(2,13,33)' : 'black'}}>{dataLoading ? `Data Updating..` : dataError ? dataError : dataConfirm}</p>} 

      </form>
     </div> 
    
    }

   </div>
  )
}

export default EditForm