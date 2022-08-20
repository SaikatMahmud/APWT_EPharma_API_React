import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState();
  const [isReady, setIsReady] = useState(false);
  const [cusAdd, setAddress] = useState("");
  const [method, setMethod] = useState("");
  const [errs, setErrs] = useState({});
  const [msgRemove, setRemove] = useState("");
  const navigate = useNavigate();

  var subTotal = 0;

  useEffect(() => {
    // axiosConfig.post("/search", keyword).then((rsp) => {
    axiosConfig.get("/cart").then((rsp) => {
      debugger
      setResult(rsp.data);
      setAddress(rsp.data[0].customer.customer_add)
      setIsReady(true);
      //  result?.map(cart=>
      // setTotal(total+(cart.quantity) * (cart.medicines.price))
      // ) 
    }, (err) => {
      setErrs(err.response.data);

    })

  }, []);

  const removeFromCart = (id) => {
    axiosConfig.post(`/cart/remove_med/${id}`).then((rsp) => {
      debugger
      setResult(rsp.data);
      setRemove("Medicine removed");
    }, (err) => {
      setErrs(err.response.data);

    })
  }
  const placeOrder = (event) => {
    event.preventDefault();
    const data = { amount: subTotal, address: cusAdd, method: method };
    axiosConfig.post('/order/confirm', data).
      then((rsp) => {
        localStorage.setItem('_orderConfirmed',"placed");
        navigate({ pathname: '/orderConfirm' });
      }, (err) => {
        //  debugger;
        setErrs(err.response.data);
      })
  }

  // const countTotalPrice = (price) => {
  //   setTotal(total + price);
  // }

  if (errs.msg) { //if cart is empty, "msg" from API
    return <h3 align="center">Your cart is empty! <br />Add medicine first to place order.</h3>
  }
  if (!isReady) {
    return <h2 align="center">Page loading....</h2>
  }

  return (
    <div>
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
        <table border="1" align="center" cellPadding="4">

          <tr>
            <th>Medicine name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>

          {
            result?.map((cart, index) =>
              <tbody align="center">
                <tr hidden> {subTotal += (cart.quantity) * (cart.medicines.price)}</tr>
                <td>{cart.medicines.medicine_name}</td>
                <td>{cart.quantity} pc</td>
                <td>{(cart.quantity) * (cart.medicines.price)}</td>
                <td><button onClick={() => removeFromCart(cart.cart_id)}>Remove from cart</button></td>

                {/* {((cart.quantity)*(cart.medicines.price)).reduce((a,b)=>a+b,0)} */}
                {/* {setTotal((cart.quantity) * (cart.medicines.price))} */}
                {/* {console.log(total)} */}
                {/* <input type="hidden">{subTotal+=(cart.quantity) * (cart.medicines.price)}</input> */}

              </tbody>
            )
          }
        </table>
      </div>
      <p align="center">
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <b><i>{msgRemove ? msgRemove : ''}</i></b></p>
      <div align="center">
        <ul><li key={1}>Subtotal amount = <b>{subTotal}</b> TK</li></ul><br />
        <h3>Check out ~</h3>
        <form onSubmit={placeOrder}>
          {/* <input type="hidden" name="amount" value="{{$subTotal}}" /> */}
          Payment method: <select onChange={(e) => setMethod(e.target.value)}>
            <option value="">Select</option>
            <option value="COD">Cash on delivery</option>
            <option value="MFS">MFS</option>
          </select><br/> <span>{errs.method ? errs.method[0] : ''}<br /></span>
          Delivery Address: <input defaultValue={cusAdd} onChange={(e) => { setAddress(e.target.value) }} type="text" placeholder="Provide address" />
         <br/> <span>{errs.address ? errs.address[0] : ''}<br/></span>
          Contact: <u>{result[0].customer.customer_mob}</u>
          {/* <input type="hidden" name="mobile" value="{{$user->customer_mob}}"/><br/> */}
          <br /><br/>
          <input type="submit" value="Place order" />
        </form>
      </div>
    </div>
  )
}

export default Cart