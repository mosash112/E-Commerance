import React from 'react';
import './css/Card.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../rtk/slices/cart-slice';
import Swal from 'sweetalert2';

function Card(props) {
    const card = props.product;
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const token = useSelector(state => state.user.token)

    const AddProduct = () => {
        if (token) {
            dispatch(addToCart(card))
        }else{
            Swal.fire({
                title: `login needed`,
                text:'you need to login to add products to your cart',
                showCancelButton: true
            }).then((data) => {
                if (data.isConfirmed) {
                    navigate('/login')
                }
            })
        }
    }

    return (
        <>
            <div className="card product-card" key={card._id}>
                <Link className='link-overlay' to={`/products/${card._id}`} >
                </Link>
                <img src={card?.image} className="card-img-top" alt={card.title} />
                <div className="card-body">
                    <h5 className="card-title title">{card?.title?.slice(0, 30)}</h5>
                    <div className='fade-overflow'>
                        <p className="card-text desc">{card?.description}</p>
                    </div>
                    <p className='card-stock'>{card?.stock} left in stock</p>
                    <p className='card-price'>price: {card.price}$</p>
                    <p className="card-rating">rating: {card?.rate} ({card?.count})</p>
                </div>
                <button className="buybtn" onClick={() => AddProduct()}>Add to Cart</button>
            </div >
        </>
    )
}

export default Card;