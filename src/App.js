import { useEffect } from 'react';
// import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
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

function App() {

  useEffect(() => {
    document.title = "My E-Store"
  }, [])

  return (
    <div className="App">
      <Navbar />
      <div className='row'>
        <div className='col-2 sidebar'>
          <Sidebar />
        </div>
        <div className='col-10'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='products' element={<ProductDisplay />} />
            <Route path='products/:productId' element={<ProductDetails />} />
            <Route path='productsTable' element={<ProductsTable />} />
            <Route path='productsTable/add' element={<AddProduct />} />
            <Route path='products/edit/:productId' element={<EditProduct />} />
            <Route path='categoriesTable' element={<CategoriesTable />} />
            <Route path='categoriesTable/add' element={<AddCategory />} />
            <Route path='categories/edit/:categoryId' element={<EditCategory />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default App;
