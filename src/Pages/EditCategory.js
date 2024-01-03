import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { url } from '../env.json';

function EditCategory() {
    const params = useParams();
    const api_url = 'https://my-store-api-eipk.onrender.com/products/categories';
    const [category, setCategory] = useState({})
    const [name, setName] = useState();
    let navigate = useNavigate()
    const token = useSelector(state => state.user.token)

    useEffect(() => {
        fetch(`${api_url}/${params.categoryId}`)
            .then(res => res.json())
            .then(json => setCategory(json))
    }, [])

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
        axios.patch(`${api_url}/${category._id}`, [{
            propName:
                'name', value: name
        }], { headers: headers })
            .then(json => {
                console.log(`successfully updated category ${name}`);
                navigate('/categoriesTable')
            });
    }


    return (
        <>
            <h1>Edit category</h1>

            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="categoryName" placeholder={category.name} aria-describedby="category name" onChange={(e) => { nameHandler(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">Update Category</button>
            </form>
        </>

    )
}

export default EditCategory;