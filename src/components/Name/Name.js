import React from "react";
import "./Name.css";
const Name = (props) => {
	console.log("quntity", props);

	return (
		<ol className="fs-small text-primary fontstyle">
			<table className="table table-bordered table-hover table-responsive table-warning opacity-50  toggle__label rounded-3 table-striped table">
				<thead>
					<tr>
						<td className="linespacing">{props.name}</td>
						<td>{props.quantity}</td>
					</tr>
				</thead>
			</table>
		</ol>
	);
};

export default Name;
