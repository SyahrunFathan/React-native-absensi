import axios from "axios";
import { getData } from "../storage/Storage";

const API = axios.create({baseURL: 'http://192.168.1.10:5001'})

API.interceptors.request.use(async(req) => {
    const response = await getData('profile')
    if(response?.token){
        req.headers.Authorization = `Bearer ${response?.token}`
    }
    return req;
})

// Login Aplikasi
export const Login = async(data) => {
    return API.post('/auth/login', data)
}

// Logout Aplikasi
export const Logout = async(id) => {
    return API.delete(`/auth/logout/${id}`)
}