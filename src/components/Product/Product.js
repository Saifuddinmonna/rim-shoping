import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {   faShoppingCart} from "@fortawesome/free-solid-svg-icons";
const Product = (props) => {
	const { handleAddtoCart } = props;
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
	} = props.product;
	
	
	return (
		<div className="m-3 border rounded-3 p-1 shadow d-flex flex-column justify-content-between text-start">
			<img className="img-fluid rounded" src={img} alt="" />

			<div>
				<h5>{name}</h5>
				<h5>price : {price}</h5>
			</div>

			<div className="text-start para ">
				<p className="fw-bolder text-primary">Manufacture : {seller}</p>
				<p>Rating : {ratings}</p>
			</div>
			<div className="colorclass rounded-bottom para">
				<button
					onClick={() => handleAddtoCart(props)}
					className="d-block m-auto btn btn-outline-warning colorclass px-5 text-center w-100 text-black-50">
					Add to Cart <FontAwesomeIcon  icon={faShoppingCart}></FontAwesomeIcon>
				</button>
			</div>
		</div>
	);
};

export default Product;
