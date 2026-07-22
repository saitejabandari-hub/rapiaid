import { useState } from 'react'
import './index.css'

const Timeline=({request})=>{
    
     if (!request) {
        return <p>Loading timeline...</p>
    }

    
    return(
        <div className="livetracking-time-line-container">
                    <div className="livetracking-dot-card">
                        <div className={request.status ==="open" || request.status === "matched" || request.status === "ngo_assigned" || request.status === "picked_up" || request.status === "devlivered" ? "dot-card dot-completed":"dot-card"}></div>
                        <p className="time-line-name">Request raised</p>
                    </div>
                    <div className= {request.status === "matched" || request.status === "ngo_assigned" || request.status === "picked_up" || request.status === "devlivered" ? "livetracking-line-card line-completed":"livetracking-line-card"}>
                        <p className="livetracking-line-time"></p>
                    </div>
                     <div className="livetracking-dot-card">
                        <div className={request.status === "matched" || request.status === "ngo_assigned" || request.status === "picked_up" || request.status === "devlivered" ? "dot-card dot-completed":"dot-card"}></div>
                        <p className="time-line-name ">Donor matched & accepted</p>
                    </div>
                    <div className={request.status === "ngo_assigned" || request.status === "picked_up" || request.status === "devlivered" ? "livetracking-line-card line-completed":"livetracking-line-card"}>
                        <p className="livetracking-line-time"></p>
                    </div>
                     <div className="livetracking-dot-card">
                        <div className={request.status === "ngo_assigned" || request.status === "picked_up" || request.status === "devlivered" ? "dot-card dot-completed":"dot-card"}></div>
                        <p className="time-line-name">NGO Volunteer assigned</p>
                    </div>
                    <div className={request.status === "picked_up" || request.status === "devlivered" ? "livetracking-line-card line-completed":"livetracking-line-card"}>
                        <p className="livetracking-line-time"></p>
                    </div>
                     <div className="livetracking-dot-card">
                        <div className={request.status === "picked_up" || request.status === "devlivered" ? "dot-card dot-completed":"dot-card"}></div>
                        <p className="time-line-name">Picked up</p>
                    </div>
                    <div className={request.status === "devlivered" ? "livetracking-line-card line-completed":"livetracking-line-card"}>
                        <p className="livetracking-line-time">{}</p>
                    </div>
                     <div className="livetracking-dot-card">
                        <div className={request.status === "devlivered" ? "dot-card dot-completed":"dot-card"}></div>
                        <p className="time-line-name">Delivered</p>
                    </div>
                    <div className="livetracking-line-end-card">
                        <p className="livetracking-line-time"></p>
                    </div>
                </div>

    )
}

export default Timeline