import { useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import AppNavbar from './components/AppNavbar';
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from './rtk/slices/collapse-slice';
import PathRouter from './components/PathRouter';
import Sidebar from './components/Sidebar';

function App() {
  const dispatch = useDispatch()
  const collapsed = useSelector(state => state.collapse)

  const collapseSidebar = () => {
    dispatch(toggleSidebar(collapsed))
  }

  useEffect(() => {
    document.title = "My E-Commerce"
  }, [])

  return (
    <div className="App">
      <AppNavbar />
      <button className="btn collapsebtn" onClick={() => collapseSidebar()} type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
        {collapsed}
      </button>
      <div className='row content'>
        <div className='screen'>
          <Sidebar />
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
