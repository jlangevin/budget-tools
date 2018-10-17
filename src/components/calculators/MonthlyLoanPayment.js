import React, { Component } from 'react';
import SelectOptions from '../../SelectOptions';

import { 
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Tooltip
} from 'reactstrap';

import {
  calculateMonthlyPayment,
  getValidDecimal
} from '../../utils/loans.js';

import LoanAmortization from './LoanAmortization';

class MonthlyLoanPayment extends Component {

  state = {
    rate             : 5,
    rateTipOpen      : false,
    rateError        : false,

    duration         : 30,
    durationTipOpen  : false,
    durationError    : false,

    principal        : 100000,
    principalTipOpen : false,
    principalError   : false,

    payment          : null,
    amortizationOpen : false
  };

  componentDidMount() {
    this.calculatePayment();
  }

  getFieldSettings = (fieldName) => {
    const settings = {
      rate: {
        wholeNums  : 2,
        decimalNums: 2
      },
      duration: {
        wholeNums  : 2,
        decimalNums: 0
      },
      principal: {
        wholeNums  : 10,
        decimalNums: 0
      },
    };
    return settings[fieldName];
  }

  handleFieldChange = (event) => {
    let { name, value } = event.currentTarget;
    let { wholeNums, decimalNums } = this.getFieldSettings(name);
    let validValue = getValidDecimal(value, wholeNums, decimalNums);

    if (value.length === 0 ) {
      this.setState({
        [name]           : value,
        payment          : null,
        [`${name}Error`] : true
      });
    } else if ( validValue.length > 0 ) {
      this.setState({
        [name]           : validValue,
        payment          : null,
        [`${name}Error`] : false
      });
    }
  };

  fieldIsValid = (fieldValue) => {
    return ( fieldValue.length === 0 || fieldValue === '.' ) ? false : true;
  }

  calculatePayment = () => {
    let { rate, duration, principal } = this.state;
    let newPayment = ( this.fieldIsValid(rate) && this.fieldIsValid(duration) && this.fieldIsValid(principal) ) ?
                     calculateMonthlyPayment(rate, duration, principal) :
                     null;

    this.setState({ payment: newPayment });
  }

  toggleOpen = (key) => {
    let isOpen = this.state[key];
    this.setState({ [key]: !isOpen });
  }

  allowAmortization = () => {
    return this.state.payment !== null ? true : false;
  }

  durationOptions = [
    { text: '5',  value: 5 },
    { text: '10', value: 10 },
    { text: '15', value: 15 },
    { text: '20', value: 20 },
    { text: '30', value: 30 },
    { text: '35', value: 35 },
    { text: '40', value: 40 }
  ];

  render() {

    const {
      rateTipOpen,
      rate,
      rateError,
      durationTipOpen,
      duration,
      principalTipOpen,
      principal,
      principalError,
      payment,
      amortizationOpen
    } = this.state;

    return (
      <Container>
        <h4>Loan Payment Calculator</h4>

        <Form>
          <FormGroup row>
            <Label for='rate' id='rateLabel' xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
              Annual Interest Rate:
            </Label>
            
            <Tooltip
              isOpen    = { rateTipOpen }
              target    = 'rateLabel'
              toggle    = { () => this.toggleOpen('rateTipOpen') }
            >
              Annual interest rate (APR), not APY. Should be a percentage up to 99.99. Do not include %
            </Tooltip>
            
            <Col xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
              <Input
                type     = 'text'
                name     = 'rate'
                id       = 'rate'
                value    = { rate }
                onChange = { this.handleFieldChange }
                invalid  = { rateError }
              />
              <FormFeedback>Rate is required</FormFeedback>
            </Col>
          </FormGroup>
        
          <FormGroup row>
            <Label for='duration' id='durationLabel' xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
              Loan Duration (Years):
            </Label>

            <Tooltip
              isOpen    = { durationTipOpen }
              target    = 'durationLabel'
              toggle    = { () => this.toggleOpen('durationTipOpen') }
            >
              Enter the term of the loan in years.
            </Tooltip>

            <Col xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
              <Input
                type     = 'select'
                name     = 'duration'
                id       = 'duration'
                onChange = { this.handleFieldChange }
                value    = { duration }
              >
                <SelectOptions  
                  optionsArray = { this.durationOptions }
                />
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for='rate' id='principalLabel' xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
              Loan Amount:
            </Label>

            <Tooltip
              isOpen    = { principalTipOpen }
              target    = 'principalLabel'
              toggle    = { () => this.toggleOpen('principalTipOpen') }
            >
              How much was the total amount borrowed? Do not include $ or commas
            </Tooltip>

            <Col xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
              <Input
                type     = 'text'
                name     = 'principal'
                id       = 'principal'
                value    = { principal }
                onChange = { this.handleFieldChange }
                invalid  = { principalError }
              />
              <FormFeedback>Principal is required</FormFeedback>
            </Col>            
          </FormGroup>
        
          <FormGroup row>
            <Col
              xs={ 12 } sm={ 12 } md={ 8 } lg={ 6 }
              className="text-center">
              <Button
                color   = "success"
                onClick = { this.calculatePayment }
              >
                Calculate
              </Button>
            </Col>
          </FormGroup>
          
          <FormGroup row>
            <Col xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
              Monthly Payment:
            </Col>
            
            <Col xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
              <b>
                {
                  payment !== null ? 
                  `$${payment}* ` :
                  null
                }
              </b>

              {
                this.allowAmortization() ?
                <Button
                  block={ false }
                  onClick={ () => this.toggleOpen('amortizationOpen') }
                >
                  View Amortization
                </Button> :
                null
              }
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col xs={ 12 } md={ 8 } lg={ 6 }>
              <b>*</b> Monthly payment does not include taxes, insurance, 
              HOA dues, or other fees commonly associated with loans.
            </Col>
          </FormGroup>
        </Form>

        {
          (
            amortizationOpen &&
            this.allowAmortization()
          ) ?
          <LoanAmortization
            rate         = { rate }
            duration     = { duration }
            principal    = { principal }
            payment      = { payment }
            closeHandler = { () => this.toggleOpen('amortizationOpen') }
            isOpen       = { amortizationOpen }
          /> :
          null
        }
      </Container>
    );
  }
};

export default MonthlyLoanPayment;