import axios from 'axios';
const instance = axios.create({
    baseURL : 'http://localhost:8000/api'
});

instance.interceptors.request.use((config)=>{
    config.headers.common["Authorization"] = localStorage.getItem('_authToken');
    config.headers.common["UserID"] = localStorage.getItem('_authUserId');
    return config;
},(err)=>{});

instance.interceptors.response.use((rsp)=>{
    debugger;
    return rsp;
},(err)=>{
    debugger;
    if(err.response.status == 401){
        window.location.href="/login";
    }
    return Promise.reject(err);
});
export default instance;