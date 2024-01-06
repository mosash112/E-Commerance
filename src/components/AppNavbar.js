import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { storeUser } from '../rtk/slices/auth-slice';
import { useState } from 'react';
import logo from './Images/logo.svg'
import { clearCart } from '../rtk/slices/cart-slice';
import { clearFilter } from '../rtk/slices/filter-slice';

function AppNavbar() {
  const cart = useSelector(state => state.cart)
  const token = useSelector(state => state.user.token)
  const user = useSelector(state => state.user.user)
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch()

  const handleLinkClick = () => {
    setExpanded(false); // Close the dropdown menu after selection
  };

  const loggingOut = () => {
    dispatch(storeUser(''))
    dispatch(clearCart())
    dispatch(clearFilter())
  }

  if (token) { // if logged in
    if (user.admin) { // if admin
      return (
        <Navbar fixed='top' expand="lg" className="bg-body-tertiary" data-bs-theme="dark" expanded={expanded}>
          <Container>
            <Navbar.Brand>
              <img alt="My E-Commerce logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
              <Link to="/" className='navbar-brand'>My E-Commerce</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
              <Nav className="mw-auto">
                <Link to="/" className='nav-link' onClick={handleLinkClick}>Home</Link>
                <Link to="Cart" className='nav-link' onClick={handleLinkClick}>{cart.length > 0 ? 'Cart - ' + cart.length : 'Cart'}</Link>
                <Link className='nav-link' onClick={() => { loggingOut(); handleLinkClick(); }} >Logout</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    } else { //if regular buyer
      return (
        <Navbar fixed='top' expand="lg" className="bg-body-tertiary" data-bs-theme="dark" expanded={expanded}>
          <Container>
            <Navbar.Brand>
              <img alt="My E-Commerce logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
              <Link to="/" className='navbar-brand'>My E-Commerce</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
              <Nav className="mw-auto">
                <Link to="/" className='nav-link' onClick={handleLinkClick}>Home</Link>
                <Link to="Cart" className='nav-link' onClick={handleLinkClick}>{cart.length > 0 ? 'Cart - ' + cart.length : 'Cart'}</Link>
                <Link to="#" className='nav-link' onClick={handleLinkClick}>Profile</Link>
                <Link className='nav-link' onClick={() => { loggingOut(); handleLinkClick(); }}>Logout</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
  } else { // if not logged in
    return (
      <Navbar fixed='top' expand="lg" className="bg-body-tertiary" data-bs-theme="dark" expanded={expanded}>
        <Container>
          <Navbar.Brand>
            <img alt="My E-Commerce logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
            <Link to="/" className='navbar-brand'>My E-Commerce</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Nav className="mw-auto">
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