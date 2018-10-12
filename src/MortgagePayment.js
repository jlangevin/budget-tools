import React, { Component } from 'react';
import { Dropdown, Form, Input, Popup } from 'semantic-ui-react';

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

  getValidNumber = (value, wholePlaces=2, decimalPlaces=2) => {
    let regex = new RegExp("((?:\\d{0," + wholePlaces + "})(?:\\.\\d{0," + decimalPlaces + "}|\\d{0}))");
    let match = value.match(regex);
    return match.length ? match[0] : '';
  };

  handleAPRChange = (e, { name, value }) => {
    let validVal = this.getValidNumber(value, 2, 2);
    if (value.length === 0 || validVal.length > 0) {
      this.setState({ [name]: validVal });
    }
  };

  handlePrincipalChange = (e, { name, value }) => {
    let validVal = this.getValidNumber(value, 10, 2);
    if (value.length === 0 || validVal.length > 0) {
      this.setState({ [name]: validVal });
    }
  };

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

    const durationOptions = [
      { text: '5',  value: 5 },
      { text: '10', value: 10 },
      { text: '15', value: 15 },
      { text: '20', value: 20 },
      { text: '30', value: 30 },
      { text: '35', value: 35 },
      { text: '40', value: 40 }
    ];

    return (
      <Form>
        <Form.Field inline>
          <Popup
            trigger = {<label>Annual Interest Rate:</label>}
            content = 'Annual interest rate (APR), not APY. Should be a percentage up to 99.99. Do not include %' />
  
          <Input
            type     = 'text'
            name     = "rate"
            value    = { this.state.rate }
            onChange = { this.handleAPRChange } />
        </Form.Field>

        <Form.Field inline>
          <Popup
            trigger = { <label>Loan Duration (Years):</label> }
            content = 'How many years will you be paying this loan?' />
          
          <Dropdown
            name     = "duration"
            options  = { durationOptions }
            value    = { this.state.duration }
            onChange = { this.handleFieldChange }
            selection /> 
        </Form.Field>

        <Form.Field inline>
          <Popup
            trigger = { <label>Loan Amount:</label> }
            content = { `How much was the total amount borrowed? Do not include $ or commas` } />
  
          <Input
            type     = 'text'
            name     = "principal"
            value    = { this.state.principal }
            onChange = { this.handlePrincipalChange } />
        </Form.Field>
        
        <Form.Button
          content = "Calculate"
          onClick = { this.calculatePayment }
        />

        <div>
          Monthly Payment: { `$${this.state.payment}` }*
        </div>

        <div>
          * This is the principal payment only and does not include taxes, insurance, HOA dues, or other fees commonly associated with mortgages.
        </div>
      </Form>
    );
  }
};

export default MortgagePayment;