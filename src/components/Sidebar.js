import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Sidebar() {
    const [categories, setCategories] = useState([]);
    const api_url = 'https://my-store-api-eipk.onrender.com/products'

    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = () => {
        fetch(`${api_url}/categories`)
            .then(response => response.json())
            .then(data => { setCategories(data) })
            .catch(error => console.error('Error fetching categories:', error));
    }

    return (
        <div className="collapse collapse-horizontal" id="collapseWidthExample">
            <ul className="list-unstyled sidebar">
                <li>
                    <Link to="products">get all products</Link>
                </li>
                <ul className='list-unstyled'>
                    <li>Filters</li>
                    {categories.map((category) => {
                        return (
                            <li key={category._id}>
                                <Link to={`products/categories/${category._id}`}>{category.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </ul>
        </div>
    )
}

export default Sidebar