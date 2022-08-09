import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import { createSearchParams, useSearchParams } from "react-router-dom";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

// require("bootstrap/less/bootstrap.less");

//  import {Paginator} from "react-laravel-paginator";
//  import { Pagination } from "react-laravel-paginex";

const SearchResult = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = { search: searchParams.get("search") };
    const [result, setResult] = useState({});
    const [loadPage, setLoadParams] = useState("");
    const [search, setSearch] = useState("");
    const [errs, setErrs] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        // axiosConfig.post("/search", keyword).then((rsp) => {
        axiosConfig.get(`/search?search=${searchParams.get("search")}`).then((rsp) => {
            debugger
            setResult(rsp.data);
            console.log(rsp.data);
        }, (err) => {

        })

    }, []);

    // const constructor=(props)=>{
    //     super(props);
    //     this.state = {
    //       activePage: 15
    //     };
    //   }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!search) {
            setErrs("Type keyword to serach");
        }
        else {
            const data = { search };
            navigate({
                pathname: '/search',
                search: `?${createSearchParams(data)}`,
            });
        }
    }

    const handlePageChange = (pageNumber) => {

        console.log(`active page is ${pageNumber}`);
        const searchPage = { search: keyword, page: pageNumber };
        //axiosConfig.post("/search", keyword);
        // this.setState({ activePage: pageNumber });
        // axiosConfig.post("/search",searchPage).then((rsp) => {
        axiosConfig.get(`/search?search=${searchParams.get("search")}&page${pageNumber}`).then((rsp) => {
            debugger
            setResult(rsp.data);
            console.log(rsp.data);
        }, (err) => {
            debugger
        })
    }

    // getData=(data)=>{
    //     axios.get('/search?page=' + data.page).then((response) => {
    //         this.setState({data:data});
    //     });
    // }
    return (
        <div>


            <br />

            <div align="right">
                <form onSubmit={handleSubmit}>
                    <input value={search} type="text" placeholder="Search here" onChange={(e) => { setSearch(e.target.value) }}></input>
                    <input type="submit" value="search" /><span> {errs ? errs : ''}</span>
                </form>

            </div>


            <div>
                {/* <ul> */}
                {
                    result.data?.map((med) =>
                        // <li key={st.medicine_id}>{st.medicine_name}</li>
                        <span>
                            <table border="1" align="center" cellpadding="10" width="40%">
                                <td>
                                    Name: {med.medicine_name}<br />
                                    Genre: {med.genre}<br />
                                    &emsp;&emsp;&emsp;
                                    Details: see more...<br />
                                    Price: {med.price} TK <br/>
                                    <button>Add to cart</button>
                                </td>

                            </table>
                            &nbsp;
                        </span>
                    )
                }
                {/* </ul> */}


                <div>
                    <Pagination
                        activePage={result.current_page}
                        itemsCountPerPage={result.to}
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