import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = [
    {
        id:nanoid(),
        title:'This first place',
        description:'We value your privacy. Our Sites use Cookies and Similar Technologies on this website to improve your online experience, to analyze site usage, and to show tailored advertising to you.',
        place:'Kollimalai',
        district:'namakkal',
        state:'Tamil nadu',
        country:'India',
        img:'/images/img-1.jpg',
        rating:'4.0'

    },
    {
        id:nanoid(),
        title:'This Second place',
        description:'We value your privacy. Our Sites use Cookies and Similar Technologies on this website to improve your online experience, to analyze site usage, and to show tailored advertising to you.',
        place:'Kollimalai',
        district:'namakkal',
        state:'Tamil nadu',
        country:'India',
        img:'/images/img-2.jpg',
        rating:'4.0'
    },
    {
        id:nanoid(),
        title:'This Second place',
        description:'We value your privacy. Our Sites use Cookies and Similar Technologies on this website to improve your online experience, to analyze site usage, and to show tailored advertising to you.',
        place:'Kollimalai',
        district:'namakkal',
        state:'Tamil nadu',
        country:'India',
        img:'/images/img-2.jpg',
        rating:'4.0'
    },
    {
        id:nanoid(),
        title:'This Second place',
        description:'We value your privacy. Our Sites use Cookies and Similar Technologies on this website to improve your online experience, to analyze site usage, and to show tailored advertising to you.',
        place:'Kollimalai',
        district:'namakkal',
        state:'Tamil nadu',
        country:'India',
        img:'/images/img-2.jpg',
        rating:'4.0'
    },
    {
        id:5,
        title:'This Second place',
        description:'We value your privacy. Our Sites use Cookies and Similar Technologies on this website to improve your online experience, to analyze site usage, and to show tailored advertising to you.',
        place:'Kollimalai',
        district:'namakkal',
        state:'Tamil nadu',
        country:'India',
        img:'/images/img-2.jpg',
        rating:'4.0'
    },

]

const placeSlice = createSlice({
    name:'place',
    initialState,
    reducers:{

    }
})

export const selectAllPost = (state)=> state.place
export const selectPostById = (state,id) => state.place.find(post => post.id === id) 

export default placeSlice.reducer;