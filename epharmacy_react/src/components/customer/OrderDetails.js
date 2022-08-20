import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { useParams } from "react-router-dom";
import moment from "moment";

const OrderDetails = () => {
    const { id } = useParams();
    const [result, setResult] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [errs, setErrs] = useState({});

    useEffect(() => {
        axiosConfig.post("/details/order/" + id).then((rsp) => {
            debugger
            setResult(rsp.data);
            setIsReady(true);
        }, (err) => {
            setErrs(err.response.data);
        })

    }, []);
    if (errs.msg) { //if cart is empty, "msg" from API
        return <h3 align="center">You did not place any order.</h3>
    }
    if (!isReady) {
        return <h2 align="center">Page loading....</h2>
    }

    return (
        <div>
            <div style={{background: 'white', 
            fontSize: 20,
            padding: 25 ,
            border: '1px solid black',
            marginLeft: '300px', marginRight:'300px', marginTop:'20px'}}>
                <h2 align="center">Online Pharmacy Project</h2>
                <p align="center">Invoice of order <i>#{result.order_id}</i></p>

                <div align="left"><b>Customer Name:</b> {result.customers.customer_name}<br />
                    <b>Mobile:</b> {result.customers.customer_mob}<br />
                    <b>Address:</b> {result.customers.customer_add}
                </div><br />
                <div align="left"><b>Order status:</b> {result.status}<br />
                    <b>Order placed:</b> {moment(result.created_at).format("d/m/y, h:m:sa")}
                </div>

                <div>

                    <div align="right">
                        <b>Medicine details:</b><br />
                        <hr />
                        {
                            result.medicines?.map((med) =>
                                <span>
                                    {med.medicine_name} &emsp; &times; {med.pivot.quantity} <br/>
                                </span>
                            )
                        }

                        <hr width="20%" align="right" />
                        <b>Total:</b> { result.amount} TK
                    </div>
                    <br />
                </div>
            </div>

        </div>
    )
}

export default OrderDetails