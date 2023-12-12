import React from 'react';
import ProductRating from './ProductRating';
import './Card.css'

class Card extends React.Component {
    render(){
        const card = this.props.product;
        return(
            <div className='product-card' key={card.id}>
                <img src={card.image} alt={card.desc}></img>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span>price: {card.price}</span>
                <ProductRating rate={card.rating.rate} count={card.rating.count}/>
                <button onClick={()=>{console.log("you are going to buy",card.title);}}>Buy</button>
            </div>
        )
    }
}

export default Card;