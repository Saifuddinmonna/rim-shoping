import React from 'react';
import './OrderDetails.css';

const OrderDetails = ({ cart }) => {
    // Calculate order statistics
    const totalItems = cart.length;
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;
    const highestPrice = Math.max(...cart.map(item => item.price));
    const lowestPrice = Math.min(...cart.map(item => item.price));

    // Group items by category
    const categoryGroups = cart.reduce((groups, item) => {
        const category = item.category || 'Uncategorized';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(item);
        return groups;
    }, {});

    return (
        <div className="order-details">
            <h3>Order Details</h3>
            
            <div className="order-stats">
                <div className="stat-card">
                    <h4>Items Summary</h4>
                    <p>Total Items: {totalItems}</p>
                    <p>Average Price: ${averagePrice.toFixed(2)}</p>
                    <p>Highest Price: ${highestPrice.toFixed(2)}</p>
                    <p>Lowest Price: ${lowestPrice.toFixed(2)}</p>
                </div>

                <div className="stat-card">
                    <h4>Category Breakdown</h4>
                    {Object.entries(categoryGroups).map(([category, items]) => (
                        <div key={category} className="category-item">
                            <p>{category}: {items.length} items</p>
                            <p>Subtotal: ${items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="item-list">
                <h4>Selected Items</h4>
                {cart.map(item => (
                    <div key={item.key} className="item-card">
                        <img src={item.img} alt={item.name} />
                        <div className="item-info">
                            <h5>{item.name}</h5>
                            <p>Price: ${item.price}</p>
                            <p>Category: {item.category || 'Uncategorized'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderDetails; 