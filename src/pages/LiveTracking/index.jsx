import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"
import Header from "../../components/Header"
import Timeline from"../../components/Timeline"
import RouteMap from "../../components/RouteMap"
import Loader from '../../components/Loader'

import './index.css'

const LiveTracking =()=>{
    const [ngoStatus, setNgoStatus] = useState(null)
    const [donor,setDonor]=useState(null)
    const [request,setRequest]=useState(null)
    const[loader,setLoader]=useEffect(false)
    
    const {requestId} = useParams()

    const jwt = Cookies.get("jwt_token")

    useEffect(()=>{

        
        const getstatus = async()=>{
            setLoader(true)
            const url= `https://rapidaid-back.onrender.com/req/getstatus/${requestId}`

            const options={
                method:"GET",
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            }

            const response = await fetch(url,options)
        
            if(response.ok){
                const data = await response.json()
                
                setNgoStatus(data.ngoStatus)
                setDonor(data.acceptedDonor)
                setRequest(data.request)
                setLoader(false)
            }


        }

        getstatus()
        

    },[])


    return(
        <div className="livetracking-container">
            <Header  subtitles={"Ask your request"} />
            <div className="livetracking-main-container">
                {loader?<Loader/>:<>{donor ? <><div className="livetracking-headding-card">
                    <h1 className="livetracking-heading">Donor on the way</h1>
                    <p className="livetracking-matched-time">Matched in 2 min 40 sec</p>
                </div>

                <div className="livetracking-donor-container">
                    <div className="livetracking-donor-profile-card">
                        <p className="livetracking-donor-profile-letters">{donor.name.split(" ").map(n => n[0]).join("")}</p>
                    </div>
                    <h1 className="livetracking-donor-name">{donor.name}</h1>
                </div>
                {donor.lat && request?.location && (
                <RouteMap
                donorLat={donor.lat}
                donorLon={donor.lon}
                requesterLat={request.location.lat}
                requesterLon={request.location.lon}
                    />
                )}

                </> : <p className="livetracking-donor-profile-letters">waiting for donor</p>}

                <Timeline request={request}/></>}
                
            </div>
        </div>
    )
}

export default LiveTracking