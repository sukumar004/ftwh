import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id:'1',
        name:'Mayas Residency',        
        district:'namakkal',
        loaction:'Chatiram Bus Stand',
        state:'Tamilnadu',
        country:'India',
        tel:'+91 9000090000',
        room:"5500",
        roomDetails:{
            totalRooms:'30',
            roomlimit:'4',           
        },
        rates:{
            adult:'1000',
            children:'500',
            infants:'0',
        },
        photos:{
            img1:'/images/ht-1.jpg',
            img2:'/images/ht-2.jpg'
        }

    },
    
    {
        id:'2',
        name:'PLA Residency',        
        district:'namakkal',
        loaction:'Main Bus Stand',
        state:'Tamilnadu',
        country:'India',
        tel:'+91 9000090000',
        room:"6500",
        roomDetails:{
            totalRooms:'30',
            roomlimit:'4',           
        },
        rates:{
            adult:'999',
            children:'499',
            infants:'0',
        },
        photos:{
            img1:'/images/ht-1.jpg',
            img2:'/images/ht-2.jpg'
        }


    }
]

const hotelDetailsSlice = createSlice({
    name:'hotelDetails',
    initialState,
    reducers:{

    }
})

export const selectAllHotels = (state) => state.hotelDetails;
export const selectHotelByDistrict = (state,districtName) => state.hotelDetails.filter((hotel)=>hotel.district.toUpperCase() === districtName.toUpperCase())
export const selectHotelByCountry = (state,countryName) => state.hotelDetails.filter((hotel)=> hotel.country.toUpperCase() === countryName.toUpperCase())
export const selectHotelByState = (state,stateName) => state.hotelDetails.filter((hotel)=>hotel.state.toUpperCase()===stateName.toUpperCase())

    

export default hotelDetailsSlice.reducer;