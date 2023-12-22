import { useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Sidebar from './components/Sidebar';
import ProductDetails from './Pages/ProductDetails';
import ProductDisplay from './Pages/ProductsDisplay';
import ProductsTable from './Pages/ProductsTable';
import AddProduct from './Pages/AddProduct';
import CategoriesTable from './Pages/CategoriesTable';
import AddCategory from './Pages/AddCategory';
import EditProduct from './Pages/EditProduct';
import EditCategory from './Pages/EditCategory';
import AppNavbar from './components/AppNavbar';
import Cart from './Pages/Cart';

function App() {

  useEffect(() => {
    document.title = "My E-Commerce"
  }, [])

  return (
    <div className="App">
      <AppNavbar />
      <div className='row'>
        <div className='col-2 sidebar'>
          <Sidebar />
        </div>
        <div className='col-10'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='Cart' element={<Cart />} />
            <Route path='products' element={<Outlet />} >
              <Route path='' element={<ProductDisplay />} />
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
          </Routes>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default App;
