import { useState } from "react";
import axiosConfig from './axiosConfig';
import axios from "axios";

const Reg=()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errs,setErrs] = useState({});
    const [msg,setMsg] = useState("");
    const handleSubmit=(event)=>{
        event.preventDefault();
        const data={email:email,password:password};
       axiosConfig.post("/login",data).
        then((succ)=>{
            debugger;
            localStorage.setItem('_authToken',succ.data.token_key);
            localStorage.setItem('_authUserId',succ.data.user_id);
        },(err)=>{
           debugger;
            setErrs(err.response.data);
        })
    }
    return(
        <form onSubmit={handleSubmit}>
            <h1>{msg}</h1>
            Email: <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text"/><span>{errs.email? errs.email[0]:''}</span><br/>
            Password: <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text"/><span>{errs.password? errs.password[0]:''}</span><br/>
            <input type="submit" value="Login"/> 
        </form>
    )
}
export default Reg;