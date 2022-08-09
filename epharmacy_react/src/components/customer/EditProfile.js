import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
const EditProfile = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAdd] = useState("");

    const [errs, setErrs] = useState({});
    const [result, setResult] = useState({});
    const [msg, setMsg] = useState("");

    useEffect(() => {
        // axiosConfig.post("/search", keyword).then((rsp) => {
        axiosConfig.get("/profile").then((rsp) => {
            debugger
            setResult(rsp.data);
            // console.log(rsp.data);
        }, (err) => {
            debugger
        })

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { name: name, email: email, mobile: mobile, address: address };
        axiosConfig.post("/profile", data).
            then((rsp) => {
                setResult(rsp.data);
                //setMsg(succ.data.msg);
                //window.location.href="/list";
                debugger;
            }, (err) => {
                //  debugger;
                setErrs(err.response.data);
            })
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                Name: <input defaultValue={result.customer_name} onChange={(e) => { setName(e.target.value) }} type="text" /><span>{errs.name ? errs.name[0] : ''}</span><br />
                Email: <input defaultValue={result.customer_email} onChange={(e) => { setEmail(e.target.value) }} type="text" /><span>{errs.email ? errs.email[0] : ''}</span><br />
                Mobile: <input defaultValue={result.customer_mob} onChange={(e) => { setMobile(e.target.value) }} type="text" /><span>{errs.mobile ? errs.mobile[0] : ''}</span><br />
                Address: <input defaultValue={result.customer_add} onChange={(e) => { setAdd(e.target.value) }} type="text" /><span>{errs.mobile ? errs.mobile[0] : ''}</span><br />
                <input type="submit" value="Create"/> 
            </form>
        </div>
    )
}

export default EditProfile;

