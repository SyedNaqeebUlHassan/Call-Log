import React from 'react'
import authServices from '../Services/authServices'
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const navigate=useNavigate();
    const handleClick=()=>{
        authServices.logout();
        navigate("/");
        window.location.reload();
    }
  return (
    <div style={{width:"100%",height:"50px",backgroundColor:"#FFC0CB",display:'flex',justifyContent:'end',alignItems:'center',flexDirection:'row'}}>
        <div style={{marginRight:"20px"}}>
            <button onClick={handleClick} class="btn btn-primary">Log Out</button>
        </div>
    </div>
  )
}

export default Header