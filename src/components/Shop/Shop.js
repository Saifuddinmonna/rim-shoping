import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Shop.css";
import Cart from "../Cart/Cart";
import { addToDb, getLocalStorage } from "../../utilities/fakedb";
const Shop = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	useEffect(() => {
		fetch("products.json")
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);
	useEffect(() => {
		const localStorage = getLocalStorage();
		console.log("localstorage", localStorage);
		const saveCart = [];
		for (const id in localStorage) {
			console.log("id in", id);
			const newproduct = products.find((product) => product.id === id);

			if (newproduct) {
				saveCart.push(newproduct);
				const quantity = localStorage[id];
				console.log("quantuty", quantity);
				newproduct.quantity = quantity;
			}
		}
		console.log("savecaert", saveCart);
		setCart(saveCart);
	}, [products]);
	const handleAddtoCart = (selectProduct) => {
		let newCart = [];
		const exists = cart.find((product) => product.id === selectProduct.id);
		if (!exists) {
			selectProduct.quantity = 1;
			newCart = [...cart, selectProduct];
		}
		else {
			const rest = cart.filter(
				(product) => product.id !== selectProduct.id,
			);
			exists.quantity = exists.quantity + 1;
			newCart = [...rest, exists];
		}
	
		setCart(newCart);
		addToDb(selectProduct.id);
		console.log(cart);
	};

	return (
		<div className="products-main-div">
			<div className="cart-container border container griddiv  ">
				{ products.map((product) => (
					<Product
						key={ product.id }
						handleAddtoCart={ handleAddtoCart }
						product={ product }></Product>
				)) }
			</div>

			<div className="linespacing border orderfirst m-1 p-1 border rounded-3 shadow">
				<h5>Total Products list { products.length }</h5>
				<Cart cart={ cart }></Cart>
			</div>
		</div>
	);
};
export default Shop;
