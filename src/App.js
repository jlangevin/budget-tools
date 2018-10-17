import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavItem } from 'reactstrap';

import Home from './components/Home';
import MonthlyLoanPayment from './components/calculators/MonthlyLoanPayment';
import DebtRepayment from './components/calculators/DebtRepayment';
import MortgageAffordability from './components/calculators/MortgageAffordability';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar color="light" dark>
          <Nav navbar>
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
          </Nav>
        </Navbar>

        <Container>
          <Route
            path      = "/MonthlyLoanPayment"
            component = { MonthlyLoanPayment } />

          <Route
            path      = "/DebtRepayment"
            component = { DebtRepayment } />

          <Route
            path      = "/MortgageAffordability"
            component = { MortgageAffordability } />

          <Route
            path      = "/"
            component = { Home }
            exact />
        </Container>
      </div>
    );
  }
}

export default App;
