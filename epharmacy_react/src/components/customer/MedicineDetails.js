import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";

const MedicineDetails = () => {
    const { id } = useParams();
    const [result, setResult] = useState([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        axiosConfig.get("/details/med/id=" + id).then((rsp) => {
            debugger
            setResult(rsp.data);
            setIsReady(true);
        }, (err) => {
            debugger
        })

    }, []);

    if (!isReady) {
        return <h2 align="center">Page loading....</h2>
    }

    return (
        <div>
            <br /><br />
            <p align="center"><b>Medicine details:</b></p>
            <table border="2" align="center" cellPadding="10" width="30%">
                <td>
                    Name: {result.med.medicine_name}<br />
                    Genre: {result.med.genre}<br />
                    Brand: {result.supplier_name}<br />
                    Price: {result.med.price}
                </td>

            </table>&emsp;&emsp;&emsp;&emsp;
            <table border="2" align="center" cellPadding="10" width="30%">
                <td>
                    <b>Details:</b>   {result.med.details} <br /><br />
                    <b>Side effects:</b>   none
                </td>

            </table>
        </div>
    )
}

export default MedicineDetails;