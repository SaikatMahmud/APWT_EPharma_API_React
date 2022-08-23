import axiosConfig from "../axiosConfig";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Logout=()=>{
  const navigate = useNavigate();

    useEffect(()=>{
        axiosConfig.get("/logout").then((rsp) => {
          localStorage.removeItem('_authToken');
          navigate({ pathname: '/' });
          window.location.reload();

        }, (err) => {
            debugger
        })

    }, []);
    
  return (
    <div>Logging out...</div>
  )
}

export default Logout