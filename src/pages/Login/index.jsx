import { useState, useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import Headerforentering from '../../components/Headerforentering'

import"./index.css"
const Login =()=>{
    const [emailornumber,setEmailornumber]=useState('')
    const [password,setPassword]=useState('')
    const navigate= useNavigate()

      const jwt = Cookies.get('jwt_token')

    useEffect(() => {
      

        if (jwt) {
             const getUser =  async () =>{


            const url = 'https://rapidaid-back.onrender.com/prof/getuser'

            const options ={
                method:"GET",
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            }

            const response = await fetch(url,options)
            const data = await response.json()
            if(response.ok){
                  navigate(`/${data.user.role}`)
            }

        }
         if (jwt){
             getUser()
             console.log("jwt")
         }
        }
    }, [navigate])


    const onSubmitLogin= async(event)=>{


        event.preventDefault()

        const userdetails = {
            password,
            typo:emailornumber
        }

        try{

            const url = "https://rapidaid-back.onrender.com/auth/login"

        const options = {
            method :"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userdetails)
        }

        
         const response = await fetch(url,options)
        const data = await response.json()
        
        if(response.ok){
             Cookies.set("jwt_token",data.token,{expires:30})
                console.log(data.message)
                navigate('/')
               
            } else {
                console.log("Login failed:", data.message)
         }

        }catch(error){
            console.log("Something went wrong" ,error.message)
        }

        

    }

    return(
        <div className='login-container'>
            <Headerforentering subtitle="Welcome back" />
            <form className='login-main-container' onSubmit={onSubmitLogin}>
                <div className='login-input-card'>
                        <label className='login-label'>
                           EMAIL OR PHONE NUMBER
                        </label>
                        <input type="text" value={emailornumber} className='login-input' placeholder='Enter email or phone number' onChange={(e)=>{setEmailornumber(e.target.value)}} />
                </div>
                <div className='login-input-card'>
                        <label className='login-label'>
                            PASSWORD
                        </label>
                        <input type="password" value={password} className='login-input' placeholder='Enter your password'  onChange={(e)=>{setPassword(e.target.value)}} />
                </div>

                 <button type="submit" className='login-submit-card' >
                        Login
                </button>
                <div className='login-alternative-card'>
                    <hr className='login-horizontal' />
                    <p>or</p>
                    <hr className='login-horizontal' />
                </div>
                 <p className='login-alredy-account'>New here ? <Link to="/register" className='login-alredy-account-register'  >Create an account</Link></p>
            </form>
        </div>
    )

}

export default Login