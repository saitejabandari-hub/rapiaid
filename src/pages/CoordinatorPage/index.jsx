import Header from "../../components/Header"
import { GoArrowRight } from "react-icons/go";

import './index.css'
const CoordinatorPage =() =>{
    return(
        <div className="coordinator-Container">
            <Header/>
            <div className="coordinator-Main-Container">
                <ul className="coordinator-assigned-pickup-container">

                    <li className="coordinator-assigned-pickup-card">
                        <div className="coordinator-category-card">
                            <div className="coordinator-category-details-card">
                                <p className="coordinator-category-name" >Blood</p>
                            </div>
                            <p className="coordinator-estimation-time">ETA 12 min</p>
                        </div>
                        <div className="coordinator-details-card">
                        <div className="coordinator-details-section">
                            <h1 className="coordinator-details-heading"> Donor</h1>
                           
                            <p className="coordinator-details-name">Surender</p>
                        </div> 
                        <div className="coordinator-details-section">
                            <h1 className="coordinator-details-heading">Requested</h1>
                           
                            <p className="coordinator-details-name">Ankitha</p>
                        </div>

                        </div>
                        <div className="coordinator-action-card">
                            <div className="updating-card">
                                <hr className="horizontalline"/>
                                <p className="updated-name">Assigned</p>
                            </div>
                            <div className="updating-card">
                                <hr className="horizontalline"/>
                                <p  className="updated-name">picked up</p>
                            </div>
                            <div className="updating-card">
                                <hr className="horizontalline"/>
                                <p  className="updated-name">deliverd</p>
                            </div>
                        </div>
                    </li>

                    <li className="coordinator-assigned-pickup-card">
                        <div className="coordinator-category-card">
                            <div className="coordinator-category-details-card">
                                <p className="coordinator-category-name" >Blood</p>
                            </div>
                            <p className="coordinator-estimation-time">ETA 12 min</p>
                        </div>
                        <div className="coordinator-details-card">
                        <div className="coordinator-details-section">
                            <h1 className="coordinator-details-heading"> Donor</h1>
                           
                            <p className="coordinator-details-name">Surender</p>
                        </div> 
                        <div className="coordinator-details-section">
                            <h1 className="coordinator-details-heading">Requested</h1>
                           
                            <p className="coordinator-details-name">Ankitha</p>
                        </div>

                        </div>
                        <div className="coordinator-action-card">
                            <div className="updating-card">
                                <hr className="horizontalline"/>
                                <p className="updated-name">Assigned</p>
                            </div>
                            <div className="updating-card">
                                <hr className="horizontalline"/>
                                <p  className="updated-name">picked up</p>
                            </div>
                            <div className="updating-card">
                                <hr className="horizontalline"/>
                                <p  className="updated-name">deliverd</p>
                            </div>
                        </div>
                    </li>

                    <li className="coordinator-assigned-pickup-card">
                        <div className="coordinator-category-card">
                            <div className="coordinator-category-details-card">
                                <p className="coordinator-category-name" >Blood</p>
                            </div>
                            <p className="coordinator-estimation-time">ETA 12 min</p>
                        </div>
                        <div className="coordinator-details-card">
                        <div className="coordinator-details-section">
                            <h1 className="coordinator-details-heading"> Donor</h1>
                           
                            <p className="coordinator-details-name">Surender</p>
                        </div> 
                        <div className="coordinator-details-section">
                            <h1 className="coordinator-details-heading">Requested</h1>
                           
                            <p className="coordinator-details-name">Ankitha</p>
                        </div>

                        </div>
                        <div className="coordinator-action-card">
                            <div className="updating-card">
                                <hr className="horizontalline"/>
                                <p className="updated-name">Assigned</p>
                            </div>
                            <div className="updating-card">
                                <hr className="horizontalline"/>
                                <p  className="updated-name">picked up</p>
                            </div>
                            <div className="updating-card">
                                <hr className="horizontalline"/>
                                <p  className="updated-name">deliverd</p>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
    )
    
}

export default CoordinatorPage