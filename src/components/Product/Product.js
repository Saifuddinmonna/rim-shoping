import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
const Product = (props) => {
	const { product,handleAddtoCart } = props;
	const {
		id,
		category,
		name,
		seller,
		price,
		stock,
		ratings,
		ratingsCount,
		img,
		shipping,
		quantity,
	} = product;

	return (
		<div className=" border rounded-3 p-1 shadow d-flex flex-column justify-content-between text-start">
			<img className="img-fluid rounded" src={img} alt="" />

			<div>
				<h5 className="product-headline">{name}</h5>
				<h5>price : {price}</h5>
			</div>

			<div className="text-start para ">
				<p className="fw-bolder text-primary">Manufacture : {seller}</p>
				<p>Rating : {ratings}</p>
			</div>
			<div className="colorclass rounded-bottom para">
				<button
					onClick={() => handleAddtoCart(product)}
					className=" d-block m-auto btn btn-outline-warning colorclass  text-center w-100 text-black-50">
					Add to Cart{" "}
					<FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
				</button>
			</div>
		</div>
	);
};

export default Product;
