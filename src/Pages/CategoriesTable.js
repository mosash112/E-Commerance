import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../components/css/Table.css';
import Swal from 'sweetalert2';

function CategoriesTable() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = () => {
        fetch('http://localhost:9000/categories')
            .then(res => res.json())
            .then(json => {
                setCategories(json);
            })
    }

    const deleteCategory = (category) => {
        Swal.fire({
            title: `you are sure you want to delete ${category.title} ?`,
            showCancelButton: true
        }).then((data) => {
            if (data.isConfirmed) {
                fetch(`http://localhost:9000/categories/${category.id}`, { method: "DELETE" })
                    .then(res => res.json())
                    .then(json => {
                        console.log(`successfully deleted category #${category.id}`);
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
                    {categories.map((category) => {
                        return (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category?.title}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => { deleteCategory(category) }}>Delete</button>
                                    {/* <Link to={`/categories/${category.id}`} className="btn btn-info btn-sm">View</Link> */}
                                    <Link to={`/categories/edit/${category.id}`} className="btn btn-primary btn-sm">Edit</Link>
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