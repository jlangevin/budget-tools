import React from 'react';
import { Table } from 'reactstrap';
import { calculateAmortization, formatMoney, getMonthlyRateFromAPR, numberMonthsInYears } from '../../utils/loans';
import { Bar as BarChart } from 'react-chartjs-2';
import * as classes from './LoanAmortization.css';


const AmortizationItem = ({ index, principalPayment, interestPayment, totalInterest, loanBalance }) => {
  return (
    <tr>
      <td>{ index+1 }</td>
      <td>{ formatMoney(principalPayment) }</td>
      <td>{ formatMoney(interestPayment) }</td>
      <td>{ formatMoney(totalInterest) }</td>
      <td>{ formatMoney(loanBalance) }</td>
    </tr>
  );
}

const AmortizationList = ({ data }) => {
  return data.map((monthData, index) => (
      <AmortizationItem
        key={ `mo${index+1}`}
        index            = { index }
        monthlyPayment   = { monthData.monthlyPayment }
        principalPayment = { monthData.principalPayment }
        interestPayment  = { monthData.interestPayment }
        totalInterest    = { monthData.totalInterest }
        loanBalance      = { monthData.loanBalance }
      />
  ));
}


const chartData = {
  datasets: [
    {
      label: 'Bar Dataset',
      data: [10, 20, 30, 40]
    },
    {
      label: 'Line Dataset',
      data: [50, 50, 50, 50],
      // Changes this dataset to become a line
      type: 'line'
    }
  ],
  labels: ['January', 'February', 'March', 'April']
};

const chartOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};
    
const LoanAmortization = ({ rate, duration, principal, payment }) => {

  let rateMonthly = getMonthlyRateFromAPR(rate);
  let loanTermMonths = numberMonthsInYears(duration); 
  let amortization = calculateAmortization(payment, loanTermMonths, rateMonthly, principal);
  
  return (
    <div>
      <BarChart
        data={chartData}
        options={chartOptions}
      />

      <Table className="table-striped table-sm {classes.reduce-table-padding}">
        <thead>
          <tr>
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
