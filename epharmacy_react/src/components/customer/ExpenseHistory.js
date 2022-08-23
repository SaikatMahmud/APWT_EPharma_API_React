import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";

const ExpenseHistory = () => {
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState();
  const [isReady, setIsReady] = useState(false);
  const [cusAdd, setAddress] = useState("");
  const [method, setMethod] = useState("");
  const [errs, setErrs] = useState({});
  const [msgRemove, setRemove] = useState("");
  const navigate = useNavigate();

  const [currentYear, setCurrentYear] = useState([["Month", "TK"]]);
  const [previousYear, setPreviousYear] = useState([["Month", "TK"]]);
  
  

  useEffect(() => {
    axiosConfig.post("/expense/history").then((rsp) => {
      // setThisMonth(oldArray => [...oldArray,["Month", "TK"]]);
      setResult(rsp.data);
      rsp.data.dataCurrentYear?.map((order,index)=>
      setCurrentYear((oldArray) => [...oldArray,[order.month,order.amount]])
      )

      rsp.data.dataPreviousYear?.map((order,index)=>
      setPreviousYear((oldArray) => [...oldArray,[order.month,order.amount]])
      ) 

      setIsReady(true);
    }, (err) => {
      //setErrs(err.response.data);
      
    })
    
  }, []);

  
  if (!isReady) {
    return <h2 align="center">Page loading....</h2>
  }
  return (
    <div>
     <div align='center'>
      Number of order placed from your account: <b>{result.count}</b><br/>
      Your total expense for all order: <b>{result.totalAmount}</b> TK<br/>
      </div> <br/>
      <div align='center'>
      Order placed in this month: <b>{result.countInThisM}</b><br/>
      Expense in this month: <b>{result.amountInThisM}</b> TK<br/>
      </div> <br/>
      <div align='center'>
      Order placed in previous month: <b>{result.countInPreviousM}</b><br/>
      Expense in previous month: <b>{result.amountInPreviousM}</b> TK<br/>
      </div>
  

      {/* {
        result.map((order, index) =>
        // setThisMonth.bind(oldArray => [...oldArray,[order.month,order.amount]])
        setThisMonth.push([order.month,order.amount])
        )
      } */}
      {
 
      }

      {console.log(currentYear)}

      <h4>Order statistics for current year:
      <Chart
        chartType="ColumnChart"
        data={currentYear}
        width="950px"
        height="300px"
        legendToggle
        sliceVisibilityThreshold='0'
      /></h4>
      <h4>Order statistics for previous year:
      <Chart
        chartType="ColumnChart"
        data={previousYear}
        width="950px"
        height="300px"
        legendToggle
        sliceVisibilityThreshold='0'
      /></h4>
    </div>
  )
}

export default ExpenseHistory