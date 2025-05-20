import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import Rating from 'react-rating';

const Product = (props) => {
    // console.log(props);
    const { name, img, seller, price, stock, star } = props.product;

    return (
        <div className="product">
            <img src={img} alt={name} />
            <div>
                <h4 className="product-name">{name}</h4>
                <p className="seller-info">by: {seller}</p>
                <p className="price">${price}</p>
                <p className="stock-info">Only {stock} left in stock - order soon</p>
                <Rating
                    initialRating={star}
                    emptySymbol="far fa-star icon-color"
                    fullSymbol="fas fa-star icon-color"
                    readonly
                />
                <button
                    onClick={() => props.handleAddToCart(props.product)}
                    className="btn-regular"
                >
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Product;