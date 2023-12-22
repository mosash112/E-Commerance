import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function EditProduct() {
    const params = useParams();
    const api_url = 'https://fakestoreapi.com/products';
    const [product, setProduct] = useState({})
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    let navigate = useNavigate()

    useEffect(() => {
        fetch(`${api_url}/${params.productId}`)
            .then(res => res.json())
            .then(json => setProduct(json))
    }, [])

    const titleHandler = (value) => {
        setTitle(value)
    }

    const priceHandler = (value) => {
        setPrice(value)
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submited");
        axios.put(`${api_url}/${product.id}`, {
            title, price
        })
            .then(json => {
                console.log(`successfully updated product ${title}`);
                navigate('/productsTable')
            });
    }


    return (
        <>
            <h1>Edit product</h1>

            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="productTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="productTitle" placeholder={product.title} aria-describedby="Product title" onChange={(e) => { titleHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Price</label>
                    <input type="number" className="form-control" id="productPrice" placeholder={product.price} onChange={(e) => { priceHandler(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">Update Product</button>
            </form>
        </>

    )
}

export default EditProduct;