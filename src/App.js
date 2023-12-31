import React, { useEffect,useState } from 'react'
import Home from './components/home/Home'
import PlacePage from './components/placePage/PlacePage'
import Layout from './components/layout/Layout.js'
import { Route,Routes } from 'react-router-dom'
import BookNow from './components/book now/BookNow.js'
import { db } from './firebaseConfig.js'
import {collection,getDocs} from 'firebase/firestore'
import { useDispatch } from 'react-redux';
import { addData } from './feature/place/placeSlice.js'
import { addHotel } from './feature/hotel details/hotelDetailsSlice.js'
import { addPlaceReviewData } from './feature/review/reviewSlice.js'
import { BiSolidError } from "react-icons/bi";
import { DataProvider } from './components/context/DataContext.js'
import AboutUs from './components/about us/AboutUs.js'
import { addUserData } from './feature/userDetails/userSlice.js'
import Profile from './components/profile/Profile.js'
import EditForm from './components/add/EditForm.js'



const App = () => {

    const [dataError,setDataError] = useState()
    const [loadingData,setLoadingData] = useState(false)
    const dispatch = useDispatch()



    

  useEffect(()=>{
    const request =   async()=>{
      try{
        setLoadingData(true)
        const collectionRef = collection(db,'placeDetails')
        const requestData = await getDocs(collectionRef)
        const places = requestData.docs.map((doc)=>{
          return{id:doc.id,...doc.data()}
        })
        dispatch(addData(places))
        if(!places.length)  {
        //  setDataError(pre=>(pre='Data not fetched please reload the page')) 
          throw Error('Data not fetched please reload the page')

        }

        const collectionRef2 = collection(db,'hotelDetails')
        const requestData2 = await getDocs(collectionRef2)
        const hotels = requestData2.docs.map((doc)=>{
          return{id:doc.id,...doc.data()}
        })
        dispatch(addHotel(hotels))
        if(!hotels.length) {
          // setDataError('Data not fetched please reload the page')
          throw Error('Data not fetched please reload the page')

      } 
      
      const collectionRef3 = collection(db,'commentDetails')
      const requestData3 = await getDocs(collectionRef3)
      const placeReviews = requestData3.docs.map((doc)=>{
        return{id:doc.id,...doc.data()}
      })
      dispatch(addPlaceReviewData(placeReviews))
      if(!placeReviews.length){
        throw Error("Data not fetched please reload the page")
      }

      const collectionRef4 = collection(db,'userDetails')
      const requestExistingData = await getDocs(collectionRef4)
      const userDetails = requestExistingData.docs.map((val)=>{return{id:val.id,...val.data()}})
      dispatch(addUserData(userDetails))
      if(!userDetails.length){
        throw Error("Data not fetched please reload the page")
      }

      }catch(err){
        setDataError(err.message)

      }finally{
        setLoadingData(false)
      }
    }

    (async()=>request())()
    
  },[])



  return (
    <>
    <DataProvider>

    {!loadingData && !dataError ? 
    <Routes>
      
      <Route path='/' element={<Layout />} > 
      
        <Route index element={<Home />} />

        <Route path='/place/:id' element = {<PlacePage />} />

        <Route path='/bookNow/:id' element={<BookNow />} />

        <Route path='/profile/:id' element={<Profile />} />

        <Route path='/editPost/:id' element={<EditForm />} />


      </Route>


      {/* <Route path='*' element = {<Missing />} /> */}



    </Routes> :

    <div className="error-shown">
      <p>{loadingData ? `Loading..` : dataError && <h3 id='error-message'><span><BiSolidError /></span>{dataError}</h3>}</p>
      {(dataError && !loadingData) && <p>Error 404 not found</p>}
      {/* {loadingData && <h3>{`Loading..`}</h3>}
      {dataError && <h3 id='error-message'><span><BiSolidError /></span>{dataError}</h3>} */}
    </div>

    }

    </DataProvider>
    </>
  )
}

export default App