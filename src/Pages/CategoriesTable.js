import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../components/css/Table.css';
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import { url } from '../env.json';

function CategoriesTable() {
    const [categories, setCategories] = useState([]);
    const api_url = url + 'products/categories'
    const token = useSelector((state) => state.user.token)

    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = () => {
        fetch(api_url)
            .then(res => res.json())
            .then(json => {
                setCategories(json);
            })
    }

    const deleteCategory = (category) => {
        Swal.fire({
            title: `you are sure you want to delete ${category.name} ?`,
            showCancelButton: true
        }).then((data) => {
            if (data.isConfirmed) {
                const headers = {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
                fetch(`${api_url}/${category._id}`, { method: "DELETE", headers: headers })
                    .then(res => res.json())
                    .then(json => {
                        console.log(`successfully deleted category #${category._id}`);
                        getAllCategories();
                    });
            }
        })
    }

    return (
        <>
            <h2 className="text-center p-3">Our categories</h2>
            <Link to={'/categoriesTable/add'} className="btn btn-success mt-3">Add New Category</Link>
            <table className="table table-striped table-hover mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => {
                        return (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>{category?.name}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => { deleteCategory(category) }}>Delete</button>
                                    <Link to={`/products/categories/${category._id}`} className="btn btn-info btn-sm">View</Link>
                                    <Link to={`/categories/edit/${category._id}`} className="btn btn-primary btn-sm">Edit</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default CategoriesTable;