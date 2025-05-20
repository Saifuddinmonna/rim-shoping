import React from 'react';
import { useHistory } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import OrderDetails from '../OrderDetails/OrderDetails';
import './OrderOverview.css';

const OrderOverview = () => {
    const [cart] = useCart();
    const history = useHistory();

    const handleContinueShopping = () => {
        history.push('/shop');
    };

    const handleProceedToReview = () => {
        history.push('/review');
    };

    return (
        <div className="order-overview-container">
            <div className="order-overview">
                <h2>Order Overview</h2>
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <p>Selected Items: {cart.length}</p>
                    <p>Total Price: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
                    <p>Shipping: $5.00</p>
                    <p>Tax: ${(cart.reduce((total, item) => total + item.price, 0) * 0.1).toFixed(2)}</p>
                    <h4>Grand Total: ${(cart.reduce((total, item) => total + item.price, 0) + 5 + (cart.reduce((total, item) => total + item.price, 0) * 0.1)).toFixed(2)}</h4>
                </div>
                <div className="order-actions">
                    <button onClick={handleContinueShopping} className="btn-regular">Continue Shopping</button>
                    <button onClick={handleProceedToReview} className="btn-regular">Proceed to Review</button>
                </div>
            </div>
            <OrderDetails cart={cart} />
        </div>
    );
};

export default OrderOverview; 