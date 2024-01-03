import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { url } from '../env.json';

function AddCategory() {

    const [name, setName] = useState();
    let navigate = useNavigate()
    const token = useSelector(state => state.user.token)
    const api_url = url + 'products/categories'

    const nameHandler = (value) => {
        setName(value)
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submited");
        const headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
        axios.post(api_url, { name }, { headers: headers })
            .then(json => {
                console.log(`successfully added category ${name}`);
                navigate('/categoriesTable')
            });
    }


    return (
        <>
            <h1>Add category</h1>

            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="categoryName" placeholder="category name" aria-describedby="category name" onChange={(e) => { nameHandler(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">Add Category</button>
            </form>
        </>

    )
}

export default AddCategory;