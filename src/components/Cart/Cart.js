import { parse } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import "./Cart.css";
import Name from "../Name/Name";

const Cart = ({cart}) => {
	
	let total = 0;
	let shiping = 0;
	
	for (const product of cart) {
		total = total +product.price;
		shiping = shiping + product.shipping;

		
		
		
	}
		
	const Tax=(total*.1).toFixed(2)
	const grandtotal = total + shiping + parseInt(Tax);
	console.log(typeof grandtotal)
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
				Selected Items : {cart.length}
			</p>
			{cart.map((product) => (
				
					<Name name={product.name}></Name>
				
			))}
		</div>
	);
};

export default Cart;
