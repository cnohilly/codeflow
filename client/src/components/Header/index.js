import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Auth from '../../utils/auth'

const Header = () => {

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    // section for Header component
    <header className="sticky-top">
        <Navbar bg="black" variant="dark" expand="md" >
          <Container fluid className="px-3">
            
            
            {/* brand image and name */}
            <Link to="/">
              <Navbar.Brand>
                <img
                  src="/logo192.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />{' '}
                Codename-Poseidon
              </Navbar.Brand>
            </Link>  
              {/* menu button */}

            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <nav className="text-center ms-auto">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/">Profile</Link>
              </nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  );
};

export default Header;