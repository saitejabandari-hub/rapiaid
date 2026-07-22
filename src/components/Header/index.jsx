import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import './index.css'
const Header=({subtitles})=>{

    const navigate = useNavigate()

    const onLogout = () =>{
        Cookies.remove("jwt_token")
        navigate("/login")
    }

    return(
         <nav className='page-heading-card'>
            <div className='page-heading-cart'>
                <h1 className='page-heading'>Rapid<span className='sub-heading'>Aid</span> </h1>
            <p className='page-heading-paragraph'>{subtitles}</p>
            </div>
            <button type="button" className='logout-button'  onClick={onLogout}  >
                Logout
            </button>
        </nav>
    )

}

export default Header