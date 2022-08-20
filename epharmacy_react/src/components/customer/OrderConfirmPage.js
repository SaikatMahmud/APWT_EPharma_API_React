import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const OrderConfirmPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('_orderConfirmed')) {

            navigate({ pathname: '/' });
        }
       // localStorage.removeItem('_orderConfirmed');
    }, [])

    return (
        <div align='center'>
            <h3>
                <br /><br />
                Your order has been placed ! <br /><br />
                See your order list <Link to='/orders'> here</Link> <br /> <br />
                Go to <Link to="/"> Home</Link></h3>
        </div>
    )
}

export default OrderConfirmPage