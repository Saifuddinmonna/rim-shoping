import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/Logo.svg";
import "./Header.css";
const Header = () => {
	return (
		<div>
			<nav className="naber-container container-fluid">
				<img src={logo} alt="" />
				<div className="text-white ancor-div btn">
					<NavLink to="/Shop">Shop</NavLink>
					<NavLink to="/Order"> Order</NavLink>
					<NavLink to="/Inventory">Invertory</NavLink>
					<NavLink to="/About">About</NavLink>
				</div>
			</nav>
		</div>
	);
};

export default Header;
