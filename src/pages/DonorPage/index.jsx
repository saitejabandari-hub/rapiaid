import Header from '../../components/Header'
import { FcAlarmClock } from "react-icons/fc";

import './index.css'
const DonorPage=()=>{

    return(
        <div className='donor-page-container'>
            <Header/>
            <div className='donor-page-main-container'>
                 <div className='alert-container'>
                    <h1 className='alter-card-heading'>CRITICAL . BLOOD REQUEST</h1>
                    <h1 className='alert-required-items'>O NEGAVTIVE NEEDED, 2 UNITS</h1>
                    <div className='alert-with-intime'>
                            <FcAlarmClock className='donor-page-clock'/>
                            <p className='alert-time'>Respond with in 04:28</p>
                    </div>
                 </div>

                 <ul className='details-container'>
                        <li className='details-card'>
                            <h1 className='details-heading'>Distance</h1>
                            <p className='details-paragraph'>1.8km away</p>
                        </li>
                        <li className='details-card'>
                            <h1 className='details-heading'>Requested by</h1>
                            <p className='details-paragraph'>Anitha.k</p>
                        </li>
                        <li className='details-card'>
                            <h1 className='details-heading'>Hospital</h1>
                            <p className='details-paragraph'>city care, uppal</p>
                        </li>
                        <li className='details-card'>
                            <h1 className='details-heading'>Your last donation</h1>
                            <p className='details-paragraph'>112 days ago</p>
                        </li>
                 </ul>

                 <div className='donor-page-button-card'>
                    <button type='button' className='decline-button'>
                        Decline
                    </button>
                    <button type='button' className='help-button'>
                        I can help
                    </button>
                 </div>
            </div>
        </div>
    )

}

export default DonorPage