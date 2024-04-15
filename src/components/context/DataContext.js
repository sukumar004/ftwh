import { useState,createContext } from "react";
import { parseISO,formatDistanceToNow } from "date-fns";
import { selectPlaceReviewByIdSp } from "../../feature/review/reviewSlice";
import { useSelector } from "react-redux";


const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [placeState,setPlaceState] = useState(false);
    const [hotelState,setHotelState] = useState(false);
    const [navState,setNavState] = useState(false);
    const [accountShow,setAccountShow] = useState(false)
    const [profileState,setProfileState] = useState(false);
    const [presentUser,setPresentUser] = useState(null);
    const [presentUserUid,setPresentUserUid] = useState(null)
    const [commentsMore,setCommentsMore] = useState(false)
    const[loadMore,setLoadMore] = useState(false)
    const [editPostType,setEditPostType] = useState(null)
    const [editPostId,setEditPostId] = useState(null)
    const [editPostToggle,setEditPostToggle] = useState(false)
    const [editProfileToggle,setEditProfileToggle] = useState(false)
    const [searchList,setSearchList] = useState({country:'',state:'',district:''})



    const handlePlaceToggle = () => {
        setPlaceState(pre=>(pre = !pre))
    }

    const handleHotelToggle = () => {
        setHotelState(pre=>(pre = !pre))
    }

    const handleNavToggle = () => {
        setNavState(pre => (pre = !pre))
    }

    const handleAccountToggle = () => {
        setAccountShow(pre => (pre = !pre))
    }

    const handleProfileToggle = () => {
        setProfileState(pre => (pre = !pre))
    }

    const handleCommentsToggle = () => {
        setCommentsMore(pre => (pre = !pre))
    }

    const handleEditProfileToggle = () => {
        setEditProfileToggle((pre)=>(pre = !pre))
    }

    const timeChange = (date) => {
        const actualDate = parseISO(date)
        const timePeriod = formatDistanceToNow(actualDate)
        return timePeriod
    }

    const handleEditPostToggle = () => {
        setEditPostToggle(pre => (pre = !pre))
    }

    const changeLoadMore = () => setLoadMore(pre=>(pre = true))

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };


    // const getRatingThroughIdsp = (idSp) => {

    //     const selectAllComments = useSelector((state)=>selectPlaceReviewByIdSp(state,idSp)) 
    //     let rating = 0;

    //     if(selectAllComments.length){
    //         for(let i=0;i<selectAllComments.length;i++){

    //             rating = rating + selectAllComments[i].rating
    //         }

    //     } else{
    //         rating = 0
    //     }

    //     return rating/selectAllComments.length
    // }
    




    
    const allDistricts = ["Ariyalur","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kanchipuram","Kanyakumari","Karur",
    "Krishnagiri","Madurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivaganga","Thanjavur","Theni",
    "Thoothukudi","Tiruchirappalli","Tirunelveli","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"]


    const districtList = allDistricts.map((val,index)=>(<option key={index} value={`${val}`}>{val}</option>))

    return(
        <DataContext.Provider value={{
            placeState,handlePlaceToggle,districtList,hotelState,handleHotelToggle,navState,handleNavToggle,presentUser,setPresentUser,accountShow,handleAccountToggle,
            profileState,handleProfileToggle,loadMore,changeLoadMore,timeChange,scrollToTop,commentsMore,handleCommentsToggle,presentUserUid,setPresentUserUid,editPostType,setEditPostType,handleEditPostToggle,editPostToggle,editPostId,setEditPostId,handleEditProfileToggle,editProfileToggle,searchList,setSearchList
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;