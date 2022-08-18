import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const EditProfile = () => {
    const location = useLocation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAdd] = useState("");
    const [mfile, setFile] = useState(null);
    const [proPic, setPic] = useState("");
    const [errs, setErrs] = useState({});
    const [result, setResult] = useState({});
    const [msg, setMsg] = useState("");
    const [isReady, setIsReady] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setIsReady(false);
        // axiosConfig.post("/search", keyword).then((rsp) => {
        axiosConfig.get("/profile").then((rsp) => {
            debugger
            setResult(rsp.data);
            setName(rsp.data.customer_name);
            setEmail(rsp.data.customer_email);
            setMobile(rsp.data.customer_mob);
            setAdd(rsp.data.customer_add);
            setPic(rsp.data.pro_pic);
            setIsReady(true);
            // console.log(rsp.data);
        }, (err) => {
            debugger
        })

    }, [location]);

    const uploadImage = (event) => {
        event.preventDefault();
        var image= new FormData();
        image.append('cus_pic',mfile);
        axiosConfig.post("/profile-image",image).
            then((rsp) => {
                setResult(rsp.data);
                //setMsg(succ.data.msg);
                //window.location.href="/list";
                debugger;
                setFile(null);
                setPic("");
                navigate({pathname: '/editProfile'});
                setMsg("Image updated");
            }, (err) => {
                //  debugger;
                setErrs(err.response.data);
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var image= new FormData();
        image.append('cus_pic',mfile);
        var data = { name: name, email: email, mobile: mobile, address: address};
        axiosConfig.post("/profile",data).
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
    if (!isReady) {
        return <h2 align="center">Page loading....</h2>
    }

    return (
        <div align="center">
            <br />
            <h3>----------Your Profile----------</h3>
            <form onSubmit={uploadImage}>
                <img width="120" height="100" src={`http://localhost:8000/storage/cus_pic/${proPic}`} /> <br /><br />
                Upload profile pic-<input type="file" onChange={(e) => { setFile(e.target.files[0]) }} name="image" /><br/>
                <span>{errs.cus_pic ? errs.cus_pic[0] : ''}<br/></span>
                <input type="submit" value="Upload"/>
            </form>
            <br /><br/>
            <h4>Personal info:</h4>
            <form onSubmit={handleSubmit}>
                Name: <input defaultValue={name} onChange={(e) => { setName(e.target.value) }} type="text" /><span>{errs.name ? errs.name[0] : ''}</span><br />
                Email: <input defaultValue={email} onChange={(e) => { setEmail(e.target.value) }} type="text" /><span>{errs.email ? errs.email[0] : ''}</span><br />
                Mobile: <input defaultValue={mobile} onChange={(e) => { setMobile(e.target.value) }} type="text" /><span>{errs.mobile ? errs.mobile[0] : ''}</span><br />
                Address: <input defaultValue={address} onChange={(e) => { setAdd(e.target.value) }} type="text" /><span>{errs.address ? errs.address[0] : ''}</span><br />
                
                <br /><input type="submit" value="Save info" />
            </form>
          
            <h4>{msg}</h4>
        </div>
    )
}

export default EditProfile;


