import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../components/css/ProductDetails.css';
import { PRODUCTS_ENDPOINT } from '../env';

function ProductDetails() {
    const params = useParams();
    const [product, setProduct] = useState({})
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProduct()
        getAllCategories()
    }, [])

    const getProduct = () => {
        fetch(`${PRODUCTS_ENDPOINT}/${params.productId}`)
            .then(res => res.json())
            .then(json => { setProduct(json.product) })
    }

    const getAllCategories = () => {
        fetch(`${PRODUCTS_ENDPOINT}/categories`)
            .then(response => response.json())
            .then(data => { setCategories(data); console.log(); })
            .catch(error => console.error('Error fetching categories:', error));
    }

    return (
        <>
            <h1 className="text-center p-3">Product Details</h1>
            <div className="product-details">
                <div className="img-title">
                    <img src={product?.image} className="" alt={product.title} />
                    <h2 className="product-title">{product.title}</h2>
                </div>
                <p className="product-text">{product?.description}</p>
                <p className='product-category'>category: {categories.find(cat => cat._id === product?.category)?.name}</p>
                <p className="product-stock">{product.stock} left in stock</p>
                <p className='product-price'>price: {product.price}$</p>
                <p className="product-rating">rating: {product?.rate} ({product?.count})</p>
            </div>

        </>
    );
}

export default ProductDetails;