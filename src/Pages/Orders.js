import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllOrders, fetchUserOrders } from "../rtk/slices/orders-slice";
import { Link } from "react-router-dom";

function Orders() {
    const orders = useSelector(state => state.orders)
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    // const totalPrice = cart.reduce((acc, product) => {
    //     acc += product.price * product.quantity;
    //     return acc;
    // }, 0)

    useEffect(() => {
        if (user.admin) {
            dispatch(fetchAllOrders())
        }else{
            dispatch(fetchUserOrders(user._id))
        }
    }, [])

    return (
        <Container>
            <h1>My Orders</h1>
            {/* <Button variant="primary" className="mb-3" onClick={() => dispatch(clearCart())}>Clear Cart</Button> */}
            {/* <h5>Total Price: {totalPrice.toFixed(2)} $</h5> */}
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Total price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order, index) => {
                        return (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{order.date}</td>
                                <td>{order.totalPrice}$</td>
                                <td>
                                    {/* <Button variant="danger" onClick={() => dispatch(deleteFromCart(product))}>Delete</Button> */}
                                    <Link to="#" className="btn btn-info btn-sm">View</Link>
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

export default Orders;