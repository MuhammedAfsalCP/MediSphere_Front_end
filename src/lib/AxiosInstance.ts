import axios from 'axios'
const UserSerivceUrl = import.meta.env.VITE_API_URL;
const AppontmentSerivceUrl = import.meta.env.VITE_API_URL2;
const VideoCallSerivceUrl = import.meta.env.VITE_API_URL3;
const AiSerivceUrl = import.meta.env.VITE_API_URL4;
// const VideoServiceUrl = import.meta.env.VITE_API_URL3;
const token = localStorage.getItem("token");

export const AxiosInstance=axios.create({
    baseURL:UserSerivceUrl,
    // withCredentials: true,
    headers:{
        "Content-Type":"application/json",

    }

})

export const TokenInstance=axios.create({
    
    baseURL:UserSerivceUrl,
    // withCredentials: true,
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
        
    }

})

export const AppointmentInstance=axios.create({
    baseURL:AppontmentSerivceUrl,
    // withCredentials: true,
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
    }

})



export const VideoCallInstance=axios.create({
    baseURL:VideoCallSerivceUrl,
    // withCredentials: true,
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
    }

})

export const AiInstance=axios.create({
    
    baseURL:AiSerivceUrl,
    // withCredentials: true,
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
        
    }

})