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
            setName(rsp.data.customer_name);
            setEmail(rsp.data.customer_email);
            setMobile(rsp.data.customer_mob);
            setAdd(rsp.data.customer_add);
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
                setMsg("Profile updated");
            }, (err) => {
                //  debugger;
                setErrs(err.response.data);
            })
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                Name: <input defaultValue={name} onChange={(e) => { setName(e.target.value) }} type="text" /><span>{errs.name ? errs.name[0] : ''}</span><br />
                Email: <input defaultValue={email} onChange={(e) => { setEmail(e.target.value) }} type="text" /><span>{errs.email ? errs.email[0] : ''}</span><br />
                Mobile: <input defaultValue={mobile} onChange={(e) => { setMobile(e.target.value) }} type="text" /><span>{errs.mobile ? errs.mobile[0] : ''}</span><br />
                Address: <input defaultValue={address} onChange={(e) => { setAdd(e.target.value) }} type="text" /><span>{errs.address ? errs.address[0] : ''}</span><br />
                <input type="submit" value="Save" />
            </form>
            <h4>{msg}</h4>
        </div>
    )
}

export default EditProfile;


