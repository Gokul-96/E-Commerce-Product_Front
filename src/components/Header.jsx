import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <div className="container">
       

        {/* Toggle Button for Small Screens */}
        <Navbar.Toggle aria-controls="navbarNav" />

        {/* Collapsible Navigation */}
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            {/* Links Visible to All */}
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="nav-link-custom">
              Cart
            </Nav.Link>

            {/* Conditional Rendering Based on Authentication */}
            {isAuthenticated() ? (
              <>
                <Nav.Link as={Link} to="/profile" className="nav-link-custom">
                  Profile
                </Nav.Link>
                <Button variant="danger" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button variant="secondary">Login</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <Button variant="primary">Sign Up</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
