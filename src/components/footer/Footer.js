import React from 'react'
import './footer.css'

function Footer() {

    const date = new Date()
  return (
    <div className="footer-top-parent">

        <div className="footer">
            <img src="/FTWH.png" alt="ftwh logo" />
            <p>FTWH {date.getFullYear()} &copy; rights reserved</p>
        </div>

    </div>
  )
}

export default Footer