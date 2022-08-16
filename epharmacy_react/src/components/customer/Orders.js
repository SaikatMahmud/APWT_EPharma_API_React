import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Orders = () => {
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState();
  const [isReady, setIsReady] = useState(false);
  const [cusAdd, setAddress] = useState("");
  const [method, setMethod] = useState("");
  const [errs, setErrs] = useState({});
  const [msgRemove, setRemove] = useState("");
  var subTotal = 0;

  useEffect(() => {
    axiosConfig.get("/order/all/list").then((rsp) => {
      debugger
      setResult(rsp.data);
      setIsReady(true);

    }, (err) => {
      setErrs(err.response.data);
    })

  }, []);

  const cancelOrder = (id) => {
    axiosConfig.post(`/cancel/order/${id}`).then((rsp) => {
      debugger
      setResult(rsp.data);
      setRemove("Order cancelled");
    }, (err) => {
      setErrs(err.response.data);

    })
  }

  if (errs.msg) { //if cart is empty, "msg" from API
    return <h3 align="center">You did not place any order.</h3>
  }
  if (!isReady) {
    return <h2 align="center">Page loading....</h2>
  }
  return (
    <div>
      <h3 align="center">Your order list</h3>
      <table border="1" align="center" cellPadding="4">
        <tr>
          <th>Serial</th>
          <th>Order Number</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Action</th>
        </tr>

        {
          result.data?.map((order, index) =>
            <tbody align="center">
              <td>{index + 1}</td>
              <td><Link to={`/details/order/${order.order_id}`}>#{order.order_id}</Link></td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
              <td>
                {
                  order.status=='Pending' && <span><button onClick={()=>cancelOrder(order.order_id)}>Cancel</button> | </span>
                }
                <button>Download</button>
              </td>

            </tbody>
          )
        }
      </table>
    </div>
  )
}

export default Orders