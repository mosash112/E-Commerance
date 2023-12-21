import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function EditCategory() {
    const params = useParams();
    const api_url = 'http://localhost:9000/categories';
    const [category, setCategory] = useState({})
    const [title, setTitle] = useState();
    let navigate = useNavigate()

    useEffect(() => {
        fetch(`${api_url}/${params.categoryId}`)
            .then(res => res.json())
            .then(json => setCategory(json))
    }, [])

    const titleHandler = (value) => {
        setTitle(value)
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submited");
        axios.put(`${api_url}/${category.id}`, {
            title
        })
            .then(json => {
                console.log(`successfully updated category ${title}`);
                navigate('/categoriesTable')
            });
    }


    return (
        <>
            <h1>Edit category</h1>

            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="categoryTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="categoryTitle" placeholder={category.title} aria-describedby="category title" onChange={(e) => { titleHandler(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">Update Category</button>
            </form>
        </>

    )
}

export default EditCategory;