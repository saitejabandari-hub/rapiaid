import { useState } from 'react'
import Cookies from "js-cookie"
import Headerforentering from '../../components/Headerforentering'

import './index.css'
const Register = () =>{
    const[name , setName]=useState('')
    const[email, setEmail]=useState('')
    const[phone,setPhone]=useState('')
    const[password,setPassword]=useState('')
    const[role,setRole]=useState('')
    const[bloodgroup,setBloodgroup]=useState('')
    const[resource,setResource]=useState('')



      const categories = [
        {
            name: "Blood",
            icon: "🩸",
            value:"blood"
        },
         {
            name: "Oxygen",
            icon: "💨",
            value:"oxygen"
        },
         {
            name: "Medicine",
            icon: "💊",
            value:"medicine",
        },
         {
            name: "Ambulance",
            icon: "🚑",
            value:"ambulance"
        },
    ]
    const onSubmitRegisteration= async (event)=>{
        event.preventDefault()

        const userdatails = {
            name,
            email,
            phone,
            password,
            role,
            bloodGroup:bloodgroup,
            resourceTypesOffered:[resource],

        }

      try{
            const url = "http://localhost:5000/auth/register"
            const options = {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userdatails)
            }

            const response = await fetch(url,options)
            const data = await response.json()

            if(response.ok){
                Cookies.set("jwt_token",data.token,{expires:30})
                console.log(data.message)
            } else {
                console.log("Registration failed:", data.message)
            }

      }catch(error){
        console.log("something went wrong", error.message)
      }
            

    }

    return(
        <div className='register-container'>
            <Headerforentering/>
            <form className='register-main-container' onSubmit={onSubmitRegisteration}>
                <div className='register-input-container'>
                    <div className='register-input-card'>
                        <label className='register-label'>
                            Name
                        </label>
                        <input type="text" value={name} className='register-input' placeholder='Enter your name' onChange={(e)=>{setName(e.target.value)}} />
                    </div>
                     <div className='register-input-card'>
                        <label className='register-label'>
                            Phone Number
                        </label>
                        <input type="text" value={phone} className='register-input' placeholder='Enter phone number' onChange={(e)=>{setPhone(e.target.value)}} />
                    </div>
                     <div className='register-input-card'>
                        <label className='register-label'>
                            Email
                        </label>
                        <input type="text" value={email} className='register-input' placeholder='Enter email' onChange={(e)=>{setEmail(e.target.value)}} />
                    </div>
                     <div className='register-input-card'>
                        <label className='register-label'>
                            Password
                        </label>
                        <input type="password" value={password} className='register-input' placeholder='Create a password' onChange={(e)=>{setPassword(e.target.value)}} />
                    </div>
                </div>
                <div className='register-role-container'>
                     <h1 className='register-role-heading'>I AM REGISTERING AS</h1>
                     <div className='register-role-button-card'>
                        <button type="button" className={`register-role-button ${role === "donor" && "register-role-button-select"}`} onClick={()=>{setRole("donor")}}>Donor</button>
                        <button type="button" className={`register-role-button ${role === "requester" && "register-role-button-select"}`} onClick={()=>{setRole("requester")}}>Requester</button>
                         <button type="button" className={`register-role-button ${role === "ngo_volunteer" && "register-role-button-select"}`} onClick={()=>{setRole("ngo_volunteer")}}>NGO</button>
                     </div>
                </div>
        
                {role == "donor"&& <div className='register-donor-container'>
                    <h1 className='register-donor-heading'>DONOR DETAILS</h1>
                    <div className='register-donor-input-card'>
                        <label className='register-donor-label'>BLOOD GROUP</label>
                        <input type="text" value={bloodgroup} className='register-donor-input' placeholder='e.g. O Negative' onChange={(e)=>{setBloodgroup(e.target.value)}} />
                    </div>
                    <h1 className='register-role-heading'>WHAT CAN YOU OFFER ?</h1>
                    <ul className='register-page-category-container' >
                        {categories.map((each,index)=>(
                        <li   key={index}>
                            <button type='button' className={`register-page-category-button ${resource === each.value && "register-page-category-button-selected"}`} onClick={()=>{setResource(each.value)}} >
                                <p className="categoryIcon">{each.icon}</p> 
                                <h1 className="register-page-category-name" >{each.name}</h1>
                            </button>
                        </li>
                            ))}
                    </ul>
                </div>}

                <div className='register-permission-card'>
                    <div className='register-green-dot'>

                    </div>
                    <p className='register-permission-note'>
                        We'll ask to use your location to match you with nearby requests
                    </p>

                </div>

                <button type="submit" className='register-submit-card' >
                        Create Account
                </button>
                <p className='register-alredy-account'>Already have an account ? <a className='register-alredy-account-login'>LogIn</a></p>
            </form>
        </div>
    )

}

export default Register