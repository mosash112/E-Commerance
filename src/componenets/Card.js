import React from 'react';

class Card extends React.Component {
    render(){
        return(
            <div className='product-card'>
                <h1>{this.props.title}</h1>
                <p>{this.props.description}</p>
                <span>{this.props.price}</span>
            </div>
        )
    }
}

export default Card;