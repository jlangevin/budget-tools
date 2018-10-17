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
  Modal, 
  ModalBody, 
  ModalFooter, 
  ModalHeader, 
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
    rateError        : null,
    duration         : 30,
    durationTipOpen  : false,
    durationError    : null,
    principal        : 450000,
    principalTipOpen : false,
    principalError   : null,
    payment          : null,
    amortizationOpen : false
  };

  componentDidMount() {
    this.calculatePayment();
  }

  handleAPRChange = (event) => {
    let { name, value } = event.currentTarget;
    let validVal = getValidDecimal(value, 2, 2);
    if (value.length === 0 || validVal.length > 0) {
      this.setState({ [name]: validVal });
    }
  };

  handlePrincipalChange = (event) => {
    let { name, value } = event.currentTarget;
    let validVal = getValidDecimal(value, 10, 2);
    if (value.length === 0 || validVal.length > 0) {
      this.setState({ [name]: validVal });
    }
  };

  handleFieldChange = (event) => {
    let { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  calculatePayment = () => {
    let { rate, duration, principal } = this.state;

    let stateUpdates = {
      rateError      : ( typeof rate      !== 'number' ) ? { invalid: true } : null,
      principalError : ( typeof principal !== 'number' ) ? { invalid: true } : null,
      payment        : ( typeof rate      !== 'number' || typeof duration  !== 'number' ) ?
                       null :
                       calculateMonthlyPayment(rate, duration, principal)
    };
 
    this.setState(stateUpdates);
  }

  toggleOpen = (key) => {
    let isOpen = this.state[key];
    this.setState({ [key]: !isOpen });
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
        <h4>Loan Payment Calculator6</h4>

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
                onChange = { this.handleAPRChange }
                { ...rateError }
              />
              
              {
                rateError !== null &&
                <FormFeedback>Rate is required</FormFeedback>
              }  
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
                onChange = { this.handlePrincipalChange }
                { ...principalError }
              />
            </Col>

            {
              principalError !== null &&
              <FormFeedback>Principal is required</FormFeedback>
            }
          </FormGroup>
        
          <FormGroup row>
            <Col xs={ 12 } md={ 8 } lg={ 6 }>
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
                  `$${payment}*` :
                  null
                }
              </b>

              {
                payment !== null ?
                <Button
                  color="success"
                  onClick={ () => this.toggleOpen('amortizationOpen') }
                >Amort</Button> :
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
          amortizationOpen &&
          payment !== null ?
          <Modal
            isOpen = {amortizationOpen}
            toggle = { () => this.toggleOpen('amortizationOpen') }
            size   = 'lg'
          >
            <ModalHeader
              toggle = { () => this.toggleOpen('amortizationOpen') }
            >
              Amortization Schedule
            </ModalHeader>

            <ModalBody>
              <LoanAmortization
                rate      = { rate }
                duration  = { duration }
                principal = { principal }
                payment   = { payment }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={ () => this.toggleOpen('amortizationOpen') }>Cancel</Button>
            </ModalFooter>
          </Modal>
           :
          null
        }
      </Container>
    );
  }
};

export default MonthlyLoanPayment;