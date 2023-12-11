import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPost } from '../../feature/place/placeSlice'
import './card.css'
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineStarPurple500 } from "react-icons/md";


const Card = () => {
    const post = useSelector(selectAllPost)

    const listAllPost = post.map((post)=>{
        return(
            <section key={post.id}>
                <div className="place-container">
                    <div className="place-img">
                        <img src={post.img} alt="post.title"/>
                    </div>
                    <div className="place-details">
                        <p><IoLocationOutline/>{`${post.place}, ${post.district}`}</p>
                        <h1>{post.title}</h1>
                        
                        <div className="place-location">
                            <p>{`${post.state}, ${post.country}`}</p>
                        </div>

                        <div className="place-rating">
                            <p>{<MdOutlineStarPurple500/>}{post.rating ? `${post.rating}` : `New`}</p>
                        </div>
                        
                    </div>
                </div>
            </section>
        )
    })
  return (
    <div className="place">
        {listAllPost}
    </div>
  )
}

export default Card