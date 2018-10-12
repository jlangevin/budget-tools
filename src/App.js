import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MortgagePayment from './MortgagePayment';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/MortgagePayment">Mortgage Payment</Link>
        </nav>
        <div>
          <Route
            path      = "/MortgagePayment"
            component = { MortgagePayment } />
        </div>
      </div>
    );
  }
}

export default App;
