
import Header from "../../components/Header"
import DonorTimeline from"../../components/DonorTimeline"
import Livemapping from "../../components/Livemapping"
import './index.css'

const TrackingNgo =()=>{
    return(
       <div className="trackingpickup-container">
    <Header/>
    <div className="trackingpickup-main-container">
        <div className="trackingpickup-headding-card">
            <h1 className="trackingpickup-heading">NGO volunteer on the way</h1>
            <p className="trackingpickup-matched-time">ETA 2 min to collect</p>
        </div>

        <div className="trackingpickup-donor-container">
            <div className="trackingpickup-donor-profile-card">
                <p className="trackingpickup-donor-profile-letters">PK</p>
            </div>
            <h1 className="trackingpickup-donor-name">Sanjay.k . NGO volunteer</h1>
        </div>
        <Livemapping/>
        <DonorTimeline/>
        
    </div>
</div>
    )
}

export default TrackingNgo