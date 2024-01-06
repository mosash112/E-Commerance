import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { CATEGORIES_ENDPOINT } from "../env";
import { useSelector } from "react-redux";


function Sidebar() {
    const [categories, setCategories] = useState([]);
    const user = useSelector(state => state.user.user)
    const token = useSelector(state => state.user.token)

    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = () => {
        fetch(CATEGORIES_ENDPOINT)
            .then(response => response.json())
            .then(data => { setCategories(data) })
            .catch(error => console.error('Error fetching categories:', error));
    }

    if (user?.admin && token) { // if admin
        return (
            <div className="collapse collapse-horizontal admin-sidebar" id="collapseWidthExample">
                <ul className="list-unstyled sidebar">
                    <li>
                        <Link to="productsTable">Product Table</Link>
                    </li>
                    <li>
                        <Link to="CategoriesTable">Categories Table</Link>
                    </li>
                </ul>
            </div>
        )
    } else { // if regular user
        return (
            <div className="collapse collapse-horizontal user-sidebar" id="collapseWidthExample">
                <ul className="list-unstyled sidebar">
                    <h5>Filters</h5>
                    <li>
                        <Link to="products">All</Link>
                    </li>
                    {/* <ul className='list-unstyled'> */}
                    {categories.map((category) => {
                        return (
                            <li key={category._id}>
                                <Link to={`products/categories/${category._id}`}>{category.name}</Link>
                            </li>
                        )
                    })}
                    {/* </ul> */}
                </ul>
            </div>
        )
    }
}

export default Sidebar