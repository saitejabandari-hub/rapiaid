import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Cookies from "js-cookie"

import RequestPage from './pages/RequestPage'
import DonorPage from './pages/DonorPage'
import CoordinatorPage from './pages/CoordinatorPage'
import LiveTracking from './pages/LiveTracking'
import ChooseDelivery from './pages/ChooseDelivery'
import TrackingPickup from './pages/TrackingPickup'
import TrackingNgo from './pages/TrackingNgo'
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
            if(response.ok){
                setUser(data.user)
            }

        }

        getUser()

    },[])

  
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    {user.role === "donor" && (
                        <>
                            <Route path="/" element={<DonorPage />} />
                            <Route path="/choose-delivery/:matchId" element={<ChooseDelivery />} />
                            <Route path="/donor-tracking" element={<TrackingNgo/>} />
                        </>
                    )}

                    {user.role === "requester" && (
                        <>
                            <Route path="/" element={<RequestPage />} />
                            <Route path="/request-livetrack" element={<LiveTracking />} />
                        </>
                    )}

                    {user.role === "ngo_volunteer" && (
                        <>
                            <Route path="/" element={<CoordinatorPage />} />
                            <Route path="/donor-request/:assignmentId" element={<NgoRequest/>} />
                            <Route path="/ngo-tracking" element={<TrackingPickup/>} />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
)

        
    

    
   
        
    

}

export default App