import React from 'react';
import Button from './Button';

class Card extends React.Component {
    render(){
        return(
            <div className='product-card'>
                <h1>{this.props.title}</h1>
                <p>{this.props.description}</p>
                <span>{this.props.price}</span>
                <Button title="Details"></Button>
            </div>
        )
    }
}

export default Card;