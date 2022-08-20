import React from 'react'
import { useState } from "react";
import axiosConfig from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { createSearchParams, useSearchParams } from "react-router-dom";
import SearchResult from './SearchResult';
const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [errs, setErrs] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!search) {
            setErrs("Type keyword to search");
        }
        else {
            const data = { search };
            navigate({
                pathname: '/search',
                search: `?${createSearchParams(data)}`,
            });
        }
    }
    return (
        <div><form onSubmit={handleSubmit}>
        <input value={search} type="text" placeholder="Search here" onChange={(e) => { setSearch(e.target.value) }}></input>
        {/* <input type="submit" value="search" /><span>{errs.search ? errs.search[0] : ''}</span> */}
        <input type="submit" value="search" /><span> {errs ? errs : ''}</span>
      </form></div>
    )
}

export default SearchBar;