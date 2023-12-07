import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectPostById } from '../../feature/place/placeSlice';


function PlacePage() {

    const {id} = useParams()

    const selectedPost = useSelector((state)=>selectPostById(state,Number(5)))

  return (
    <section>
        <div className="selected-post">
            
        </div>
    </section>
  )
}

export default PlacePage