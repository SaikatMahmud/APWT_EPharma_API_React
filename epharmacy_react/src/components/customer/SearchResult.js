import { useState } from "react";
import axiosConfig from "../axiosConfig";
import { useLocation } from "react-router-dom";

const SearchResult=()=>{
    const location =useLocation();
    return(
        <div>
{location.state}
        </div>
    )
}

export default SearchResult