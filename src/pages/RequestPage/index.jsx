import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import Header from '../../components/Header'
import { MdOutlineBloodtype } from "react-icons/md";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Loader from '../../components/Loader'

import './index.css'


const RequestPage =()=>{
    const[resource,setResource]=useState('')
    const[bloodgroup,setBloodgroup]=useState('')
    const[units,setUnits]=useState('')
    const[cylindersize,setCylindersize]=useState('')
    const[quantity,setQuantity]=useState('')
    const[medicine,setMedicine]=useState('')
    const[pickup,setPickup]=useState('')
    const[destination,setDestination]=useState('')
    const[urgency,setUrgency]=useState('')
    const[lat,setLat]=useState('')
    const[lon,setLon]=useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const[loader,setLoader]=useEffect(false)

    delete L.Icon.Default.prototype._getIconUrl //This code pasted from AI
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })



    const categories = [
        {
            name: "Blood",
            icon: "🩸",
            value:"blood"
        },
         {
            name: "Oxygen",
            icon: "💨",
            value:"oxygen"
        },
         {
            name: "Medicine",
            icon: "💊",
            value:"medicine",
        },
         {
            name: "Ambulance",
            icon: "🚑",
            value:"ambulance"
        },
    ]

    const LocationPicker = ({ onPick }) => {  //This code pasted from AI
    useMapEvents({
        click(e) {
            onPick(e.latlng.lat, e.latlng.lng)
        }
    })
    return null

   
}

 const jwt = Cookies.get("jwt_token")

 
  

    useEffect(() => {

        const getLocation = () => {   //This code pasted from AI
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude)
                setLon(position.coords.longitude)
            },
            (error) => {
                console.log("Could not get location:", error.message)
            }
        )
    }

        getLocation()
    }, [])

    const onSendRequest= async()=>{

        setLoader(true)

        const requestdetails = {
            resource,
            bloodGroup: bloodgroup,
            unitsNeeded: units,
            cylinderSize: cylindersize,
            quantity,
            medicineName: medicine,
            pickupLocation: pickup,
            destination,
            urgencylevel: urgency,
            lat,
            lon
        }

        const url = "https://rapidaid-back.onrender.com/req/createrequest"
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${jwt}`
            },
            body:JSON.stringify(requestdetails)
        }

        const response = await fetch(url,options)
        const data = await response.json()
        if (response.ok) {
            navigate(`/request-livetrack/${data.request._id}`)
            setLoader(false)
        }


    }

 const onAutoFill = async () => {  //This code pasted from AI
    const jwt = Cookies.get("jwt_token")

    const url = "https://rapidaid-back.onrender.com/ai/parse-request"
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify({ description })
    }

    try {
        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok) {
            setResource(data.resourceType)
            if (data.bloodGroup) setBloodgroup(data.bloodGroup)
            if (data.unitsNeeded) setUnits(data.unitsNeeded)
            if (data.cylinderSize) setCylindersize(data.cylinderSize)
            if (data.quantity) setQuantity(data.quantity)
            if (data.medicineName) setMedicine(data.medicineName)
            if (data.pickupLocation) setPickup(data.pickupLocation)
            if (data.destination) setDestination(data.destination)
            if (data.urgencyLevel) setUrgency(data.urgencyLevel)
        } else {
            console.log("Failed:", data.message)
        }

    } catch (error) {
        console.log("Something went wrong:", error.message)
    }
}

return(
    
    <div className="request-page-container">
        <Header  subtitles={"Ask someone what you need"}/>
       
        <div className='request-page-main-container'>

        {loader ? <Loader/>:<>    <div className="request-page-input-card">
            <label className="request-page-input-label">Describe your emergency (AI-powered)</label>
            <textarea
                value={description}
                className="request-page-input"
                placeholder="e.g. My mother needs 2 units of O negative blood urgently at City Care Hospital"
                onChange={(e) => { setDescription(e.target.value) }}
                />
                <button type="button" className="request-page-button" onClick={onAutoFill}>
                    ✨ Auto-fill with AI
                </button>
        </div>
           
             <ul className='request-page-category-container' >
                {categories.map((each,index)=>(
                <li  key={index}>
                    
                    <button type='button' className={`request-page-category-button ${resource === each.value && "request-page-category-button-selected"}`} onClick={()=>{setResource(each.value)}} >
                                <p className="categoryIcon">{each.icon}</p> 
                                <h1 className="request-page-category-name" >{each.name}</h1>
                    </button>
                </li>
                    ))}
            </ul>
           
            {resource === "blood" && (
                <>
                    <div className="request-page-input-card">
                        <label className="request-page-input-label">Blood Group</label>
                        <input type="text" value={bloodgroup} className="request-page-input" placeholder="e.g. O Negative" onChange={(e) => { setBloodgroup(e.target.value) }} />
                    </div>
                    <div className="request-page-input-card">
                        <label className="request-page-input-label">Units Needed</label>
                        <input type="number" value={units} className="request-page-input" placeholder="e.g. 2" onChange={(e) => { setUnits(e.target.value) }} />
                    </div>
                </>
            )}

            {resource === "oxygen" && (
                <>
                    <div className="request-page-input-card">
                        <label className="request-page-input-label">Cylinder Size</label>
                        <input type="text" value={cylindersize} className="request-page-input" placeholder="e.g. Type D" onChange={(e) => { setCylindersize(e.target.value) }} />
                    </div>
                    <div className="request-page-input-card">
                        <label className="request-page-input-label">Quantity</label>
                        <input type="number" value={quantity} className="request-page-input" placeholder="e.g. 1" onChange={(e) => { setQuantity(e.target.value) }} />
                    </div>
                </>
            )}

            {resource === "medicine" && (
                <div className="request-page-input-card">
                    <label className="request-page-input-label">Medicine Name</label>
                    <input type="text" value={medicine} className="request-page-input" placeholder="e.g. Insulin" onChange={(e) => { setMedicine(e.target.value) }} />
                </div>
            )}

            {resource === "ambulance" && (
                <>
                    <div className="request-page-input-card">
                        <label className="request-page-input-label">Pickup Location</label>
                        <input type="text" value={pickup} className="request-page-input" placeholder="Enter pickup point" onChange={(e) => { setPickup(e.target.value) }} />
                    </div>
                    <div className="request-page-input-card">
                        <label className="request-page-input-label">Destination</label>
                        <input type="text" value={destination} className="request-page-input" placeholder="Enter destination" onChange={(e) => { setDestination(e.target.value) }} />
                    </div>
                </>
            )}


            <div className="request-page-urgency">
                <h1 className="request-page-urgency-heading">URGENCY</h1>
            <ul className="request-page-urgency-container">
                    <li >
                        <button type="button"  className={`request-page-urgency-button ${urgency === "critical" && "request-page-urgency-button-selected"}`} onClick={()=>{setUrgency("critical")}}>
                            <p className="request-page-urgency-select">Critical</p>
                        </button>
                    </li>
                    <li >
                        <button type="button"  className={`request-page-urgency-button ${urgency === "high" && "request-page-urgency-button-selected"}`} onClick={()=>{setUrgency("high")}} >
                            <p className="request-page-urgency-select" >High</p>
                        </button>
                    </li>
                    <li  >
                        <button type="button"  className={`request-page-urgency-button ${urgency === "medium" && "request-page-urgency-button-selected"}`} onClick={()=>{setUrgency("medium")}}>
                            <p className="request-page-urgency-select" >Medium</p>
                        </button>
                    </li>
            </ul>
            </div>
            
            <div className="request-page-input-card">  
                    <label className="request-page-input-label">Location (tap map to change)</label>  

                    {lat && lon ? (
                        <>
                            <MapContainer // this was pasted from AI
                                center={[lat, lon]}
                                zoom={14}
                                style={{ height: '200px', width: '100%', borderRadius: '12px' }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; OpenStreetMap contributors'
                                />
                                <Marker position={[lat, lon]} />
                                <LocationPicker onPick={(newLat, newLon) => { setLat(newLat); setLon(newLon) }} />
                            </MapContainer>

                            <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px' }}>
                                📍 {lat.toFixed(4)}, {lon.toFixed(4)}
                            </p>
                        </>
                    ) : (
                        <p>Fetching your location...</p>
                    )}
            </div>

        <div className="request-page-button-card">
                    <button type="button" className="request-page-button" onClick={onSendRequest}>
                        Send Alert To Nearby Donors
                    </button>
        </div></>}
        
        
    </div>
    </div>
)

}


export default RequestPage