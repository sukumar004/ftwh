import React, { useEffect, useState, useContext } from 'react'
import './home.css'
import Card from '../card/Card';
import { useDispatch } from 'react-redux';
import AboutUs from '../about us/AboutUs';
import { selectAllPost } from '../../feature/place/placeSlice';
import { useSelector } from 'react-redux';
import DataContext from '../context/DataContext';
import Aos from 'aos';
import 'aos/dist/aos.css'



const Home = () => {

  const {searchList,setSearchList,districtList} = useContext(DataContext)

  const [dataError,setDataError] = useState()
  const [loadingData,setLoadingData] = useState(false)
  // const [searchList,setSearchList] = useState({country:'',state:'',district:''})

  const handleSearchValue = (e) => {
    const name = e.target.name;
    setSearchList((pre)=>{
      return{
        ...pre,
        [name]:e.target.value
      }
    })  
    
    if(searchList.district.length>0 && searchList.state.length>0){
      return setSearchList((pre)=>{return {...pre,state:'',district:''}})
    } else if(searchList.district.length>0 && searchList.country.length > 0){
      return setSearchList((pre)=>{return {...pre,district:''}})
    }
}

// const handleDistrictValuSet = (e) => {
//   if(searchList.country===''){
//     return se
//   }
// }

  const allPost = useSelector(selectAllPost)


  useEffect(()=>{
    Aos.init()
  },[])
  const dispatch = useDispatch()
      // console.log('search List check',searchList.country==='')

//     let state = [ "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand",
// "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","tamilnadu","Telangana",
// "Tripura","Uttarakhand","Uttar Pradesh","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Delhi",
// "Lakshadweep","Puducherry"]

//     const stateList = state.map((val,index)=>(<option key={index} value={`"${val}"`}>{val}</option>))

  return (

<div className="home-page">


  {/* {!loadingData && !dataError ? */}


    <div className="loading-error-div">

     

    

      <div className='home-component'>
          

          <div className="heading-text">

              <h1 data-aos="fade-up">Here You Can Find Where You Go</h1>
              <p data-aos="zoom-down">Search deals on hotels,homes and much more...</p>

          </div>

          <div className="select">

              <select name="country" id="country" onChange={(e)=>handleSearchValue(e)} value={searchList.country} data-aos="fade-right">
                  <option value="">select country</option>
                  <option value="india">India</option>
              </select>
              <select name="state" id="state" onChange={(e)=>handleSearchValue(e)} value={searchList.state} data-aos="fade-up">
                  <option value="">select state</option>
                  {searchList.country.length>0 &&
                  <option value="tamilnadu">Tamil Nadu</option>}
                  {/* {searchList.country === 'india' && stateList} */}
                  {/* {stateList} */}
              </select>
              <select name="district" id="district" onChange={(e)=>handleSearchValue(e)} value={searchList.district} data-aos="fade-left">
                  <option value="">select district</option>
                  {/* <option value="Tiruchirappalli">Tiruchirappalli</option> */}
                  {/* {(searchList.state ==='tamilnadu') && districtListNew}*/}
                  {searchList.state.length>0 && districtList}
              </select>


          </div>

        

          {/* <div className="high-rated-places">

              <button>SEARCH</button>?

          </div>  */}



    
          {/* <div className="add-new-post">

              <h3>Add new place</h3>
              <p><FaGreaterThan /></p>
              
          </div> */}

      </div>

  

      <div className="card-component">
          <Card />
      </div> 
      <div className="about-us-component" id='aboutUs'>
        <AboutUs />
      </div>
    </div> 
    {/* : 

    <div className="error-shown">
      <p>{loadingData ? `Loading..` : dataError && <h3 id='error-message'><span><BiSolidError /></span>{dataError}</h3>}</p>
    </div>

} */}

 </div>

    
  )
}

export default Home