import Reg from "./customer/Reg";
import BeforeLogin from "./layouts/BeforeLogin";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from "./AboutUs";
import Home from "./customer/Home";
import Login from "./Login";
import ContactUs from "./ContactUs";
import SearchResult from "./customer/SearchResult";

const Main = () => {
    return (
        <div>
            <BrowserRouter>
                <BeforeLogin />

                <Routes>
                    <Route path="/registration" element={<Reg />} />
                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/aboutUs" element={<AboutUs />} />
                    <Route path="/contactUs" element={<ContactUs />} />
                    <Route path="/search" element={<SearchResult />} />


                </Routes>
            </BrowserRouter>

        </div>
    )
}
export default Main;