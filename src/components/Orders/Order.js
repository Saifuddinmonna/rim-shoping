import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Name from '../Name/Name';

const Order = () => {
        const cart = useLoaderData();
        console.log('cartcart',cart)
        return (
                <div>
                        <h2>This is order page</h2>  
                        <Name ></Name>
                </div>
        );
};

export default Order;