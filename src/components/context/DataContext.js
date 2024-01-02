import { useState,createContext } from "react";
import { parseISO,formatDistanceToNow } from "date-fns";

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
    




    
    const allDistricts = ["Ariyalur","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kanchipuram","Kanyakumari","Karur",
    "Krishnagiri","Madurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivaganga","Thanjavur","Theni",
    "Thoothukudi","Tiruchirappalli","Tirunelveli","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"]


    const districtList = allDistricts.map((val,index)=>(<option key={index} value={`${val}`}>{val}</option>))

    return(
        <DataContext.Provider value={{
            placeState,handlePlaceToggle,districtList,hotelState,handleHotelToggle,navState,handleNavToggle,presentUser,setPresentUser,accountShow,handleAccountToggle,
            profileState,handleProfileToggle,loadMore,changeLoadMore,timeChange,scrollToTop,commentsMore,handleCommentsToggle,presentUserUid,setPresentUserUid,editPostType,setEditPostType,handleEditPostToggle,editPostToggle,editPostId,setEditPostId,handleEditProfileToggle,editProfileToggle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;