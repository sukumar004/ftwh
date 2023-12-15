import React, { useEffect } from 'react'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Card from './components/card/Card'
import PlacePage from './components/placePage/PlacePage'
import Layout from './components/layout/Layout.js'
import { Route,Routes } from 'react-router-dom'
import PlaceForm from './components/add/PlaceForm.js'
import HotelForm from './components/add/HotelForm.js'
import BookNow from './components/book now/BookNow.js'





const App = () => {





  return (
    <>
    <Routes>

      <Route path='/' element={<Layout />} > 
      
        <Route index element={<Home />} />

        <Route path='/place/:id' element = {<PlacePage />} />

        <Route path='/placeForm' element={<PlaceForm />} />

        <Route path='/hotelForm' element={<HotelForm />} />

      
      </Route>
      <Route path='/bookNow/:id' element={<BookNow />} />

      {/* <Route path='*' element = {<Missing />} /> */}



    </Routes>
    </>
  )
}

export default App