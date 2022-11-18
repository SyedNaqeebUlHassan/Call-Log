import React, { useState } from 'react'
import authServices from '../Services/authServices';
import postServices from '../Services/postServices';
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleLogin=async(e)=>{
        console.log("click");
        e.preventDefault();
        try{
            await authServices.login(userName,password)
            .then((data)=>{
                console.log(data);
                navigate("/Home");
                window.location.reload();
            })
        } catch(err){
                console.log(err);
        }
    }
  return (
    <div className='Login-Wrapper'>
        <div className='Login'>
            <form onSubmit={handleLogin}>
                <input
                style={{marginBottom:"30px",marginTop:"30px"}}
                type="text"
                placeholder='UserName'
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                />
                <br/>
                <input
                style={{marginBottom:"30px"}}
                type="text"
                placeholder='Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <br/>
                <button class="btn btn-primary" style={{width:"190px"}}>Login</button>
            </form>
        </div>
    </div>

  )
}

export default Login