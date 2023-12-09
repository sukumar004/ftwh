import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id:1,
        roomDetails:{
            checkIn:'',
            checkOut:'',
            days:1,
            adult:1,
            children:0,
            infants:0
        },
        hotelDetaile:{
            hotelId:5
        },
        serviceAmount:'',
        total:'',


    }
]

const bookingDetailsSlice = createSlice({

    name :'bookings',
    initialState,
    reducers:{

    }
})

export const SelectbookingDetails = (state) => state.bookings
export default bookingDetailsSlice.reducer;