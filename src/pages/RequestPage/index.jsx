import Header from '../../components/Header'
import { MdOutlineBloodtype } from "react-icons/md";
import './index.css'

const RequestPage =()=>{

    const categories = [
        {
            name: "Blood",
            icon: "🩸"
        },
         {
            name: "Oxygen",
            icon: "💨"
        },
         {
            name: "Medicien",
            icon: "💊"
        },
         {
            name: "Ambuleance",
            icon: "🚑"
        },
    ]

    const situations = [
        {
            name:"Critical",
            value:"CRITICAL"
        },
          {
            name:"High",
            value:"HIGH"
        },
          {
            name:"Medium",
            value:"Medium"
        },

    ]

return(
    
    <div className="request-page-container">
        <Header/>
       
        <div className='request-page-main-container'>
           
             <ul className='request-page-category-container' >
                {categories.map((each,index)=>(
                <li className='request-page-category-card'  key={index}>
                    
                     <p className="categoryIcon">{each.icon}</p> 
                      <h1 className="request-page-category-name" >{each.name}</h1>
                </li>
                    ))}
            </ul>
            <div className="request-page-input-card">
                <label className="request-page-input-label">Group of blood</label>
                <input type="text" value="" className="request-page-input" placeholder="Enter blood groop and unites " />

            </div>
            <div className="request-page-urgency">
                <h1 className="request-page-urgency-heading">URGENCY</h1>
            <ul className="request-page-urgency-container">
                    <li className="request-page-urgency-card" >
                        <p className="request-page-urgency-select">Critical</p>
                    </li>
                    <li className="request-page-urgency-card" >
                        <p className="request-page-urgency-select">High</p>
                    </li>
                    <li className="request-page-urgency-card" >
                        <p className="request-page-urgency-select">Medium</p>
                    </li>
            </ul>
            </div>
            
             <div className="request-page-input-card">
                <label className="request-page-input-label">Location</label>
                <input type="text" value="" className="request-page-input" placeholder="Enter location"/>

           
        </div>

        <div className="request-page-button-card">
                    <button type="button" className="request-page-button">
                        Send Alert To Nearby Donors
                    </button>
        </div>
        
    </div>
    </div>
)

}


export default RequestPage