import React from "react";
import logo from "../../images/Logo.svg";
import "./Header.css";
const Header = () => {
	return (
		<div>
		
			<nav className="naber-container container-fluid">
				<img src={logo} alt="" />
				<div className="text-white ancor-div btn" >
					<a href="/Shop">Shop</a>
					<a href="/Order"> Order</a>
					<a href="Inventory">Invertory</a>
					<a href="About">About</a>
				</div>
			</nav>
		</div>
	);
};

export default Header;
