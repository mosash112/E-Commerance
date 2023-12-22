import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddProduct() {

    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [description, setDesc] = useState();
    const [price, setPrice] = useState();
    const [rate, setRate] = useState();
    const [count, setCount] = useState();
    let navigate = useNavigate()
    const api_url = 'https://fakestoreapi.com/products'

    const imageHandler = (event) => {
        const file = event.target.files[0]; // Access the selected file

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result; // Get the image data (base64 format)
                // Perform actions with the selected image data (e.g., display, upload, etc.)
                setImage(imageData) // Just an example, you can perform other actions here
            };
            reader.readAsDataURL(file); // Convert the selected file to a data URL (base64)
        }
    };

    const titleHandler = (value) => {
        setTitle(value)
    }

    const categoryHandler = (value) => {
        setCategory(value)
    }

    const descHandler = (value) => {
        setDesc(value)
    }

    const priceHandler = (value) => {
        setPrice(value)
    }

    const rateHandler = (value) => {
        setRate(value)
    }

    const countHandler = (value) => {
        setCount(value)
    }


    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submited");
        axios.post(api_url, {
            title, price, description, category, image, rating:{rate, count}
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
                    <label htmlFor="productImage" className="form-label">Image</label>
                    <span className="text-success"> (400px*400px)</span>
                    <input type="file" className="form-control" id="productImage" accept="image/*" placeholder="product image" aria-describedby="Product image" onChange={imageHandler} />
                    {image && <img src={image} alt="Selected" className="w-25 mt-3" />}
                </div>
                <div className="mb-3">
                    <label htmlFor="productTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="productTitle" placeholder="product title" aria-describedby="Product title" onChange={(e) => { titleHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productDesc" className="form-label">Description</label>
                    <textarea className="form-control" id="productDescription" name="productDescription" placeholder="product description" rows="4" cols="50" onChange={(e) => { descHandler(e.target.value) }}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="productCategory" className="form-label">Category</label>
                    <input type="text" className="form-control" id="productCategory" placeholder="product category" aria-describedby="Product category" onChange={(e) => { categoryHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Price</label>
                    <input type="number" className="form-control" id="productPrice" placeholder="product price" onChange={(e) => { priceHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productRate" className="form-label">Rate</label>
                    <input type="number" className="form-control" id="productRate" placeholder="product rate" onChange={(e) => { rateHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productCount" className="form-label">Count</label>
                    <input type="number" className="form-control" id="productCount" placeholder="product count" onChange={(e) => { countHandler(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </>

    )
}

export default AddProduct;