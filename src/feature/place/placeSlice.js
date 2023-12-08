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
        description:'Located 13 kilometers away from Munnar, Mattupetty is a hill station elevated at a height of 1700 meters. The dam, famously known as Mattupetty dam, is the main attraction here that covers an area of 323.75 hectares. The dam was constructed under Pallivasal hydro-electric project for generating power and now is a vital source for supply of electricity as well as haven for the local fauna, especially the elephants, due to constant availability of water. The still water that reflects the tea gardens around is simply calming. The tourist can visit Mattupetty dam from August to March for engaging in activities like boating. We value your privacy. Our Sites use Cookies and Similar Technologies on this website to improve your online experience, to analyze site usage, and to show tailored advertising to you.',
        place:'Kollimalai',
        district:'namakkal',
        state:'Tamil nadu',
        country:'India',
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Madupetty_Dam,_Munnar,_Kerala_(2).jpg/1280px-Madupetty_Dam,_Munnar,_Kerala_(2).jpg',
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