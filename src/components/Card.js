import React from 'react';
// import ProductRating from './ProductRating';
import './Card.css'
import { Link } from 'react-router-dom';

class Card extends React.Component {
    render() {
        const card = this.props.product;
        return (
            <>
                <div className="card product-card" key={card.id}>
                    <img src={card.image} className="card-img-top" alt={card.title} />
                    <div className="card-body">
                        <h5 className="card-title title">{card.title}</h5>
                        <div className='fade-overflow'>
                            <p className="card-text desc">{card.description}</p>
                        </div>
                        <p>price: {card.price}$</p>
                        {/* <ProductRating rate={card.rating.rate} count={card.rating.count} /> */}
                        {this.props.showButton && <Link className="detailsbtn btn btn-primary" to={`/products/${card.id}`} >Details</Link>}
                    </div>
                </div>
            </>
        )
    }
}

export default Card;