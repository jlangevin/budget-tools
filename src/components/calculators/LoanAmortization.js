import React from 'react';
import { Table } from 'reactstrap';
import { calculateAmortization, formatMoney, getMonthlyRateFromAPR, numberMonthsInYears } from '../../utils/loans';

import LoanChart from './LoanChart';
import * as classes from './LoanAmortization.module.css';


const AmortizationItem = ({ index, payment, principalPayment, interestPayment, totalInterest, loanBalance }) => {
  return (
    <tr>
      <td>{ index+1 }</td>
      <td>{ formatMoney(payment) }</td>
      <td>{ formatMoney(principalPayment) }</td>
      <td>{ formatMoney(interestPayment) }</td>
      <td>{ formatMoney(totalInterest) }</td>
      <td>{ formatMoney(loanBalance) }</td>
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

  let rateMonthly = getMonthlyRateFromAPR(rate);
  let loanTermMonths = numberMonthsInYears(duration); 
  let amortization = calculateAmortization(payment, loanTermMonths, rateMonthly, principal);
  
  return (
    <div>

      <div className={classes.ChartWrapper}>
        <LoanChart
          data={amortization}
        />
      </div>

      <Table className="table-striped table-sm {classes.reduce-table-padding}" size="sm">
        <thead>
          <tr>
            <th>Month</th>
            <th>Payment</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Total Interest</th>
            <th>Balance</th>
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
