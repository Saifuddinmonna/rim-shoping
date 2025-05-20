import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="container header-content">
                <div className="logo">
                    <Link to="/">E-Commerce</Link>
                </div>
                
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                </button>

                <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                    <Link to="/review" onClick={() => setIsMenuOpen(false)}>Review</Link>
                    <Link to="/inventory" onClick={() => setIsMenuOpen(false)}>Inventory</Link>
                    <Link to="/placeorder" onClick={() => setIsMenuOpen(false)}>Place Order</Link>
                    <Link to="/overview" onClick={() => setIsMenuOpen(false)}>Overview</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;