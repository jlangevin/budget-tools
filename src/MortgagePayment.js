import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';

class MortgagePayment extends Component {

  state = {
    rate:      5,
    duration:  30,
    principal: 450000,
    payment:   ''
  };

  componentDidMount() {
    this.calculatePayment();
  }

  handleFieldChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  calculatePayment = () => {

    let { duration, principal } = this.state;

    // Convert the APR to a monthly rate by dividing by 100 and then by 12 months.
    let monthlyRate = +this.state.rate / 100 / 12;
    
    // Multiply the mortgage term in years by 12 to get total monthly payments.
    let months = +duration * 12;

    // Raise ( 1 plus the monthly rate ) to the negative power of the number of monthly 
    // payments. Subtract that result from 1.
    let raise = 1 - Math.pow(monthlyRate + 1, -months);

    // Divide the monthly rate by the result and multiply by the amount borrowed.
    let payment = monthlyRate / raise * principal;

    // Round payment
    payment = Math.round(payment);

    this.setState({ payment });

  }

  render() {

    return (
      <Form>

        <Form.Input
          inline
          label="Annual Interest Rate:"
          name="rate"
          value={ this.state.rate }
          onChange={ this.handleFieldChange }
        />
        
        <Form.Input 
          inline
          label="Loan Duration (Years):"
          name="duration"
          value={ this.state.duration }
          onChange={ this.handleFieldChange }
          error={ false }
        />
        <Message
          error
          header='Action Forbidden'
          content='You can only sign up for an account once with a given e-mail address.'
        />

        <Form.Input
          inline
          label="Loan Amount:"
          name="principal"
          value={ this.state.principal }
          onChange={ this.handleFieldChange }
        />

        <Form.Button
          content="Calculate"
          onClick={ this.calculatePayment }
        />

        
        Monthly Payment: { `$${this.state.payment}` }*

        * This is the principal payment only and does not include taxes, insurance, HOA dues, or other fees commonly associated with mortgages.
      </Form>
    );
  }
};

export default MortgagePayment;