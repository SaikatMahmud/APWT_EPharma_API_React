import { useState } from "react";
import axiosConfig from './axiosConfig';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Reg = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errs, setErrs] = useState({});
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { email: email, password: password };
        axiosConfig.post("/login", data).
            then((succ) => {
                debugger;
                localStorage.setItem('_authToken', succ.data.token_key);
                localStorage.setItem('_authUserId', succ.data.user_id);
                navigate({ pathname: '/' });
                window.location.reload();
            }, (err) => {
                debugger;
                setErrs(err.response.data);
            })
    }
    return (
        <div align="center">
        <form onSubmit={handleSubmit}>
            <h2>{errs.msg}</h2>
            Email: <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" /><span>{errs.email ? errs.email[0] : ''}</span><br />
            Password: <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" /><span>{errs.password ? errs.password[0] : ''}</span><br />
            <input type="submit" value="Login" />
        </form></div>
    )
}
export default Reg;