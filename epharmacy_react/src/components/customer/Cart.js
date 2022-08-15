import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
const Cart = () => {
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState();
  const [isReady, setIsReady] = useState(false);
  var subTotal = 0;

  useEffect(() => {
    // axiosConfig.post("/search", keyword).then((rsp) => {
    axiosConfig.get("/cart").then((rsp) => {
      debugger
      setResult(rsp.data);
      //  result?.map(cart=>
      // setTotal(total+(cart.quantity) * (cart.medicines.price))
      // ) 
      console.log(total);
      setIsReady(true);
    }, (err) => {

    })

  }, []);

  // const countTotalPrice = (price) => {
  //   setTotal(total + price);
  // }
  if (!isReady)
  {
    return <h2 align="center">Loading....</h2>
  }

  return (
    <div>
      <h3 align="center">Your cart</h3>

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
              <tr hidden> {subTotal += (cart.quantity) * (cart.medicines.price)}</tr>
              <td>{cart.medicines.medicine_name}</td>
              <td>{cart.quantity}</td>
              <td>{(cart.quantity) * (cart.medicines.price)}</td>
              {/* {((cart.quantity)*(cart.medicines.price)).reduce((a,b)=>a+b,0)} */}
              {/* {setTotal((cart.quantity) * (cart.medicines.price))} */}
              {/* {console.log(total)} */}
              {/* <input type="hidden">{subTotal+=(cart.quantity) * (cart.medicines.price)}</input> */}

            </tbody>
          )

        }
      </table>
      <li>Subtotal amount = {subTotal}</li>




    </div>
  )
}

export default Cart