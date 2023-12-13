import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPost } from '../../feature/place/placeSlice'
import './card.css'
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { Link } from 'react-router-dom';


const Card = () => {
    const post = useSelector(selectAllPost)

    const[loadMore,setLoadMore] = useState(false)

    const topPost = post.slice(0,6)

    const changeLoadMore = () => setLoadMore(pre=>(pre = !pre))


    const listAllPost = (loadMore?post:topPost).map((post)=>{
        return(
            <section key={post.id}>
                    
                <Link id='place-link' to='/place'>

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
                </Link>

            </section>
        )
    })
  return (
    <>
    <div className="place">
        {listAllPost}
    </div>
    {!loadMore && 
        
        <div className="load-more-button">
            <button onClick={changeLoadMore}>Load More</button>
    </div>}
    
    </>
  )
}

export default Card