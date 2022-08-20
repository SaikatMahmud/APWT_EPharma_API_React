import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import { createSearchParams, useSearchParams } from "react-router-dom";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

// require("bootstrap/less/bootstrap.less");
//  import {Paginator} from "react-laravel-paginator";
//  import { Pagination } from "react-laravel-paginex";
const SearchResult = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = { search: searchParams.get("search") };
    const [result, setResult] = useState({});
    const [search, setSearch] = useState("");
    const [errs, setErrs] = useState("");
    const [addCartMsg, setCartMsg] = useState({});
    const [quantity, setQuantity] = useState([]);
    const [medId, setMedId] = useState("");
    const [isReady, setIsReady] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsReady(false);
        // axiosConfig.post("/search", keyword).then((rsp) => {
        axiosConfig.get(`/search?search=${searchParams.get("search")}`).then((rsp) => {
            setCartMsg({});
            debugger
            //fetchData();
            setResult(rsp.data);
            console.log(rsp.data);
            setIsReady(true);
        }, (err) => {

        })

    }, [location]);

    // const constructor=(props)=>{
    //     super(props);
    //     this.state = {
    //       activePage: 15
    //     };
    //   }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (!search) {
    //         setErrs("Type keyword to serach");
    //     }
    //     else {
    //         const data = { search };
    //         setResult("");
    //         navigate({
    //             pathname: '/search',
    //             search: `?${createSearchParams(data)}`,
    //         });
    //         this.useEffect();

    //     }
    // }

    const handlePageChange = (pageNumber) => {

        console.log(`active page is ${pageNumber}`);
        // const searchPage = { search: keyword, page: pageNumber };
        //axiosConfig.post("/search", keyword);
        // this.setState({ activePage: pageNumber });
        // axiosConfig.post("/search",searchPage).then((rsp) => {
        axiosConfig.get(`/search?search=${searchParams.get("search")}&page=${pageNumber}`).then((rsp) => {
            setCartMsg({});
            debugger
            setResult(rsp.data);
            // console.log(rsp.data);
        }, (err) => {
            debugger
        })
    }
    const addToCart = (quantity, index, medId, avlQuantity) => {
        // let quan=quantity+index;
        const data = { ["quantity" + index]: quantity, key: index, medId: medId, avlQuantity: avlQuantity }
        axiosConfig.post("/add-to-cart", data).then((rsp) => {
            debugger
            setCartMsg(rsp.data);
            // setCartMsg(() => {
            //     return { ...addCartMsg, [index]:rsp.data };
            // })


            //setQuantity([]);   

        }, (err) => {
            setCartMsg(err.response.data);
            // setCartMsg(() => {
            //     return { ...addCartMsg, [index]:err.response.data };
            // })
            //setQuantity([]);

        })
    }
    if (!isReady) {
        return <h2 align="center">Page loading....</h2>
    }

    // getData=(data)=>{
    //     axios.get('/search?page=' + data.page).then((response) => {
    //         this.setState({data:data});
    //     });
    // }
    return (
        <div>
            {/* {console.log(addCartMsg)} */}
            <br />
            <div align="right">
                <SearchBar />
            </div>
            <div>
                {
                    result.data?.map((med, index) => (
                        // <li key={st.medicine_id}>{st.medicine_name}</li>
                        <span key={index}>
                            {/* <form key={index} onSubmit={handleSubmit}> */}
                            <table border="1" align="center" cellPadding="10" width="40%">
                                <tbody >
                                    <td >
                                        Name: {med.medicine_name}<br />
                                        Genre: {med.genre}
                                        &emsp;&emsp;&emsp;
                                        Details:<Link to={`/medicine/details/${med.medicine_id}`}> see more...</Link><br />
                                        Price: {med.price} TK <br />
                                        <div align="right">
                                            {/* <input defaultValue={quantity} onChange={(e) => {setQuantity.bind(e.target.value) }} type="number" placeholder="Quantity" /> */}
                                            {/* <input defaultValue={quantity} onChange={(e) =>
                                                setQuantity((prev) => {
                                                    return { ...prev, [index]: e.target.value };
                                                })
                                            } type="number" placeholder="Quantity" /> */}
                                            <input defaultValue={quantity} onChange={(e) =>
                                                setQuantity(() => {
                                                    return { ...quantity, [index]: e.target.value };
                                                })
                                            } type="number" placeholder="Quantity" />

                                            Available:<b>{med.availability}</b>
                                            {/* <input key={index} value={setMedId(med.medicine_id)} type="hidden"/> 
                                    <input key={index} value={setMedId(med.medicine_id)} type="hidden"/>  */}
                                            <br /> <button onClick={() => addToCart(quantity[index], index, med.medicine_id, med.availability)}>Add to cart</button>
                                        </div>
                                        <b><i> {addCartMsg["quantity" + index] ? addCartMsg["quantity" + index][0] : ''}
                                            {addCartMsg["msg" + index] ? addCartMsg["msg" + index] : ''}</i></b>
                                    </td>

                                </tbody>

                            </table>
                            &nbsp;
                            {/* </form> */}
                        </span>
                        // <input key={index} type="submit" value="search" /><span> {errs ? errs : ''}</span>
                    ), this)
                }

                <div align="center">
                    <Pagination
                        activePage={result.current_page}
                        itemsCountPerPage={result.per_page}
                        totalItemsCount={result.total}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange.bind(this)} />
                </div>

                {/* <Paginator currPage={result.current_page} lastPage={result.last_page} onChange={this.onCurrPageChange} /> */}
                {/* <Pagination changePage={this.getData} data={data}/> */}
            </div >

        </div>
    )

}

export default SearchResult