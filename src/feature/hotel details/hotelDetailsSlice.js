import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hotel:[]
}

const hotelDetailsSlice = createSlice({
    name:'hotelDetails',
    initialState,
    reducers:{
        addHotel:(state,action)=>{
            state.hotel = action.payload
        }

    }
})

export const selectAllHotels = (state) => state.hotelDetails.hotel;
export const selectHotelByDistrict = (state,districtName) => state.hotelDetails.hotel.filter((hotel)=>hotel.district.toUpperCase() === districtName.toUpperCase())
export const selectHotelByCountry = (state,countryName) => state.hotelDetails.hotel.filter((hotel)=> hotel.country.toUpperCase() === countryName.toUpperCase())
export const selectHotelByState = (state,stateName) => state.hotelDetails.hotel.filter((hotel)=>hotel.state.toUpperCase()===stateName.toUpperCase())
export const selectHotelByIdSp = (state,idSp) => state.hotelDetails.hotel.find(hotel=>hotel.idSp.toUpperCase()===idSp.toUpperCase())
export const selectRemainingDistrictHotles = (state,district) =>state.hotelDetails.hotel.filter((hotel)=>hotel.district.toUpperCase() !== district.toUpperCase()) 

export const selectHotelByUid = (state,uid) => state.hotelDetails.hotel.filter((hotel)=>((hotel.uid) && hotel.uid.toUpperCase()===uid.toUpperCase()))
export const selectHotelById = (state,id) => state.hotelDetails.hotel.find((hotel)=>hotel.id.toUpperCase()===id.toUpperCase())



export const {addHotel} = hotelDetailsSlice.actions    

export default hotelDetailsSlice.reducer;