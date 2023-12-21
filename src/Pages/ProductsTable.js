import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../components/css/Table.css';
import Swal from 'sweetalert2';

function ProductsTable() {
    const [products, setProducts] = useState([]);
    const api_url = 'http://localhost:9000/prdocuts';

    useEffect(() => {
        getAllProducts()
    }, [])

    const getAllProducts = () => {
        fetch(api_url)
            .then(res => res.json())
            .then(json => {
                setProducts(json);
            })
    }

    const deleteProduct = (product) => {
        Swal.fire({
            title: `you are sure you want to delete ${product.title} ?`,
            showCancelButton: true
        }).then((data) => {
            if (data.isConfirmed) {
                fetch(`${api_url}/${product.id}`, { method: "DELETE" })
                    .then(res => res.json())
                    .then(json => {
                        console.log(`successfully deleted product #${product.id}`);
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
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product?.title?.slice(0, 30)}...</td>
                                <td>{product?.description?.slice(0, 50)}...</td>
                                <td>{product.price}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => { deleteProduct(product) }}>Delete</button>
                                    <Link to={`/products/${product.id}`} className="btn btn-info btn-sm">View</Link>
                                    <Link to={`/products/edit/${product.id}`} className="btn btn-primary btn-sm">Edit</Link>
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