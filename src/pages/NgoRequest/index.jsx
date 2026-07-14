import Header from "../../components/Header"

import './index.css'
const NgoRequest =()=>{
    return(
        <div className="NgoRequest-container">
            <Header/>
            <div className="NgoRequest-main-container">
                <div className="NgoRequest-details-card">
                    <div className="NgoRequest-category-pickup-card">
                        <p className="NgoRequest-category">Blood . O Neg . 2 units</p>
                        <p className="NgoRequest-category-situation">Critical</p>
                    </div>
                    <div className="NgoRequest-delivery-details-card">
                            <div className="NgoRequest-delivery-details">
                                <h1 className="NgoRequest-heading">Donor</h1>
                                <p className="NgoRequest-name">Surender</p>
                            </div>
                            <div className="NgoRequest-delivery-details">
                                <h1 className="NgoRequest-heading">Hospital</h1>
                                <p className="NgoRequest-name">City care, uppal</p>
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
                             <h1 className="NgoRequest-heading">Donor</h1>
                                <p className="NgoRequest-name">Surender . O Neg</p>
                        </div>
                        <div className="NgoRequest-innercard">
                             <h1 className="NgoRequest-heading">Requester</h1>
                                <p className="NgoRequest-name">Ankitha.k</p>
                        </div>
                        <div className="NgoRequest-innercard">
                             <h1 className="NgoRequest-heading">Delivery mode</h1>
                                <p className="NgoRequest-name">needs to pick</p>
                        </div>
                    </div>

                    <button type="button" className="NgoRequest-button">
                        Marks as picked up
                    </button>

                </div>
            </div>
        </div>
    )
}

export default NgoRequest