import { useState,useEffect } from 'react';
import Cookies from 'js-cookie'
import Header from '../../components/Header'
import { FcAlarmClock } from "react-icons/fc";

import './index.css'
const DonorPage=()=>{
    const[alterts,setAlerts]=useState([])

    const jwt = Cookies.get("jwt_token")


    useEffect(()=>{

        const getmyalert = async()=>{

            const url = "http://localhost:5000/match/get-alert"
            const options = {
                method:"GET",
                headers :{
                    "Content-Type":"application",
                    Authorization:`Bearer ${jwt}`
                }
            }

            const response = await fetch(url,options)
            const data = await response.json()
            if(response.ok){
                const altersmessage = data.allalerts.map(each =>(
                    {
                        bloodgroup: each.details.bloodGroup,
                        unitsneeded: each.details.unitsNeeded,
                        lat: each.location.lat,
                        log: each.location.lon,
                        resource: each.resourceType,
                        urgency: each.urgencyLevel,
                        requestername: each.requesterId.name,
                        requesternumber: each.requesterId.phone
                    }
                ))

                setAlerts(altersmessage)
                
            }

        }

        getmyalert()

    },[])


    return(
        <div className='donor-page-container'>
            <Header/>
            <div className='donor-page-main-container' >
            {alterts.map((each,index)=>(
                <div key={index}>
                 <div className='alert-container'>
                    <h1 className='alter-card-heading'>{each.urgency} . {each.resource} REQUEST</h1>
                    <h1 className='alert-required-items'>{each.bloodgroup}, {each.unitsneeded} UNITS</h1>
                    <div className='alert-with-intime'>
                            <FcAlarmClock className='donor-page-clock'/>
                            <p className='alert-time'>Respond with in 04:28</p>
                    </div>
                 </div>

                 <ul className='details-container'>
                        <li className='details-card'>
                            <h1 className='details-heading'>Distance</h1>
                            <p className='details-paragraph'>1.8km away</p>
                        </li>
                        <li className='details-card'>
                            <h1 className='details-heading'>Requested by</h1>
                            <p className='details-paragraph'>{each.requestername}</p>
                        </li>
                        <li className='details-card'>
                            <h1 className='details-heading'>Hospital</h1>
                            <p className='details-paragraph'>city care, uppal</p>
                        </li>
                        <li className='details-card'>
                            <h1 className='details-heading'>Your last donation</h1>
                            <p className='details-paragraph'>112 days ago</p>
                        </li>
                 </ul>

                 <div className='donor-page-button-card'>
                    <button type='button' className='decline-button'>
                        Decline
                    </button>
                    <button type='button' className='help-button'>
                        I can help
                    </button>
                 </div>
            </div>
            ))}
            </div>
        </div>
    )

}

export default DonorPage