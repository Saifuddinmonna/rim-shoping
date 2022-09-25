import React from "react";
import "./Singlecart.css";
const Singlecart = (props) => {
	console.log(props);
        return (
                
		<li className=" fontdiv">
			{" "}
			Name :{props.singlecart.product.name}{" "}
			<span>price :{props.singlecart.product.price}</span>{" "}
		</li>
	);
};

export default Singlecart;
