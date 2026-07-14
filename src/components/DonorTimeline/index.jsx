

import './index.css'

const DonorTimeline=()=>{
    return(
      <div className="trackingpickup-time-line-container">
                    <div className="trackingpickup-dot-card">
                        <div className="dot-card dot-completed"></div>
                        <p className="time-line-name">You accepted request</p>
                    </div>
                    <div className="trackingpickup-line-card line-completed">
                        <p className="trackingpickup-line-time">7:02 pm</p>
                    </div>
                     <div className="trackingpickup-dot-card ">
                        <div className="dot-card dot-progress "></div>
                        <p className="time-line-name ">Vlounteer headding to you</p>
                    </div>
                    <div className="trackingpickup-line-card line-progress">
                        <p className="trackingpickup-line-time">progress</p>
                    </div>
                     <div className="trackingpickup-dot-card">
                        <div className="dot-card"></div>
                        <p className="time-line-name">Reached</p>
                    </div>
                    <div className="trackingpickup-line-end-card">
                        <p className="trackingpickup-line-time">pending</p>
                    </div>
                </div>

    )
}

export default DonorTimeline