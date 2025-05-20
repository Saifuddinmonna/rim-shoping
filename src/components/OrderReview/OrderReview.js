import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import './OrderReview.css';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';

const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const history = useHistory();
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        city: '',
        postalCode: ''
    });
    const [suggestedProducts, setSuggestedProducts] = useState([]);

    useEffect(() => {
        // Get suggested products based on cart items
        if (cart.length > 0) {
            const categories = [...new Set(cart.map(item => item.category))];
            const suggestions = products
                .filter(product => 
                    categories.includes(product.category) && 
                    !cart.some(item => item.key === product.key)
                )
                .slice(0, 3);
            setSuggestedProducts(suggestions);
        }
    }, [cart, products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRemove = (key) => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);
    };

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        // Here you would typically send the order to your backend
        console.log('Order placed:', { cart, shippingInfo });
        setCart([]);
        clearTheCart();
        history.push('/placeorder');
    };

    const handleContinueShopping = () => {
        history.push('/shop');
    };

    const totalPrice = cart?.reduce((total, item) => total + (item?.price || 0), 0) || 0;
    const shipping = 5;
    const tax = totalPrice * 0.1;
    const grandTotal = totalPrice + shipping + tax;

    if (!cart || cart.length === 0) {
        return (
            <div className="review-container">
                <div className="review-header">
                    <h2>Your Cart is Empty</h2>
                    <p>Please add some items to your cart before proceeding to checkout.</p>
                    <button 
                        onClick={handleContinueShopping}
                        className="place-order-btn"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="review-container">
            <div className="review-header">
                <h2>Review Your Order</h2>
                <p>Please review your items and provide shipping information</p>
            </div>

            <div className="review-content">
                <div className="items-review">
                    <h3>Items in Cart</h3>
                    <div className="items-list">
                        {cart.map(item => (
                            <div key={item.key} className="review-item">
                                <img src={item.img} alt={item.name} />
                                <div className="item-details">
                                    <h4>{item.name}</h4>
                                    <p>Price: ${item.price}</p>
                                    <p>Category: {item.category}</p>
                                    <button 
                                        onClick={() => handleRemove(item.key)}
                                        className="remove-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {suggestedProducts.length > 0 && (
                    <div className="suggested-products">
                        <h3>You Might Also Like</h3>
                        <div className="suggested-items">
                            {suggestedProducts.map(product => (
                                <div key={product.key} className="suggested-item">
                                    <img src={product.img} alt={product.name} />
                                    <h4>{product.name}</h4>
                                    <p>${product.price}</p>
                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="add-to-cart-btn"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="shipping-form">
                    <h3>Shipping Information</h3>
                    <form onSubmit={handlePlaceOrder}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={shippingInfo.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={shippingInfo.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={shippingInfo.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={shippingInfo.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={shippingInfo.postalCode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-details">
                        <div className="summary-row">
                            <span>Items ({cart.length}):</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax:</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="order-actions">
                        <button 
                            onClick={handleContinueShopping}
                            className="continue-shopping-btn"
                        >
                            Continue Shopping
                        </button>
                        <button 
                            onClick={handlePlaceOrder}
                            className="place-order-btn"
                            disabled={cart.length === 0}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;