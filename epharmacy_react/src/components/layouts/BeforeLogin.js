import { Link } from 'react-router-dom';
const BeforeLogin = () => {
    return (
        <div align="center">
            <span> <Link to="/">Home</Link> </span>|
            <span> <Link to="/login"> Login</Link> </span>|
            <span> <Link to="/registration"> Register</Link> </span>|
            <span> <Link to="/aboutUs"> About us</Link> </span>|
            <span> <Link to="/contactUs"> Contact Us</Link></span>
        </div>
    )
}
export default BeforeLogin;
