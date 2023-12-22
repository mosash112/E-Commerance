import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddCategory() {

    const [title, setTitle] = useState();
    let navigate = useNavigate()
    const api_url = 'https://fakestoreapi.com/products/categories'

    const titleHandler = (value) => {
        setTitle(value)
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submited");
        axios.post(api_url, {
            title
        })
            .then(json => {
                console.log(`successfully added category ${title}`);
                navigate('/categoriesTable')
            });
    }


    return (
        <>
            <h1>Add category</h1>

            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="categoryTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="categoryTitle" placeholder="category title" aria-describedby="category title" onChange={(e) => { titleHandler(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">Add Category</button>
            </form>
        </>

    )
}

export default AddCategory;