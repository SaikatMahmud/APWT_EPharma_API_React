import { useState } from "react";
import axiosConfig from "../axiosConfig";

const Home = () => {
  const [search, setSearch] = useState("");
  const [errs, setErrs] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { search: search };
    
    axiosConfig.get("/search", data).
      then((succ) => {
        debugger
      }, (err) => {
        debugger
        setErrs(err.response.data);

      })
  }
  return (
    <div>
      <h1 align='center'>Customer Homepage <br></br><i>``````Get medicine at your doorstep !``````</i></h1>
      <form onSubmit={handleSubmit}>
        <input value={search} type="text" placeholder="Search here" onChange={(e) => { setSearch(e.target.value) }}></input>
        <input type="submit" value="search" /><span>{errs.search ? errs.search[0] : ''}</span>
      </form>

    </div>
  )
}

export default Home;