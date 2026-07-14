
import './index.css'

const Timeline=()=>{
    return(
        <div className="livetracking-time-line-container">
                    <div className="livetracking-dot-card">
                        <div className="dot-card dot-completed"></div>
                        <p className="time-line-name">Request raised</p>
                    </div>
                    <div className="livetracking-line-card line-completed">
                        <p className="livetracking-line-time">7:02 pm</p>
                    </div>
                     <div className="livetracking-dot-card">
                        <div className="dot-card dot-completed"></div>
                        <p className="time-line-name ">Donor matched & accepted</p>
                    </div>
                    <div className="livetracking-line-card line-completed">
                        <p className="livetracking-line-time">7:04 pm</p>
                    </div>
                     <div className="livetracking-dot-card">
                        <div className="dot-card dot-completed"></div>
                        <p className="time-line-name">NGO Volunteer assigned</p>
                    </div>
                    <div className="livetracking-line-card line-completed">
                        <p className="livetracking-line-time">7:06 pm</p>
                    </div>
                     <div className="livetracking-dot-card">
                        <div className="dot-card"></div>
                        <p className="time-line-name">Picked up</p>
                    </div>
                    <div className="livetracking-line-card">
                        <p className="livetracking-line-time">In progress</p>
                    </div>
                     <div className="livetracking-dot-card">
                        <div className="dot-card"></div>
                        <p className="time-line-name">Delivered</p>
                    </div>
                    <div className="livetracking-line-end-card">
                        <p className="livetracking-line-time">pending</p>
                    </div>
                </div>

    )
}

export default Timeline