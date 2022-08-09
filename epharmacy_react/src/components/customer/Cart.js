import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
const Cart = () => {
  const [result, setResult] = useState({});

  useEffect(() => {
    // axiosConfig.post("/search", keyword).then((rsp) => {
    axiosConfig.get("/cart").then((rsp) => {
      debugger
      setResult(rsp.data);
      console.log(rsp.data);
    }, (err) => {

    })

  }, []);

  return (
    <div>
      <h3>Your cart</h3>
      {
        result.data?.map((cart) =>
          // <li key={st.medicine_id}>{st.medicine_name}</li>
          <span>
            <table border="1" align="center" cellpadding="4">
        <tr>
            <th>Medicine name</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>

        
        </table>
          </span>
        )

      }




    </div>
  )
}

export default Cart