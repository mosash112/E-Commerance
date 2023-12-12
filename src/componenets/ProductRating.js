import React from 'react';

class ProductRating extends React.Component {
    render(){
        return(
            <div className='product-rating'>
                <span>rating: {this.props.rate}</span>
                <br></br>
                <span>count: {this.props.count}</span>
            </div>
        )
    }
}

export default ProductRating;