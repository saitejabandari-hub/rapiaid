import { useState,useEffect } from 'react';
import Cookies from "js-cookie"
import Header from '../../components/Header'
import { MdOutlineBloodtype } from "react-icons/md";
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

    const jwt = Cookies.get("jwt_token")

    useEffect(() => {

        const getLocation = () => {
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

        const url = "http://localhost:5000/req/createrequest"
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
        if(response.ok){
            console.log(data.message)
        }


    }

return(
    
    <div className="request-page-container">
        <Header/>
       
        <div className='request-page-main-container'>
           
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
                <label className="request-page-input-label">Location</label>
                <input type="text" 
                value={lat && lon ? `📍 Location captured (${lat.toFixed(4)}, ${lon.toFixed(4)})` : "Fetching your location..."}
                className="request-page-input" placeholder="Enter location" readOnly/>

           
        </div>

        <div className="request-page-button-card">
                    <button type="button" className="request-page-button" onClick={onSendRequest}>
                        Send Alert To Nearby Donors
                    </button>
        </div>
        
    </div>
    </div>
)

}


export default RequestPage