import { useState,useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Paginator from "react-laravel-paginator";

const SearchResult=()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword= {search: searchParams.get("search")};
    const [result,setResult] = useState({});
    
    useEffect(()=>{
        axiosConfig.post("/search",keyword).then((rsp)=>{
            debugger
        setResult(rsp.data);
       console.log(rsp.data);
        },(er)=>{

        })

    },[]);
    return(
        <div>
            <ul>
                {
                    result.data?.map((st)=>
                    <li key={st.medicine_id}>{st.medicine_name}</li>
                    )
                }
            </ul>
        </div>
    )
   
}

export default SearchResult