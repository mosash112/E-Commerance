import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../components/css/ProductDetails.css';

function ProductDetails() {
    const params = useParams();
    const api_url = 'http://localhost:9000/prdocuts';
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch(`${api_url}/${params.productId}`)
            .then(res => res.json())
            .then(json => setProduct(json))
    }, [])

    return (
        <>
            <h1 className="text-center p-3">Product Details #{product.id}</h1>
            <div className="product-details">
                <div className="img-title">
                    <img src={product?.image} className="" alt={product.title} />
                    <h2 className="product-title">{product.title}</h2>
                </div>
                <p className="product-text">{product?.description}</p>
                <p className='product-price'>price: {product.price}$</p>
                <p className="product-rating">rating: {product?.rating?.rate}</p>
                <p className="product-rating-count">count of ratings: {product?.rating?.count}</p>
            </div>

        </>
    );
}

export default ProductDetails;