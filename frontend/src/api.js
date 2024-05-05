import axios from "axios"
import { ACCESS_TOKEN } from "./constants"


const api = axios.create({
    
    //create a axios instance
    
    // the base url define the base url of all the api require of the instance
    baseURL:import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    // define an api interceptor instance of api instance attribute
    // take two args : function

    //.use is the method to add interceptors
    // 1.request interceptor(the type we used here, as we see in name)
    // 2.response interceptor
    
    //config is a object
    // url：as the name indicate
    // method： get、post、put 
    // headers：header info
    // params：url params
    // data：data send in request
    // timeout：millisec
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token){

            // pass in jwt token
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
    
)