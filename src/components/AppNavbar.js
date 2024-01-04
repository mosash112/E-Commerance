import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { storeUser } from '../rtk/slices/auth-slice';
import { useState } from 'react';

function AppNavbar() {
  const cart = useSelector(state => state.cart)
  const token = useSelector(state => state.user.token)
  const user = useSelector(state => state.user.user)
  const [expanded, setExpanded] = useState(false);
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLinkClick  = () => {
    setExpanded(false); // Close the dropdown menu after selection
  };

  if (token) {
    if (user.admin) {
      return (
        <Navbar fixed='top' expand="lg" className="bg-body-tertiary" data-bs-theme="dark" expanded={expanded}>
          <Container>
            <Link to="/" className='navbar-brand'>My E-Commerce</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)}/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/" className='nav-link' onClick={handleLinkClick}>Home</Link>
                <Link to="productsTable" className='nav-link' onClick={handleLinkClick}>Product Table</Link>
                <Link to="CategoriesTable" className='nav-link' onClick={handleLinkClick}>Categories Table</Link>
                <Link to="Cart" className='nav-link' onClick={handleLinkClick}>{cart.length > 0 ? 'Cart - ' + cart.length : 'Cart'}</Link>
                {/* <Link to="users/login" className='nav-link'>Login</Link> */}
                <Link className='nav-link' onClick={() => { dispatch(storeUser(''));handleLinkClick(); }} >Logout</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    } else {
      return (
        <Navbar fixed='top' expand="lg" className="bg-body-tertiary" data-bs-theme="dark" expanded={expanded}>
          <Container>
            <Link to="/" className='navbar-brand'>My E-Commerce</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav"  onClick={() => setExpanded(!expanded)}/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/" className='nav-link' onClick={handleLinkClick}>Home</Link>
                <Link to="Cart" className='nav-link' onClick={handleLinkClick}>{cart.length > 0 ? 'Cart - ' + cart.length : 'Cart'}</Link>
                <Link to="#" className='nav-link' onClick={handleLinkClick}>Profile</Link>
                <Link className='nav-link' onClick={() => { dispatch(storeUser(''));handleLinkClick(); }}>Logout</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
  } else {
    return (
      <Navbar fixed='top' expand="lg" className="bg-body-tertiary" data-bs-theme="dark" expanded={expanded}>
        <Container>
          <Link to="/" className='navbar-brand'>My E-Commerce</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav"  onClick={() => setExpanded(!expanded)}/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className='nav-link' onClick={handleLinkClick}>Home</Link>
              <Link to="login" className='nav-link' onClick={handleLinkClick}>Login</Link>
              <Link to="signup" className='nav-link' onClick={handleLinkClick}>Signup</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AppNavbar;