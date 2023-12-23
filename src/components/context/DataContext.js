import { useState,createContext } from "react";

const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [placeState,setPlaceState] = useState(false);
    const [hotelState,setHotelState] = useState(false);

    const handlePlaceToggle = () => {
        setPlaceState(pre=>(pre = !pre))
    }

    const handleHotelToggle = () => {
        setHotelState(pre=>(pre = !pre))
    }



    
    const allDistricts = ["Ariyalur","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kanchipuram","Kanyakumari","Karur",
    "Krishnagiri","Madurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivaganga","Thanjavur","Theni",
    "Thoothukudi","Tiruchirappalli","Tirunelveli","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"]


    const districtList = allDistricts.map((val,index)=>(<option key={index} value={`${val}`}>{val}</option>))

    return(
        <DataContext.Provider value={{
            placeState,handlePlaceToggle,districtList,hotelState,handleHotelToggle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;