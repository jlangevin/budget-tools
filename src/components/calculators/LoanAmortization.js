import React from 'react';
import { Card, CardBody, CardDeck, CardHeader, CardText, Col, Row, Table } from 'reactstrap';
import { calculateAmortization, formatMoney, getMonthlyRateFromAPR, numberMonthsInYears } from '../../utils/loans';

import LoanChart from './LoanChart';
import * as classes from './LoanAmortization.module.css';


const AmortizationItem = ({ index, payment, principalPayment, interestPayment, totalInterest, loanBalance }) => {
  return (
    <tr>
      <td>{ index+1 }</td>
      {/* <td>{ formatMoney(payment) }</td> */}
      <td className="text-right">{ formatMoney(principalPayment) }</td>
      <td className="text-right">{ formatMoney(interestPayment) }</td>
      <td className="text-right">{ formatMoney(totalInterest) }</td>
      <td className="text-right">{ formatMoney(loanBalance) }</td>
    </tr>
  );
}

const AmortizationList = ({ data }) => {
  return data.map((periodicData, index) => (
      <AmortizationItem
        key              = { `period${index+1}`}
        index            = { index }
        payment          = { periodicData.payment }
        principalPayment = { periodicData.principalPayment }
        interestPayment  = { periodicData.interestPayment }
        totalInterest    = { periodicData.totalInterest }
        loanBalance      = { periodicData.loanBalance }
      />
  ));
}
    
const LoanAmortization = ({ rate, duration, principal, payment }) => {

  const periodicRate = getMonthlyRateFromAPR(rate);
  const loanTermPeriods = numberMonthsInYears(duration); 
  const amortization = calculateAmortization(payment, loanTermPeriods, periodicRate, principal);
  const endData = amortization[amortization.length-1];
  const today = new Date();
  const payoffDate = new Date(today.getFullYear()+duration, today.getMonth(), today.getDate());
  
  return (
    <div>

      <div className={classes.LoanInfoBox}>
        <Row>
          <Col className="text-center">
            <h6>Payment</h6>
            <h3>{formatMoney(payment)}*</h3>
          </Col>
        </Row>

        <Row>
          <Col>
            <CardDeck className="text-center">
              <Card>
                <CardHeader tag="h5">Total Interest Paid</CardHeader>
                <CardBody>
                  <CardText>
                    {formatMoney(endData.totalInterest)}
                  </CardText>
                </CardBody>
              </Card>

              <Card>
                <CardHeader tag="h5">Total Paid</CardHeader>
                <CardBody>
                  <CardText>
                    {formatMoney(endData.totalInterest + endData.totalPrincipal)}<br />
                    (over {loanTermPeriods} payments)
                  </CardText>
                </CardBody>
              </Card>

              <Card>
                <CardHeader tag="h5">Payoff</CardHeader>
                <CardBody>
                  <CardText>
                    {payoffDate.toLocaleString('en-us', { month: 'long' })} {payoffDate.getFullYear()}
                  </CardText>
                </CardBody>
              </Card>
            </CardDeck>
          </Col>
        </Row>
      </div>

  

      <div className={classes.ChartWrapper}>
        <LoanChart
          data={amortization}
        />
      </div>

      <Table size="sm" bordered striped responsive>
        <thead className="text-center">
          <tr>
            <th rowSpan="2">Month</th>
            <th colSpan="2">Payment</th>
            {/* <th>Interest</th> */}
            <th rowSpan="2">Total Interest</th>
            <th rowSpan="2">Balance</th>
          </tr>
          <tr>
            {/* <th>Payment</th> */}
            <th>Principal</th>
            <th>Interest</th>
          </tr>
        </thead>

        <tbody>
          <AmortizationList
            data={amortization}
          />
        </tbody>
      </Table>
    </div>
  );
}

export default LoanAmortization;
