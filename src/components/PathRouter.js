import { Outlet, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import ProductDetails from '../Pages/ProductDetails';
import ProductDisplay from '../Pages/ProductsDisplay';
import ProductsTable from '../Pages/ProductsTable';
import AddProduct from '../Pages/AddProduct';
import CategoriesTable from '../Pages/CategoriesTable';
import AddCategory from '../Pages/AddCategory';
import EditProduct from '../Pages/EditProduct';
import EditCategory from '../Pages/EditCategory';
import Cart from '../Pages/Cart';
import Login from '../Pages/Login';
import { useSelector } from 'react-redux';
import Signup from '../Pages/Signup';

function PathRouter() {
    const token = useSelector(state => state.user.token)

    return (
        <>
            {token ?
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='Cart' element={<Cart />} />
                    <Route path='products' element={<Outlet />} >
                        <Route path='' element={<ProductDisplay />} />
                        <Route path='categories/:categoryId' element={<ProductDisplay />} />
                        <Route path=':productId' element={<ProductDetails />} />
                        <Route path='edit/:productId' element={<EditProduct />} />
                    </Route>
                    <Route path='productsTable' element={<Outlet />} >
                        <Route path='' element={<ProductsTable />} />
                        <Route path='add' element={<AddProduct />} />
                    </Route>
                    <Route path='categoriesTable' element={<Outlet />} >
                        <Route path='' element={<CategoriesTable />} />
                        <Route path='add' element={<AddCategory />} />
                    </Route>
                    <Route path='categories/edit/:categoryId' element={<EditCategory />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                </Routes>
                :
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='products' element={<Outlet />} >
                        <Route path='' element={<ProductDisplay />} />
                        <Route path='categories/:categoryId' element={<ProductDisplay />} />
                        <Route path=':productId' element={<ProductDetails />} />
                    </Route>
                    <Route path='signup' element={<Signup />} />
                    <Route path=':temp' element={<Login />} />
                </Routes>
            }
        </>
    );
}

export default PathRouter