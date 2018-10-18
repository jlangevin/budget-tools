import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'reactstrap';

const Header = () => {
  return (
    <Navbar color="light" dark>
      <Nav navbar>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default Header;