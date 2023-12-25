import React from 'react'
import './layout.css'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'

const Layout = () => {
  return (
    <>
      <Header />
    <main className='App'>
        
        <Outlet/>

    </main>

      <Footer />

    </>
  )
}

export default Layout