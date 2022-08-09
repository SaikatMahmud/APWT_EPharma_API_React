import { useState } from "react";
import axiosConfig from "../axiosConfig";
import { useNavigate } from "react-router-dom";


const Reg=()=>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [mobile,setMobile] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPass,setConfirmPass] = useState("");
    const [errs,setErrs] = useState({});
    const [msg,setMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault();
        const data={name:name,email:email,mobile:mobile,password:password,confirmPass:confirmPass};
        axiosConfig.post("/registration",data).
        then((succ)=>{
            //setMsg(succ.data.msg);
            //window.location.href="/list";
            debugger;
        },(err)=>{
          //  debugger;
            setErrs(err.response.data);
        })
    }
    return(
        <form onSubmit={handleSubmit}>
            <h1>{msg}</h1>
            Name: <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text"/><span>{errs.name? errs.name[0]:''}</span><br/>
            Email: <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text"/><span>{errs.email? errs.email[0]:''}</span><br/>
            Mobile: <input value={mobile} onChange={(e)=>{setMobile(e.target.value)}} type="text"/><span>{errs.mobile? errs.mobile[0]:''}</span><br/>
            Password: <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text"/><span>{errs.password? errs.password[0]:''}</span><br/>
            Confirm Password: <input value={confirmPass} onChange={(e)=>{setConfirmPass(e.target.value)}} type="text"/><span>{errs.confirmPass? errs.confirmPass[0]:''}</span><br/>
            <input type="submit" value="Create"/> 
        </form>
    )
}
export default Reg;