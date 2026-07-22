import { BrowserRouter, Routes, Route,Navigate   } from 'react-router-dom'

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
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

const  App = ()=>{
    const [user,setUser]=useState(null)
    
    useEffect(()=>{

        const jwt = Cookies.get("jwt_token")
        console.log(jwt)

        const getUser =  async () =>{


          try{

              const url = 'https://rapidaid-back.onrender.com/prof/getuser'

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
                  console.log(data.user)
            }

          }catch(error){
            console.log(error.message)
          }

        }
         if (jwt){
             getUser()
        
         }


    },[])


  
        return(
            <BrowserRouter>
                    


                   <Routes>

                    <Route
                        path="/"
                        element={
                            user
                                ? <Navigate to={`/${user.role}`} replace />
                                : <Navigate to="/login" replace />
                        }
                    />

                     <Route path="/register"
                        element={
                            <PublicRoute user={user}>
                                <Register />
                            </PublicRoute>
                                
                           
                        }
                    />

                    <Route path="/login"
                        element={
                            <PublicRoute user={user}>
                                <Login />
                            </PublicRoute>
                        }
                    />


                 <Route
                        path="/donor"
                        element={
                            <ProtectedRoute user={user} role="donor">
                                <DonorPage />
                            </ProtectedRoute>
                        }
                    />

                <Route
                        path="/choose-delivery/:matchId"
                        element={
                            <ProtectedRoute user={user} role="donor">
                                <ChooseDelivery />
                            </ProtectedRoute>
                        }
                    />

                 <Route
                        path="/donor-tracking/:matchId"
                        element={
                            <ProtectedRoute user={user} role="donor">
                                <TrackingPickup />
                            </ProtectedRoute>
                        }
                    />
                <Route
                        path="/requester"
                        element={
                            <ProtectedRoute user={user} role="requester">
                                <RequestPage />
                            </ProtectedRoute>
                        }
                    />

                <Route
                        path="/request-livetrack/:requestId"
                        element={
                            <ProtectedRoute user={user} role="requester">
                                <LiveTracking />
                            </ProtectedRoute>
                        }
                    />

                <Route
                        path="/ngo_volunteer"
                        element={
                            <ProtectedRoute user={user} role="ngo_volunteer">
                                <CoordinatorPage />
                            </ProtectedRoute>
                        }
                    />

                <Route
                        path="/donor-request/:assignmentId"
                        element={
                            <ProtectedRoute user={user} role="ngo_volunteer">
                                <NgoRequest />
                            </ProtectedRoute>
                        }
                    />

                <Route
                        path="/ngo-tracking"
                        element={
                            <ProtectedRoute user={user} role="ngo_volunteer">
                                <TrackingNgo />
                            </ProtectedRoute>
                        }
                    />
                   </Routes>
            </BrowserRouter>
)

        
    

    
   
        
    

}

export default App