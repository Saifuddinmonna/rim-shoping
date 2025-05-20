import React, { useState, useEffect } from 'react';
import useProducts from '../../hooks/useProducts';
import './Inventory.css';

const Inventory = () => {
    const [products] = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [inventoryStats, setInventoryStats] = useState({
        totalProducts: 0,
        totalValue: 0,
        categoryCount: {},
        lowStock: []
    });

    // Calculate inventory statistics
    useEffect(() => {
        if (products.length > 0) {
            const stats = {
                totalProducts: products.length,
                totalValue: products.reduce((sum, product) => sum + product.price, 0),
                categoryCount: {},
                lowStock: []
            };

            // Count products by category
            products.forEach(product => {
                if (!stats.categoryCount[product.category]) {
                    stats.categoryCount[product.category] = 0;
                }
                stats.categoryCount[product.category]++;

                // Check for low stock (assuming stock is a property, if not, you can remove this)
                if (product.stock && product.stock < 5) {
                    stats.lowStock.push(product);
                }
            });

            setInventoryStats(stats);
        }
    }, [products]);

    // Filter and sort products
    const filteredProducts = products
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });

    // Get unique categories for filter
    const categories = ['all', ...new Set(products.map(product => product.category))];

    return (
        <div className="inventory-container">
            <div className="inventory-header">
                <h2>Inventory Management</h2>
                <div className="inventory-stats">
                    <div className="stat-card">
                        <h3>Total Products</h3>
                        <p>{inventoryStats.totalProducts}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Value</h3>
                        <p>${inventoryStats.totalValue.toFixed(2)}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Categories</h3>
                        <p>{Object.keys(inventoryStats.categoryCount).length}</p>
                    </div>
                </div>
            </div>

            <div className="inventory-controls">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filters">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Sort by Name</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="category">Sort by Category</option>
                    </select>
                </div>
            </div>

            {inventoryStats.lowStock.length > 0 && (
                <div className="low-stock-alert">
                    <h3>Low Stock Alert</h3>
                    <div className="low-stock-items">
                        {inventoryStats.lowStock.map(product => (
                            <div key={product.key} className="low-stock-item">
                                <img src={product.img} alt={product.name} />
                                <div className="item-info">
                                    <h4>{product.name}</h4>
                                    <p>Stock: {product.stock}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="inventory-grid">
                {filteredProducts.map(product => (
                    <div key={product.key} className="inventory-item">
                        <div className="item-image">
                            <img src={product.img} alt={product.name} />
                        </div>
                        <div className="item-details">
                            <h3>{product.name}</h3>
                            <p className="category">{product.category}</p>
                            <p className="price">${product.price}</p>
                            {product.stock && (
                                <p className={`stock ${product.stock < 5 ? 'low-stock' : ''}`}>
                                    Stock: {product.stock}
                                </p>
                            )}
                            <div className="item-actions">
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="no-results">
                    <p>No products found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Inventory;