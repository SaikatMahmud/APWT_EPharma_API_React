import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
const Cart = () => {
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // axiosConfig.post("/search", keyword).then((rsp) => {
    axiosConfig.get("/cart").then((rsp) => {
      debugger
      setResult(rsp.data);
      console.log(rsp.data);
    }, (err) => {

    })

  }, []);
  //.....
  const countTotalPrice=(price)=>{
    setTotal(total+price);
  }
  return (
    <div>
      <h3>Your cart is here</h3>

      {/* <div>
        {
          result?.map((c)=>
          <span>
           name: {c.cart_id} 
          </span>
          )
        }
        </div> */}
      <table border="1" align="center" cellpadding="4">

        <tr>
          <th>Medicine name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>

        {
          result?.map((cart) =>
            <tbody>

              <td>{cart.medicines.medicine_name}</td>
              <td>{cart.quantity}</td>
              <td>{(cart.quantity)*(cart.medicines.price)}</td>
              {countTotalPrice.bind((cart.quantity)*(cart.medicines.price))}
              
              <br />


            </tbody>
          )

        }
      </table>
      <li>Subtotal amount = {total}</li>




    </div>
  )
}

export default Cart