import React from 'react';
import ProductRating from './ProductRating';
import './Card.css'

class Card extends React.Component {
    render(){
        const card = this.props.product;
        return(
            <div className='product-card' key={card.id}>
                <img src={card.image} alt={card.desc}></img>
                <h3 className='title'>{card.title}</h3>
                <div className='fade-overflow'>
                    <p className='desc'>{card.description}</p>
                </div>
                <span>price: {card.price}</span>
                <ProductRating rate={card.rating.rate} count={card.rating.count}/>
                <button className='buybtn' onClick={()=>{console.log("you are buying",card.title);}}>Buy</button>
            </div>
        )
    }
}

export default Card;