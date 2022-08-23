import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { saveAs } from "file-saver";
import fileDownload from "js-file-download";
import axios from "axios";
import { useLocation } from "react-router-dom";


const Orders = () => {
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState();
  const [isReady, setIsReady] = useState(false);
  const [cusAdd, setAddress] = useState("");
  const [method, setMethod] = useState("");
  const [errs, setErrs] = useState({});
  const [msgRemove, setRemove] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


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
  const returnOrder = (id) => {
    axiosConfig.post(`/return/order/${id}`).then((rsp) => {
      debugger
      setResult(rsp.data);
      setRemove("Return request placed");
    }, (err) => {
      setErrs(err.response.data);

    })
  }
  const addReview = (order_id, order_amount) => {
    navigate('/order_review',
      {state:{o_id:order_id,o_amount:order_amount}}
    );
    

  }
  const downloadOrder = (id) => {
    axiosConfig.get(`/order/receipt/${id}`, { responseType: 'blob' }).then((rsp) => {
      debugger
      // saveAs(rsp.blob,'order_recipt.pdf');
      fileDownload(rsp.data, 'order_recipt.pdf');

    }, (err) => {
      //setErrs(err.response.data);

    })
    // axios({
    //   url: `http://localhost:8000/api/order/receipt/${id}`,
    //   method: 'GET',
    //   responseType: 'blob', // important
    // }).then((response) => {
    //    const url = window.URL.createObjectURL(new Blob([response.data]));
    //    const link = document.createElement('a');
    //    link.href = url;
    //    link.setAttribute('download', 'file.pdf'); //or any other extension
    //    document.body.appendChild(link);
    //    link.click();
    // });
  }
  const handlePageChange = (pageNumber) => {

    console.log(`active page is ${pageNumber}`);
    // const searchPage = { search: keyword, page: pageNumber };
    //axiosConfig.post("/search", keyword);
    // this.setState({ activePage: pageNumber });
    // axiosConfig.post("/search",searchPage).then((rsp) => {
    axiosConfig.get(`/order/all/list?page=${pageNumber}`).then((rsp) => {

      debugger
      setResult(rsp.data);
      // console.log(rsp.data);
    }, (err) => {
      debugger
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
      <span><br/><h4 align="center">{location.state ? location.state.msgFromReview : ''}</h4></span>
      <h3 align="center">Your order list</h3>
      <table border="1" align="center" cellpadding="4" width="43%" >
        <tr >
          <th className="text-center">Serial</th>
          <th className="text-center">Order Number</th>
          <th className="text-center">Amount</th>
          <th className="text-center">Status</th>
          <th className="text-center">Action</th>
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
                  order.status == 'Pending' && <span><button onClick={() => cancelOrder(order.order_id)}>Cancel</button> | </span>
                }
                <button onClick={() => downloadOrder(order.order_id)}>Download</button>
                {
                  order.status == 'Delivered' && <span> | <button onClick={() => returnOrder(order.order_id)}>Return</button></span>
                }
                {
                  (order.status != 'Pending') && (order.status != 'Canceled') && (order.review_status!='true') && <span> | <button onClick={() => addReview(order.order_id, order.amount)}>Review</button></span>
                }
                {
                  (order.status != 'Pending') && (order.status != 'Canceled') && (order.review_status=='true') && <span> | Reviewed</span>
                }
              </td>

            </tbody>
          )
        }
      </table>
      <div align="center">

        <Pagination
          activePage={result.current_page}
          itemsCountPerPage={result.per_page}
          totalItemsCount={result.total}
          pageRangeDisplayed={5}
          onChange={handlePageChange.bind(this)} /></div>
    </div>
  )
}

export default Orders