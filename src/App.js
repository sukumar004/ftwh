import React from 'react'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Card from './components/card/Card'
import PlacePage from './components/placePage/PlacePage'
import Layout from './components/layout/Layout.js'
import { Route,Routes } from 'react-router-dom'


const App = () => {
  return (
    <>
    <Routes>

      <Route path='/' element={<Layout />} > 
      
        <Route index element={<Home />} />
      
      
      </Route>



    </Routes>
    </>
  )
}

export default App