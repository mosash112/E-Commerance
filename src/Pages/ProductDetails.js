import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../components/css/ProductDetails.css';

function ProductDetails() {
    const params = useParams();
    const api_url = 'http://localhost:9000/products';
    const [product, setProduct] = useState({})
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProduct()
        getAllCategories()
    }, [])

    const getProduct = () => {
        fetch(`${api_url}/${params.productId}`)
            .then(res => res.json())
            .then(json => { setProduct(json.product) })
    }

    const getAllCategories = () => {
        fetch(`${api_url}/categories`)
            .then(response => response.json())
            .then(data => { setCategories(data); console.log(); })
            .catch(error => console.error('Error fetching categories:', error));
    }

    return (
        <>
            <h1 className="text-center p-3">Product Details #{product._id}</h1>
            <div className="product-details">
                <div className="img-title">
                    <img src={product?.image} className="" alt={product.title} />
                    <h2 className="product-title">{product.title}</h2>
                </div>
                <p className="product-text">{product?.description}</p>
                <p className='product-category'>category: {categories.find(cat=>cat._id===product?.category)?.name}</p>
                <p className="product-stock">{product.stock} left in stock</p>
                <p className='product-price'>price: {product.price}$</p>
                <p className="product-rating">rating: {product?.rate} ({product?.count})</p>
            </div>

        </>
    );
}

export default ProductDetails;