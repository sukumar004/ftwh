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

export const {addHotel} = hotelDetailsSlice.actions    

export default hotelDetailsSlice.reducer;