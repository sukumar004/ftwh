import React from 'react'
import './aboutUs.css'

function AboutUs() {
  return (
    <div className="about-us-top-parent">

      {/* <h1>About us</h1> */}

      <div className="about-us">
        <div className="about-us-img">
          <img src="/images/about-us.jpg" alt="About us" />
        </div>

        <div className="about-us-contents">
          <h3>About us</h3>
          <h5>FTWH is a demo website. The contents that displayed here, specifically the hotel details that are owned by airbnb.com & booking.com respectively. </h5>
          <p>This is SUKUMAR D a junior react developer from Trichy. It is developed only for entertainment and practicing.</p>
          <h5>Tech stacks : HTML5, CSS3, javaScript, React frontend framework & redux toolkit used for State Management</h5>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, dolorum omnis mollitia iure architecto.</p> */}
          <p>constact me : <a href='mailto:dpsukumardeve2303@gmail.com'>click here to send mail</a></p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs