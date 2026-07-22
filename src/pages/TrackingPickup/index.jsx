import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import Cookies from 'js-cookie'
import Header from "../../components/Header"
import RouteMap from "../../components/RouteMap"
import Loader from '../../components/Loader'
import './index.css'

const TrackingPickup =()=>{
    const {matchId}=useParams()
    const [matchStatus, setMatchStatus] = useState(null)
    const [ngoInfo, setNgoInfo] = useState(null)
    const [requesterLocation, setRequesterLocation] = useState(null)
    const [myLat, setMyLat] = useState(null)
    const [myLon, setMyLon] = useState(null)
    const[loader,setLoader]=useEffect(false)

    const jwt = Cookies.get("jwt_token")

    

    useEffect(() => {
        const getStatus = async () => {

            setLoader(true)
          
            const url = `https://rapidaid-back.onrender.com/match/status/${matchId}`
            const options = {
                method: "GET",
                headers: { Authorization: `Bearer ${jwt}` },
                cache: "no-store"
            }

            try {
                const response = await fetch(url, options)
                const data = await response.json()

                if (response.ok) {
                    setMatchStatus(data.matchStatus)
                    setNgoInfo(data.ngoInfo)
                    setRequesterLocation(data.requesterLocation)
                    setLoader(false)
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        getStatus()
    }, [])


    useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            setMyLat(position.coords.latitude)
            setMyLon(position.coords.longitude)
        },
        (error) => {
            console.log("Could not get location:", error.message)
            }
        )
    }, [])

    // if (!matchStatus) {
    //     return <p>Loading...</p>
    // }

    return(
       <div className="trackingpickup-container">
    <Header  subtitles={"Tracking you request"}/>
    <div className="trackingpickup-main-container">
       {loader ? <Loader/>:<> {!ngoInfo ? (
                    <div className="trackingpickup-headding-card">
                        <h1 className="trackingpickup-heading">Coordinating pickup...</h1>
                        <p className="trackingpickup-matched-time">An NGO volunteer will be assigned shortly</p>
                    </div>
                ) : (
                    <>
                        <div className="trackingpickup-headding-card">
                            <h1 className="trackingpickup-heading">
                                {ngoInfo.status === "assigned" && "NGO volunteer on the way to you"}
                                {ngoInfo.status === "picked_up" && "Picked up — heading to requester"}
                                {ngoInfo.status === "delivered" && "Delivered! Thank you"}
                            </h1>
                        </div>
        
                        <div className="trackingpickup-donor-container">
                            <div className="trackingpickup-donor-profile-card">
                                <p className="trackingpickup-donor-profile-letters">
                                    {ngoInfo.name.split(" ").map(n => n[0]).join("")}
                                </p>
                            </div>
                            <h1 className="trackingpickup-donor-name">{ngoInfo.name} · NGO volunteer</h1>
                        </div>
                    </>
                )}
            {myLat && requesterLocation && (
            <RouteMap
                donorLat={myLat}
                donorLon={myLon}
                requesterLat={requesterLocation.lat}
                requesterLon={requesterLocation.lon}
            />
        )}</>}
        
    </div>
</div>
    )
}

export default TrackingPickup