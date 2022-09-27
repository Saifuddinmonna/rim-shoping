import React from 'react';
import './Name.css';
const Name = (props) => {
        console.log(typeof cart)
        
       
	return (
		<ol className='fs-small text-primary fontstyle'>
			<li className="linespacing">
				{" "}
				<span> {}</span> {props.name}
			</li>
		</ol>
	);
};

export default Name;