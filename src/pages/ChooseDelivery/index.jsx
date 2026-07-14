import Header from "../../components/Header";

import "./index.css"
const ChooseDelivery =()=>{
    return(
        <div className="choosedelivery-container">
            <Header/>
            <div className="choosedelivery-main-card">
                 <div className="choosedelivery-accepted-card">
                    <h1 className="choosedelivery-accepted-name">Request</h1>
                    <p className="choosedelivery-accepted-para">O Neg . 2 units</p>
                 </div>
                 <div className="choosedelivery-accepted-card">
                    <h1 className="choosedelivery-accepted-name">Requester Distance</h1>
                    <p className="choosedelivery-accepted-para">1.8 km away</p>
                 </div>

                 <div className="choosedelivery-choosetravel-card">
                        <p className="choosedelivery-travel-path">🚶</p>
                        <div className="choosedeliver-text-card">
                            <h1 className="travelpath-heading">I'll deliver it myself</h1>
                            <p className="travelpath-paragraph">You're nearby hand it over directly</p>
                        </div>
                 </div>

                  <div className="choosedelivery-choosetravel-card choosedelivery-choosetravel-card-selected ">
                        <p className="choosedelivery-travel-path">🤝</p>
                        <div  className="choosedeliver-text-card">
                            <h1 className="travelpath-heading">I need pickup help</h1>
                            <p className="travelpath-paragraph">An NGO volnteer will collect or pickup you</p>
                        </div>
                 </div>

                 <button type="button" className="choosedelivery-button">
                    Confirm & Continue
                 </button>

            </div>

        </div>
    )
}

export default ChooseDelivery