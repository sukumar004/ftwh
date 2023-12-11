import React from 'react'
import './layout.css'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Home from '../home/Home'

const Layout = () => {
  return (
    <>
      <Header />
    <main className='App'>
        
        <Outlet/>

    </main>

    </>
  )
}

export default Layout