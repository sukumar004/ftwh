import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPost,selectPlaceByCountry} from '../../feature/place/placeSlice'
import './card.css'
import { IoLocationOutline } from "react-icons/io5";
import { VscSearchStop } from "react-icons/vsc";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext';
import Aos from 'aos';
import 'aos/dist/aos.css'


const Card = () => {

    const {loadMore,changeLoadMore,timeChange,scrollToTop,searchList} = useContext(DataContext)

  

    const post = useSelector(selectAllPost)
    const [searchPost,setSearchPost] = useState()

    // console.log("searchPost",searchPost)

    const handleSearchPost = () => {        
        
        if(searchList.country.length>0 && searchList.state.length>0 && searchList.district.length>0){

            const searchedCountryList = post.filter((post)=>(post.country.toUpperCase()===searchList.country.toUpperCase()))
            const searchedStateList = searchedCountryList.filter((post)=>(post.state.toUpperCase()===searchList.state.toUpperCase()))
            // console.log(searchedStateList)
            const searchedDistrictList = searchedStateList.filter((post)=>{return post.district.toUpperCase()===searchList.district.toUpperCase()})
            searchedDistrictList.length>0 ? setSearchPost(searchedDistrictList) : setSearchPost(null)

        } else if(searchList.country.length>0 && searchList.state.length>0 && searchList.district.length===0){
            const searchedCountryList = post.filter((post)=>(post.country.toUpperCase()===searchList.country.toUpperCase()))
            const searchedStateList = searchedCountryList.filter((post)=>{return post.state.toUpperCase()===searchList.state.toUpperCase();})
            // console.log('search List in state',searchedStateList)
            searchedStateList.length>0 ? setSearchPost(searchedStateList) : setSearchPost(null)
            // console.log('searchlist after state only selected',searchPost)     

        } else if(searchList.country.length>0 && searchList.state.length===0 && searchList.district.length===0){
            const searchedCountryList = post.filter((post)=>(post.country.toUpperCase()===searchList.country.toUpperCase()))
            searchedCountryList.length>0 ? setSearchPost(searchedCountryList) : setSearchPost(null)   
        }else{
            setSearchPost(null)
        }        
    }

    useEffect(()=>{
        handleSearchPost()
    },[searchList])

    useEffect(()=>{
       Aos.init({duration:'1000'})
    },[])

    const postActualDate = (searchPost ? searchPost : post).map((val)=>{
        return{
            ...val,
            date:timeChange(val.date)
        }
    })

    const sortArray = postActualDate.sort(function(a,b){return -a.date.localeCompare(b.date)})

    const topPost = sortArray.slice(0,9)

    // console.log("search list",searchList)



 const listAllPost =(loadMore?sortArray:topPost).map((post)=>{



        return(
            <section key={post.id}>
          
                <Link id='place-link' to={`/place/${post.idSp}`} onClick={()=>scrollToTop()}>

                <div className="place-container" data-aos="fade-up">
                    <div className="place-img">
                        <img src={post.imgURL} alt={post.title}/>
                    </div>
                    <div className="place-details">
                        <p><IoLocationOutline/>{`${post.location}, ${post.district}`}</p>
                        <h1>{post.title.length > 30 ? `${post.title.substring(0,35)}...`: post.title }</h1>
                        
                        <div className="place-location">
                            <p>{`${post.state}, ${post.country}`}</p>
                        </div>

                        {/* <div className="place-rating">
                            <p><span><MdOutlineStarPurple500/></span>{rating>0 ? `${rating}.0` : `0.0`}</p>
                        </div> */}

                        
                    </div>
                </div>
                </Link>

            </section>
        )
    }) 
  return (
    <>
      {post ? 

    <div className="top-post-parent">
        <h3 data-aos="zoom-up">Here you can find some tourist spots</h3>

        {/* Error message while searching operation execution.. */}
        {(!searchPost && (searchList.country.length>0 || searchList.state.length>0 || searchList.district.length>0)) &&
        <h5><span><VscSearchStop /></span>Oops! there is no place in {`"${searchList.district}"`}, Here some other places listed below..</h5>}
        <div className="place">            
            {listAllPost}
        </div>
        {!loadMore && 
            
            <div className="load-more-button">
               {listAllPost.length > 0 && <button onClick={changeLoadMore} data-aos="fade-down">Show More</button>}
            </div>
        }
    </div> : 

    <p>Data not loaded please reload the page</p>

    }
    
    </>
  )
}

export default Card