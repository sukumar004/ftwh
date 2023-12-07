import React from 'react'
import './home.css'
import { FaGreaterThan } from "react-icons/fa6";



const Home = () => {
  return (
  <main>

    <div className='home-component'>

        <div className="select">

            <select name="country" id="country">
                <option value="">select country</option>
            </select>
            <select name="state" id="state">
                <option value="">select state</option>
            </select>
            <select name="district" id="district">
                <option value="">select district</option>
            </select>
            <button>SEARCH</button>

        </div>

        <div className="heading-text">

            <h1>Here You Can Find Where You Go</h1>

        </div>

        <div className="high-rated-places">

            <button>Discover Visited Places</button>

        </div>

        <div className="add-new-post">

            <h3>Add new place</h3>
            <p><FaGreaterThan /></p>
            
        </div>

    </div>


  </main>
  )
}

export default Home