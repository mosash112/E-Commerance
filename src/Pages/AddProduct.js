import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddProduct() {

    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    let navigate = useNavigate()

    const titleHandler = (value) => {
        setTitle(value)
    }

    const priceHandler = (value) => {
        setPrice(value)
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submited");
        axios.post('http://localhost:9000/prdocuts', {
            title, price
        })
            .then(json => {
                console.log(`successfully added product ${title}`);
                navigate('/productsTable')
            });
    }


    return (
        <>
            <h1>Add product</h1>

            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="productTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="productTitle" placeholder="product title" aria-describedby="Product title" onChange={(e) => { titleHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Price</label>
                    <input type="number" className="form-control" id="productPrice" placeholder="product price" onChange={(e) => { priceHandler(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </>

    )
}

export default AddProduct;