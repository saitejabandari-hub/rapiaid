import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header"
import { GoArrowRight } from "react-icons/go";
import Cookies from "js-cookie"
import Loader from '../../components/Loader'

import './index.css'
const CoordinatorPage =() =>{
    const[ assignment, setAssignment]=useState([])
    const[loader,setLoader]=useState(false)

    const jwt = Cookies.get("jwt_token")

    useEffect(()=>{
        setLoader(true)
        const getassignments = async()=>{
            const url = "https://rapidaid-back.onrender.com/ngo/my-assignments"

            const options = {
                method: "GET",
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            }

            const response = await fetch(url,options)
            const data  = await response.json()
            if(response.ok){
                setAssignment(data.combained)
                setLoader(false)
            }

           
        }

        getassignments()

        const callApi = setInterval(()=>{
            getassignments()
            
        },5000)

        return ()=>{
            clearInterval(callApi)
        }

    },[jwt])

    

    return(
        <div className="coordinator-Container">
            <Header  subtitles={"Somebody want's you to deliver product"} />
            <div className="coordinator-Main-Container">
                {loader ? <Loader/>:<><ul className="coordinator-assigned-pickup-container">

                    {assignment.map((each,index)=>(
                        <li key={index}>
                        <Link to={`/donor-request/${each.assignmentId}`} className="coordinator-assigned-pickup-card">
                        <div className="coordinator-category-card">
                            <div className="coordinator-category-details-card">
                                <p className="coordinator-category-name" >{each.resourceType}</p>
                            </div>
                            <p className="coordinator-estimation-time">ETA 12 min</p>
                        </div>
                        <div className="coordinator-details-card">
                        <div className="coordinator-details-section">
                            <h1 className="coordinator-details-heading"> Donor</h1>
                           
                            <p className="coordinator-details-name">{each.donorName}</p>
                        </div> 
                        <div className="coordinator-details-section">
                            <h1 className="coordinator-details-heading">Requested</h1>
                           
                            <p className="coordinator-details-name">{each.requesterName}</p>
                        </div>

                        </div>
                        <div className="coordinator-action-card">
                            <div className="updating-card">
                                <hr className={each.status=== "assigned" || each.status==="picked_up" || each.status==="delivered" ?  "horizontalline" :  "horizontalline-incompleted" }/>
                                <p className="updated-name">Assigned</p>
                            </div>
                            <div className="updating-card">
                                <hr className={each.status=== "picked_up" || each.status==="delivered" ?  "horizontalline" :  "horizontalline-incompleted"}/>
                                <p  className="updated-name">picked up</p>
                            </div>
                            <div className="updating-card">
                                <hr className={each.status=== "delivered" ? "horizontalline" :  "horizontalline-incompleted" }/>
                                <p  className="updated-name">deliverd</p>
                            </div>
                        </div>
                        </Link>
                    </li>
                    ))}                      

                </ul></>}
            </div>
        </div>
    )
    
}

export default CoordinatorPage