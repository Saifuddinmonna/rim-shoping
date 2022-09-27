import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Shop.css";
import Cart from "../Cart/Cart";
import { addToDb } from "../../utilities/fakedb";
const Shop = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	useEffect(() => {
		fetch("products.json")
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);
	const handleAddtoCart = (product) => {
		const newCart = [...cart, product];
		setCart(newCart);
		addToDb(product.id)
		console.log(product);
	};
	
	return (
		<div className="products-main-div">
			<div className="cart-container border container griddiv  ">
				{products.map((product) => (
					<Product
						key={product.id}
						handleAddtoCart={handleAddtoCart}
						product={product}></Product>
				))}
			</div>

			<div className="linespacing border orderfirst m-1 p-1 border rounded-3 shadow">
				<h5>Total Products list {products.length}</h5>
				<Cart cart={cart}></Cart>
			</div>
		</div>
	);
};

export default Shop;
