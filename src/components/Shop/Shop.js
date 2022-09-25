import React, { useEffect, useState} from "react";
import Product from "../Product/Product";
import "./Shop.css";
import Singlecart from '../Singlecart/Singlecart'
const Shop = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	useEffect(() => {
		fetch('products.json')
			.then((res) => res.json())
			.then((data) => setProducts(data))
	}, []);
	const handleAddtoCart = (product) => {
		
		const newCart = [...cart, product];
		setCart(newCart);
	}

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

			<div className="products-container border orderfirst m-1 p-1 border rounded-3 shadow">
				<div  className=" fixposition p-2 text-start">
					<h4>Total Products list {products.length}</h4>

					<h5 className="text-primary text-decoration-underline">
						Order Summary{" "}
					</h5>
					<p className="fw-bolder selecteditem"> Selected Items : {cart.length}</p>
					{cart.map((singlecart) => (
						<ul>
							<Singlecart
								singlecart={singlecart}
								key={singlecart.id}></Singlecart>
						</ul>
					))}
				</div>
			</div>
		</div>
	);
};

export default Shop;
