import { parse } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import "./Cart.css";
import Name from "../Name/Name";

const Cart = ({ cart }) => {
	console.log("cart", cart);
	let total = 0;
	let shiping = 0;
	let quantity = 0;
	for (const product of cart) {
		quantity = quantity + product.quantity;
		total = total + product.price * product.quantity;
		shiping = shiping + product.shipping * product.quantity;
	}

	const Tax = total * 0.1 * quantity.toFixed(2);
	const grandtotal = total + shiping + parseInt(Tax);
	console.log(typeof grandtotal);
	return (
		<div className=" fixposition p-2 text-start ">
			<h5 className="text-primary text-decoration-underline">
				Order Summary{" "}
			</h5>

			<p> Total price : $ {total}</p>
			<p>Total Shipping Charge: $ {shiping}</p>
			<p>Tax : $ {Tax}</p>
			<p>Grand Total: $ {grandtotal}</p>
			<p className="fw-bolder selecteditem">
				{" "}
				Selected Items : {quantity}
			</p>
			{cart.map((product) => (
				<Name name={ product.name }
				quantity={product.quantity}></Name>
			))}
		</div>
	);
};

export default Cart;
