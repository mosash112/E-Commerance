import { useEffect } from 'react';
// import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import ProductDetails from './components/ProductDetails';

function App() {

  useEffect(() => {
    document.title = "My E-Store"
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />}/>
        <Route path='products/:productId' element={<ProductDetails />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
