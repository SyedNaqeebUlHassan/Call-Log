import React from 'react'
import axios from 'axios'

const url='https://frontend-test-api.aircall.io';
const login =(username,password)=>{
   return axios.post(url+"/auth/login",{
    username,
    password
   })
   .then(response=>{
        if(response.data.access_token){
            localStorage.setItem("user",JSON.stringify(response.data));
        }
        console.log(response.data.access_token);
        return response.data
   })
}
const logout=()=>{
    localStorage.removeItem("user");
}
const getCurrentUser=()=>{
    return JSON.parse(localStorage.getItem("user"));
}
const authServices ={
    login,
    logout,
    getCurrentUser
}

export default authServices