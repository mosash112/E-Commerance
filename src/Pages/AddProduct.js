import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { url } from '../env.json';

function AddProduct() {

    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [description, setDesc] = useState();
    const [stock, setStock] = useState();
    const [price, setPrice] = useState();
    const [rate, setRate] = useState();
    const [count, setCount] = useState();
    let navigate = useNavigate()
    const api_url = url + 'products'
    const token = useSelector(state => state.user.token)
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${api_url}/categories`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

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

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    }

    const descHandler = (value) => {
        setDesc(value)
    }

    const stockHandler = (value) => {
        setStock(value)
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
        const headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
        const product = {
            title, price, description, selectedCategory, stock, image, rate, count
        }
        axios.post(api_url, product, { headers: headers })
            .then(json => {
                // console.log("added product: "+product);
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
                    <select value={selectedCategory} onChange={(e) => { handleCategoryChange(e.target.value) }}>
                        <option value="">Select a category...</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="productStock" className="form-label">Stock</label>
                    <input type="number" className="form-control" id="productStock" placeholder="product stock" onChange={(e) => { stockHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Price</label>
                    <input type="number" step="any" className="form-control" id="productPrice" placeholder="product price" onChange={(e) => { priceHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productRate" className="form-label">Rate</label>
                    <input type="number" step="any" className="form-control" id="productRate" placeholder="product rate" onChange={(e) => { rateHandler(e.target.value) }} />
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