import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl)
export const AxiosInstance=axios.create({
    baseURL:apiUrl,
    // withCredentials: true,
    headers:{
        "Content-Type":"application/json"
    }

})