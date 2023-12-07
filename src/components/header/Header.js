import React from 'react'
import './header.css'

const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="logo">

          <h1>Find Travel with Happy</h1>

        </div>

        <div className="nav">

            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li><button>Login</button></li>
            </ul>
            
          </div>
      </div>
    </header>
  )
}

export default Header