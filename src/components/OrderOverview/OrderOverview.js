import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './OrderOverview.css';

const OrderOverview = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        // Simulate fetching orders from localStorage
        try {
            const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
            setOrders(savedOrders);
        } catch (err) {
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleViewDetails = (orderId) => {
        history.push(`/order/${orderId}`);
    };

    if (loading) {
        return (
            <div className="order-overview-container">
                <div className="loading">Loading orders...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-overview-container">
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="order-overview-container">
            <div className="order-overview-header">
                <h2>Order Overview</h2>
                <div className="order-stats">
                    <div className="stat-card">
                        <h3>Total Orders</h3>
                        <p>{orders.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Value</h3>
                        <p>${orders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Average Order</h3>
                        <p>${(orders.reduce((sum, order) => sum + (order.total || 0), 0) / (orders.length || 1)).toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="orders-list">
                {orders.length === 0 ? (
                    <div className="no-orders">
                        <p>No orders found.</p>
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <h3>Order #{order.id}</h3>
                                <span className={`order-status ${order.status?.toLowerCase()}`}>
                                    {order.status || 'Pending'}
                                </span>
                            </div>
                            <div className="order-details">
                                <div className="order-info">
                                    <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                                    <p><strong>Items:</strong> {order.items?.length || 0}</p>
                                    <p><strong>Total:</strong> ${order.total?.toFixed(2) || '0.00'}</p>
                                </div>
                                <div className="order-actions">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => handleViewDetails(order.id)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderOverview; 