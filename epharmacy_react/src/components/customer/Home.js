import { useState } from "react";
import axiosConfig from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SearchBar from "./SearchBar";
const Home = () => {
  const [search, setSearch] = useState("");
  const [errs, setErrs] = useState("");
  const navigate = useNavigate();

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
      //  console.log(data);
    }
    // const data = new URLSearchParams({ search: search }).toString();
    // const searchParam= createSearchParams(data).toString
    // const queryString = new URLSearchParams(data).toString();


    // axiosConfig.get("/search", { params: data }).
    //   then((succ) => {
    //     debugger
    //     <Navigate to={{pathname: '/search',state:succ.data }} />
    //     // navigate("/search", { state: succ.data });
    //     // navigate("/search", { replace: true });
    //   }, (err) => {
    //     debugger
    //     setErrs(err.response.data);

    //   })
  }
  return (
    <div>
      <h1 align='center'>Customer Homepage <br></br><i>``````Get medicine at your doorstep !``````</i></h1>
      <SearchBar />
    </div>
    //   <form onSubmit={handleSubmit}>
    //   <input value={search} type="text" placeholder="Search here" onChange={(e) => { setSearch(e.target.value) }}></input>
    //   {/* <input type="submit" value="search" /><span>{errs.search ? errs.search[0] : ''}</span> */}
    //   <input type="submit" value="search" /><span> {errs ? errs : ''}</span>
    // </form>
  )
}

export default Home;