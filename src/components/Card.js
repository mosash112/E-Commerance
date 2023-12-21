import React from 'react';
// import ProductRating from './ProductRating';
import './css/Card.css'
import { Link } from 'react-router-dom';

class Card extends React.Component {
    render() {
        const card = this.props.product;
        return (
            <>
                <div className="card product-card" key={card.id}>
                    <Link className='link-overlay' to={`/products/${card.id}`} >
                    </Link>
                    <img src={card?.image} className="card-img-top" alt={card.title} />
                    <div className="card-body">
                        <h5 className="card-title title">{card.title}</h5>
                        <div className='fade-overflow'>
                            <p className="card-text desc">{card?.description}</p>
                        </div>
                        <p className='card-price'>price: {card.price}$</p>
                        <p className="card-rating">rating: {card?.rating?.rate}</p>
                        <p className="card-rating-count">count of ratings: {card?.rating?.count}</p>                    </div>
                    <button className="buybtn">Buy</button>
                </div>
            </>
        )
    }
}

export default Card;