import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const AddReview = () => {
    // const [orderId, setOrderId] = useState("");
    // const [amount, setAmount] = useState("");
    const [comment, setComment] = useState("");
    const [orderRating, setOrderRating] = useState("");
    const [riderRating, setRiderRating] = useState("");
    const [errs, setErrs] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

    }, []);

    const saveReview = (event) => {
        event.preventDefault();
        if (!orderRating) {
            setErrs("Select a rating number");
        }
        else {
            const data = { o_id: location.state.o_id, order_rating: orderRating, comment: comment, rider_rating: riderRating };
            axiosConfig.post('/review/order', data).
                then((rsp) => {
                    navigate('/orders',
                        { state: { msgFromReview:"Review has been sent" } }
                    );
                }, (err) => {
                    //  debugger;
                    setErrs(err.response.data);
                })
        }

    }


    return (
        <div align='center'><br />
            Add a review for your order <b>#{location.state.o_id}</b><br />Order amount TK {location.state.o_amount}<br /><br />
            <form onSubmit={saveReview}>
                Rate your order:* <div onChange={(e) => setOrderRating(e.target.value)}>
                    <input type="radio" value="5" name="rating" /> 5 &emsp;
                    <input type="radio" value="4" name="rating" /> 4 &emsp;
                    <input type="radio" value="3" name="rating" /> 3 &emsp;
                    <input type="radio" value="2" name="rating" /> 2 &emsp;
                    <input type="radio" value="1" name="rating" /> 1 &emsp;
                    <span> {errs ? errs : ''}</span>
                </div><br />
                Rate the deliveryman: <div onChange={(e) => setRiderRating(e.target.value)}>
                    <input type="radio" value="5" name="delman_rating" /> 5 &emsp;
                    <input type="radio" value="4" name="delman_rating" /> 4 &emsp;
                    <input type="radio" value="3" name="delman_rating" /> 3 &emsp;
                    <input type="radio" value="2" name="delman_rating" /> 2 &emsp;
                    <input type="radio" value="1" name="delman_rating" /> 1 &emsp;
                </div><br />
                <br />Add a comment: <br />
                <input value={comment} type="text" size="70" height="40" placeholder="Write your feedback" onChange={(e) => { setComment(e.target.value) }}></input>
                <br /><br /> <input type="submit" value="Sent review" />
            </form>


        </div>
    )
}

export default AddReview