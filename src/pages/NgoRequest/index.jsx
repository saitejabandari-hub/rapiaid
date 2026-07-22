import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import Cookies from "js-cookie"
import RouteMap from '../../components/RouteMap'

import './index.css'
const NgoRequest =()=>{
    const[myassignment,setMyassignment]=useState(null)
    const[deliverstatus,setDeliverstatus]=useState('')
    const{assignmentId} = useParams()

    const jwt = Cookies.get("jwt_token")

    useEffect(()=>{

        const getmyassignments = async()=>{
            try{

                const url = "https://rapidaid-back.onrender.com/ngo/my-assignments"

                const options = {
                    method: "GET",
                    headers:{
                        Authorization:`Bearer ${jwt}`
                    }
                }

                const response = await fetch(url,options)
                const data  = await response.json()
            if (response.ok) {
                const thisone = data.combained.find(
                    (each) => each.assignmentId === assignmentId
                )
                setMyassignment(thisone)
            }

            }catch(error){
                console.log(error.message)
            }


        }

        getmyassignments()

    },[])

    const onClickPicked = async (value) =>{

       try{


            const url =`https://rapidaid-back.onrender.com/ngo/update-status/${assignmentId}`
            const options = {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${jwt}`
                },
                body: JSON.stringify({status:value})
            }

            const response = await fetch(url,options)
            const data = await response.json()

            if(response.ok){
                setDeliverstatus(value)
                setMyassignment({ ...myassignment, status: value })
                console.log(data.message)
            }

       }catch(error){
        console.log(error.message)
       }
    }


    return(
        <div className="NgoRequest-container">
            <Header  subtitles={"your assigned assiments"} />
            <div className="NgoRequest-main-container">
                {myassignment && <div className="NgoRequest-details-card">
                    <div className="NgoRequest-category-pickup-card">
                        <p className="NgoRequest-category">{myassignment.resourceType} · {myassignment.details.bloodGroup} · {myassignment.details.unitsNeeded} units</p>
                        <p className="NgoRequest-category-situation">{myassignment.urgencyLevel}</p>
                    </div>
                    <div className="NgoRequest-delivery-details-card">
                            <div className="NgoRequest-delivery-details">
                                <h1 className="NgoRequest-heading">Donor</h1>
                                <p className="NgoRequest-name">{myassignment.donorName}</p>
                            </div>
                            <div className="NgoRequest-delivery-details">
                                <h1 className="NgoRequest-heading">Number</h1>
                                <p className="NgoRequest-name">{myassignment.donorPhone}</p>
                            </div>
                    </div>
                    <div className="NgoRequest-distance">
                            <div className="NgoRequest-delivery-details">
                                <h1 className="NgoRequest-distance-heading">Donor to hospital </h1>
                                <p className="NgoRequest-name">3.3 km</p>
                            </div>
                    </div>
                    <div className="NgoRequest-second-container">
                        
                        <div className="NgoRequest-innercard">
                             <h1 className="NgoRequest-heading">Requester</h1>
                                <p className="NgoRequest-name">{myassignment.requesterName}</p>
                        </div>

                        <div className="NgoRequest-innercard">
                             <h1 className="NgoRequest-heading">Number</h1>
                                <p className="NgoRequest-name">{myassignment.requesterPhone}</p>
                        </div>

                        <div className="NgoRequest-innercard">
                             <h1 className="NgoRequest-heading">Delivery mode</h1>
                                <p className="NgoRequest-name">{myassignment.deliverMode}</p>
                        </div>
                    </div>

                    <RouteMap
                            donorLat={myassignment.donorLat}
                            donorLon={myassignment.donorLon}
                            requesterLat={myassignment.requesterLat}
                            requesterLon={myassignment.requesterLon}
                        />

                    {myassignment.status === "assigned"?<button type="button" className="NgoRequest-button" onClick={()=>{onClickPicked("picked_up")}}>
                        Marks as picked up
                    </button> : myassignment.status === "picked_up"?<button type="button" className="NgoRequest-button" onClick={()=>{onClickPicked('delivered')}}>
                        Marks as delivered
                    </button>:  <p className="NgoRequest-name">Task completed ✅</p>}

                </div>}
            </div>
        </div>
    )
}

export default NgoRequest