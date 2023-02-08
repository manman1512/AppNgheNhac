import axios from "axios";
import {stringify} from "qs";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const url = `${SERVER_URL}/api`;
const axiosClient = axios.create({ 
    baseURL: url,
    headers:{
        "Content-Type": "application/json",
    },
    paramsSerializer: {
        serialize: stringify // or (params) => Qs.stringify(params, {arrayFormat: 'brackets'})
    }
})
axiosClient.interceptors.request.use(config =>{
    const token = window.localStorage.getItem("accessToken");
    // console.log(config);
    if(token){
        config.headers = {
            "Authorization": "Bearer " + token
        }
    }
    return config;
    })
export default axiosClient;