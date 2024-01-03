import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import AppNavbar from './components/AppNavbar';
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from './rtk/slices/collapse-slice';
import { Link } from "react-router-dom";
import PathRouter from './components/PathRouter';
import { url } from './env.json';

function App() {
  const dispatch = useDispatch()
  const collapsed = useSelector(state => state.collapse)
  const token = useSelector(state => state.user.token)
  const [categories, setCategories] = useState([]);
  const api_url = 'https://my-store-api-eipk.onrender.com/products'

  const collapseSidebar = () => {
    dispatch(toggleSidebar(collapsed))
  }

  useEffect(() => {
    document.title = "My E-Commerce"
    if (token !== '') {
      getAllCategories()
    }
  }, [])

  const getAllCategories = () => {
    fetch(`${api_url}/categories`)
      .then(response => response.json())
      .then(data => { setCategories(data) })
      .catch(error => console.error('Error fetching categories:', error));
  }

  return (
    <div className="App">
      <AppNavbar />
      <button className="btn collapsebtn" onClick={() => collapseSidebar()} type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
        {collapsed}
      </button>
      <div className='row content'>
        <div className='screen'>
          <div className="collapse collapse-horizontal" id="collapseWidthExample">
            <ul className="list-unstyled sidebar">
              <li>
                <Link to="products">get all products</Link>
              </li>
              <ul className='list-unstyled'>
                <li>Filters</li>
                {categories.map((category) => {
                  return (
                    <li key={category._id}>
                      <Link to={`products/categories/${category._id}`}>{category.name}</Link>
                    </li>
                  )
                })}
              </ul>
            </ul>
          </div>
          <div className='container'>
            <PathRouter />
          </div>
        </div>
      </div>
      <Footer className='footer' />
    </div >
  );
}

export default App;
