import React from 'react';
import './css/Card.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../rtk/slices/cart-slice';

function Card(props) {
    const card = props.product;
    const dispatch = useDispatch();

    return (
        <>
            <div className="card product-card" key={card.id}>
                <Link className='link-overlay' to={`/products/${card.id}`} >
                </Link>
                <img src={card?.image} className="card-img-top" alt={card.title} />
                <div className="card-body">
                    <h5 className="card-title title">{card?.title?.slice(0, 30)}</h5>
                    <div className='fade-overflow'>
                        <p className="card-text desc">{card?.description}</p>
                    </div>
                    <p className='card-price'>price: {card.price}$</p>
                    <p className="card-rating">rating: {card?.rating?.rate}</p>
                    <p className="card-rating-count">count of ratings: {card?.rating?.count}</p>                    </div>
                <button className="buybtn" onClick={()=>{dispatch(addToCart(card))}}>Add to Cart</button>
            </div >
        </>
    )
}

export default Card;