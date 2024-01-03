import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { url } from '../env.json';

function EditProduct() {
    const params = useParams();
    const api_url = url + 'products';
    const [product, setProduct] = useState({})
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [description, setDesc] = useState();
    const [stock, setStock] = useState();
    const [price, setPrice] = useState();
    const [rate, setRate] = useState();
    const [count, setCount] = useState();
    let navigate = useNavigate()
    const token = useSelector((state) => state.user.token)
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProduct()
        getAllCategories()
    }, [])

    const getProduct = () => {
        fetch(`${api_url}/${params.productId}`)
            .then(res => res.json())
            .then(json => { setProduct(json.product); console.log(json.product); })
    }

    const getAllCategories = () => {
        fetch(`${api_url}/categories`)
            .then(response => response.json())
            .then(data => { setCategories(data) })
            .catch(error => console.error('Error fetching categories:', error));
    }

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
        product.title = value
        setTitle(value)
    }

    const handleCategoryChange = (value) => {
        product.category = value
        setSelectedCategory(value);
    }

    const descHandler = (value) => {
        product.description = value
        setDesc(value)
    }

    const stockHandler = (value) => {
        product.stock = value
        setStock(value)
    }

    const priceHandler = (value) => {
        product.price = value
        setPrice(value)
    }

    const rateHandler = (value) => {
        product.rate = value
        setRate(value)
    }

    const countHandler = (value) => {
        product.count = value
        setCount(value)
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submited");
        const headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
        axios.patch(`${api_url}/${product._id}`, [{
            propName:
                'title', value: title
        }, {
            propName:
                'price', value: product.price
        }, {
            propName:
                'description', value: product.description
        }, {
            propName:
                'stock', value: product.stock
        }, {
            propName:
                'category', value: product.category
        }, {
            propName:
                'image', value: product.image
        }, {
            propName:
                'rate', value: product.rate
        }, {
            propName:
                'count', value: product.count
        }], { headers: headers })
            .then(json => {
                console.log("edited product: " + product);
                console.log(`successfully updated product ${product.title}`);
                navigate('/productsTable')
            });
    }


    return (
        <>
            <h1>Edit product</h1>

            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">Image</label>
                    <span className="text-success"> (400px*400px)</span>
                    <input type="file" className="form-control" id="productImage" accept="image/*" placeholder="product image" aria-describedby="Product image" onChange={imageHandler} />
                    {image && <img src={image} alt="Selected" className="w-25 mt-3" />}
                </div>
                <div className="mb-3">
                    <label htmlFor="productTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="productTitle" value={product.title} aria-describedby="Product title" onChange={(e) => { titleHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productDesc" className="form-label">Description</label>
                    <textarea className="form-control" id="productDescription" name="productDescription" value={product.description} rows="4" cols="50" onChange={(e) => { descHandler(e.target.value) }}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="productCategory" className="form-label">Category</label>
                    <select value={product.category} onChange={(e) => { handleCategoryChange(e.target.value) }}>
                        {/* <option value="">Select a category...</option> */}
                        {categories.map(category => (
                            < option key={category._id} value={category._id} >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="productStock" className="form-label">Stock</label>
                    <input type="number" className="form-control" id="productStock" value={product?.stock} onChange={(e) => { stockHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Price</label>
                    <input type="number" step="any" className="form-control" id="productPrice" value={product.price} onChange={(e) => { priceHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productRate" className="form-label">Rate</label>
                    <input type="number" step="any" className="form-control" id="productRate" value={product?.rate} onChange={(e) => { rateHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productCount" className="form-label">Count</label>
                    <input type="number" className="form-control" id="productCount" value={product?.count} onChange={(e) => { countHandler(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">Update Product</button>
            </form >
        </>

    )
}

export default EditProduct;