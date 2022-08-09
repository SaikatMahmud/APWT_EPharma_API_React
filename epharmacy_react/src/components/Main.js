import Reg from "./customer/Reg";
import BeforeLogin from "./layouts/BeforeLogin";
import AfterLogin from "./layouts/AfterLogin";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from "./AboutUs";
import Home from "./customer/Home";
import Login from "./Login";
import ContactUs from "./ContactUs";
import SearchResult from "./customer/SearchResult";
import Cart from "./customer/Cart";
import Orders from "./customer/Orders";
import EditProfile from "./customer/EditProfile";
import Logout from "./customer/Logout";

const Main = () => {
    return (
        <div>
            <BrowserRouter>
                {/* if ( ${localStorage.getItem('_authToken')}) {
                <AfterLogin/>
            }
            else{
                <BeforeLogin/>
            } */}
                <AfterLogin />
                <BeforeLogin />

                <Routes>
                    <Route path="/registration" element={<Reg />} />
                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/aboutUs" element={<AboutUs />} />
                    <Route path="/contactUs" element={<ContactUs />} />
                    <Route path="/search" element={<SearchResult />} />

                    <Route path="/editProfile" element={<EditProfile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/logout" element={<Logout />} />

                    {/* <Route path="/search" render={(props) => <SearchResult {...props}/>}/> */}


                </Routes>
            </BrowserRouter>

        </div>
    )
}
export default Main;