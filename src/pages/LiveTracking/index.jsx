import Header from "../../components/Header"
import Timeline from"../../components/Timeline"

import './index.css'

const LiveTracking =()=>{
    return(
        <div className="livetracking-container">
            <Header/>
            <div className="livetracking-main-container">
                <div className="livetracking-headding-card">
                    <h1 className="livetracking-heading">Donor on the way</h1>
                    <p className="livetracking-matched-time">Matched in 2 min 40 sec</p>
                </div>

                <div className="livetracking-donor-container">
                    <div className="livetracking-donor-profile-card">
                        <p className="livetracking-donor-profile-letters">PK</p>
                    </div>
                    <h1 className="livetracking-donor-name">Ravikumar . O Negative</h1>
                </div>
                
                <Timeline/>
                
            </div>
        </div>
    )
}

export default LiveTracking