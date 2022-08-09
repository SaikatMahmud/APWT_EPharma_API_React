import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import axios from "axios";
// require("bootstrap/less/bootstrap.less");

//  import {Paginator} from "react-laravel-paginator";
//  import { Pagination } from "react-laravel-paginex";

const SearchResult = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = { search: searchParams.get("search") };
    const [result, setResult] = useState({});
    const [loadPage, setLoadParams] = useState("");

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


    const handlePageChange = (pageNumber) => {
    
        console.log(`active page is ${pageNumber}`);
        const searchPage={search:keyword,page:pageNumber};
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
            <ul>
                {
                    result.data?.map((st) =>
                        <li key={st.medicine_id}>{st.medicine_name}</li>
                    )
                }
            </ul>

            <div>
                <Pagination
                    activePage={result.current_page}
                itemsCountPerPage={result.to}
                totalItemsCount={result.total}
                pageRangeDisplayed={5}
                onChange={handlePageChange.bind(this)}/>
            </div>

            {/* <Paginator currPage={result.current_page} lastPage={result.last_page} onChange={this.onCurrPageChange} /> */}
            {/* <Pagination changePage={this.getData} data={data}/> */}
        </div >
    )

}

export default SearchResult