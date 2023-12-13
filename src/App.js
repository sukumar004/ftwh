import React from 'react'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Card from './components/card/Card'
import PlacePage from './components/placePage/PlacePage'
import Layout from './components/layout/Layout.js'
import { Route,Routes } from 'react-router-dom'
import PlaceForm from './components/add/PlaceForm.js'
import HotelForm from './components/add/HotelForm.js'



const App = () => {
  return (
    <>
    <Routes>

      <Route path='/' element={<Layout />} > 
      
        <Route index element={<Home />} />

        <Route path='/place' element = {<PlacePage />} />

        <Route path='/placeForm' element={<PlaceForm />} />

        <Route path='/HotelForm' element={<HotelForm />} />
      
      </Route>



    </Routes>
    </>
  )
}

export default App