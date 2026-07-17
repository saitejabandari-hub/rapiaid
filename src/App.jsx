import { useState,useEffect } from 'react'
import Cookies from "js-cookie"

import RequestPage from './pages/RequestPage'
import DonorPage from './pages/DonorPage'
import CoordinatorPage from './pages/CoordinatorPage'
import LiveTracking from './pages/LiveTracking'
import ChooseDelivery from './pages/ChooseDelivery'
import TrackingPickup from './pages/TrackingPickup'
import NgoRequest from './pages/NgoRequest'
import Register from './pages/Register'
import Login from './pages/Login'

const  App = ()=>{
    const [user,setUser]=useState({})
    const jwt = Cookies.get("jwt_token")

    useEffect(()=>{

        const getUser =  async () =>{

            const url = 'http://localhost:5000/prof/getuser'

            const options ={
                method:"GET",
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            }

            const response = await fetch(url,options)
            const data = await response.json()
            setUser(data.user)
            console.log(data.user)
            

        }

        getUser()

    },[])

    
        
    if (user.role === "donor") {
        return <><DonorPage /> </>

    }

    if (user.role === "requester") {
        return <><RequestPage /><LiveTracking/></>
    }

    if (user.role === "ngo_volunteer") {
        return <><CoordinatorPage /><NgoRequest/><TrackingPickup/></>
    }

//   return <Login/>

    
   
        
    

}

export default App