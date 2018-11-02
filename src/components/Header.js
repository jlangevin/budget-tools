import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'reactstrap';
import * as classes from './Header.module.css'

const Header = () => {
  return (
    <Navbar color="light" dark className={classes.AppHeader}>
      <Nav navbar>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default Header;