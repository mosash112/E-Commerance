import { Button, Container, Image, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteFromCart } from "../rtk/slices/cart-slice";

function Cart() {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const totalPrice = cart.reduce((acc, product)=>{
        acc += product.price*product.quantity;
        return acc;
    }, 0)

    return (
        <Container>
            <h1>My Cart</h1>
            <Button variant="primary" className="mb-3" onClick={()=>dispatch(clearCart())}>Clear Cart</Button>
            <h5>Total Price: {totalPrice.toFixed(2)} $</h5>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product?.title?.slice(0, 30)}...</td>
                                <td><Image src={product?.image} style={{height: '150px', width: '150px'}} alt={product.title} /></td>
                                <td>{product.price}$</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <Button variant="danger" onClick={()=>dispatch(deleteFromCart(product))}>Delete</Button>
                                    {/* <Link to={`/products/${product.id}`} className="btn btn-info btn-sm">View</Link> */}
                                    {/* <Link to={`/products/edit/${product.id}`} className="btn btn-primary btn-sm">Edit</Link> */}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}

export default Cart;