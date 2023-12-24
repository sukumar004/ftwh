import { useState,createContext } from "react";

const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [placeState,setPlaceState] = useState(false);
    const [hotelState,setHotelState] = useState(false);
    const [navState,setNavState] = useState(false);
    const [accountShow,setAccountShow] = useState(false)
    const [profileState,setProfileState] = useState(false);
    const [presentUser,setPresentUser] = useState(null);

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


    
    const allDistricts = ["Ariyalur","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kanchipuram","Kanyakumari","Karur",
    "Krishnagiri","Madurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivaganga","Thanjavur","Theni",
    "Thoothukudi","Tiruchirappalli","Tirunelveli","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"]


    const districtList = allDistricts.map((val,index)=>(<option key={index} value={`${val}`}>{val}</option>))

    return(
        <DataContext.Provider value={{
            placeState,handlePlaceToggle,districtList,hotelState,handleHotelToggle,navState,handleNavToggle,presentUser,setPresentUser,accountShow,handleAccountToggle,
            profileState,handleProfileToggle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;