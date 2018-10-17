import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Home = (props) => {
  return (
    <div>
      <h1>Calculators</h1>
      <ListGroup flush>
        <ListGroupItem><Link to="/MonthlyLoanPayment">Monthly Loan Payment</Link></ListGroupItem>
        <ListGroupItem><Link to="/DebtRepayment">Debt Repayment</Link></ListGroupItem>
        <ListGroupItem><Link to="/LoanAmortization">Amortization Schedule</Link></ListGroupItem>
        <ListGroupItem><Link to="/MortgageAffordability">Mortgage Affordability</Link></ListGroupItem>
      </ListGroup>
    </div>
  );
}

export default Home;
