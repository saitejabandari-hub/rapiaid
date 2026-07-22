import { useParams,useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Header from "../../components/Header";
import Cookies from 'js-cookie'


import "./index.css"
const ChooseDelivery =()=>{
    const {matchId} = useParams()
    const location = useLocation()
    const alertdata = location.state
    const [deliverMode, setDeliverMode] = useState('needs_pickup')
    const [donorLat, setDonorLat] = useState(null)
    const [donorLon, setDonorLon] = useState(null)
    const navigate = useNavigate()

    const jwt = Cookies.get("jwt_token")
   

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(  // this was pasted from AI
            (position) => {
                setDonorLat(position.coords.latitude)
                setDonorLon(position.coords.longitude)
            },
            (error) => {
                console.log("Could not get location:", error.message)
            }
        )
    }, [])


    const calculateDistance = (lat1, lon1, lat2, lon2) => {  // this was pasted from AI
        const R = 6371
        const toRad = (deg) => (deg * Math.PI) / 180

        const dLat = toRad(lat2 - lat1)
        const dLon = toRad(lon2 - lon1)

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        return R * c
    }

    const distance = (donorLat && donorLon && alertdata)  // this was pasted from AI
        ? calculateDistance(donorLat, donorLon, alertdata.lat, alertdata.log).toFixed(1)
        : null


    const onConfirmrequest = async() => {

        try{

            const url = `https://rapidaid-back.onrender.com/match/respond/${matchId}`

            const options = {
                method:"PUT",
                headers :{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${jwt}`
                },

                body: JSON.stringify({deliverMode})
                
            }

            const response = await fetch(url,options)
            const data = await response.json()
            
            if (response.ok) {
                console.log(data.message)
                navigate(`/donor-tracking/${matchId}`)
            }

        }catch(error){
            console.log(error.message)
        }

    }

    return(
        <div className="choosedelivery-container">
            <Header subtitles={"Somebody needby you need help"}/>
            <div className="choosedelivery-main-card">
                 <div className="choosedelivery-accepted-card">
                    <h1 className="choosedelivery-accepted-name">Request</h1>
                    <p className="choosedelivery-accepted-para">{alertdata.bloodgroup} · {alertdata.unitsneeded} units</p>
                 </div>
                 <div className="choosedelivery-accepted-card">
                    <h1 className="choosedelivery-accepted-name">Requester Distance</h1>
                    <p className="choosedelivery-accepted-para">{distance ? `${distance} km away` : "Calculating..."}</p>
                 </div>

                 <div className={`choosedelivery-choosetravel-card ${deliverMode === 'self_deliver' && "choosedelivery-choosetravel-card-selected"}`} onClick={()=>{setDeliverMode('self_deliver')}} >
                        <p className="choosedelivery-travel-path">🚶</p>
                        <div className="choosedeliver-text-card">
                            <h1 className="travelpath-heading">I'll deliver it myself</h1>
                            <p className="travelpath-paragraph">You're nearby hand it over directly</p>
                        </div>
                 </div>

                  <div className={`choosedelivery-choosetravel-card ${deliverMode === "needs_pickup" && "choosedelivery-choosetravel-card-selected"}` }  onClick={()=>{setDeliverMode("needs_pickup")}}>
                        <p className="choosedelivery-travel-path">🤝</p>
                        <div  className="choosedeliver-text-card">
                            <h1 className="travelpath-heading">I need pickup help</h1>
                            <p className="travelpath-paragraph">An NGO volnteer will collect or pickup you</p>
                        </div>
                 </div>

                 <button type="button" className="choosedelivery-button" onClick={onConfirmrequest}>
                    Confirm & Continue
                 </button>

            </div>

        </div>
    )
}

export default ChooseDelivery