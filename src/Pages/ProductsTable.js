import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../components/css/Table.css';
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import { url } from '../env.json';

function ProductsTable() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const api_url = 'https://my-store-api-eipk.onrender.com/products';
    const token = useSelector((state) => state.user.token)

    useEffect(() => {
        getAllProducts()
        getAllCategories()
    }, [])

    const getAllProducts = () => {
        fetch(api_url)
            .then(res => res.json())
            .then(json => {
                setProducts(json.products);
            })
    }

    const getAllCategories = () => {
        fetch(`${api_url}/categories`)
            .then(response => response.json())
            .then(data => { setCategories(data); console.log(); })
            .catch(error => console.error('Error fetching categories:', error));
    }

    const deleteProduct = (product) => {
        Swal.fire({
            title: `you are sure you want to delete ${product.title} ?`,
            showCancelButton: true
        }).then((data) => {
            if (data.isConfirmed) {
                const headers = {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
                fetch(`${api_url}/${product._id}`, { method: "DELETE", headers: headers })
                    .then(res => res.json())
                    .then(json => {
                        console.log(`successfully deleted product #${product._id}`);
                        getAllProducts();
                    });
            }
        })
    }

    return (
        <>
            <h2 className="text-center p-3">Our products</h2>
            <Link to={'/productsTable/add'} className="btn btn-success mt-3">Add New Product</Link>
            <table className="table table-striped table-hover mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => {
                        return (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td><img src={product.image} alt="Selected" className="w-25 mt-3" /></td>
                                <td>{product?.title?.slice(0, 30)}...</td>
                                <td>{
                                    categories.find(cat => cat._id === product?.category)?.name
                                }</td>
                                <td>{product?.description?.slice(0, 50)}...</td>
                                <td>{product.price}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => { deleteProduct(product) }}>Delete</button>
                                    <Link to={`/products/${product._id}`} className="btn btn-info btn-sm">View</Link>
                                    <Link to={`/products/edit/${product._id}`} className="btn btn-primary btn-sm">Edit</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ProductsTable;