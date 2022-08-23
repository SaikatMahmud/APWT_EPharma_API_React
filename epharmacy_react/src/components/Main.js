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
import OrderDetails from "./customer/OrderDetails";
import OrderConfirmPage from "./customer/OrderConfirmPage";
import MedicineDetails from "./customer/MedicineDetails";
import AddReview from "./customer/AddReview";
import { useState, useEffect } from "react";

const Main = () => {
    const [logIn, setLogIn] = useState(false);
    // const check=()=>{
    //     if (localStorage.getItem('_authToken')) {
    //         setLogIn(true);
    //     }
    // }
    // useEffect(() => {
    //     if (localStorage.getItem('_authToken')) {
    //         setLogIn(true);
    //     }
    // }, []);
    return (
        <div>
            <BrowserRouter>
                {localStorage.getItem('_authToken') ? <AfterLogin /> : <BeforeLogin />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/registration" element={<Reg />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/aboutUs" element={<AboutUs />} />
                    <Route path="/contactUs" element={<ContactUs />} />
                    <Route path="/search" element={<SearchResult />} />
                    <Route path="/editProfile" element={<EditProfile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orderConfirm" element={<OrderConfirmPage />} />
                    <Route path="/details/order/:id" element={<OrderDetails />} />
                    <Route path="/medicine/details/:id" element={<MedicineDetails />} />
                    <Route path="/logout" element={<Logout />} />

                    <Route path="/order_review" element={<AddReview/>} />

                </Routes>
            </BrowserRouter>

        </div>
    )
}
export default Main;