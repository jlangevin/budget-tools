import React from 'react';
import { 
  Bar as BarChart, 
} from 'react-chartjs-2';

import { formatMoney } from '../../utils/loans';


const getNthArrayIndexes = (arrayLength, nth) => {
  let indices = [];
  for (let arrayIndex=0; arrayIndex<=arrayLength; arrayIndex += (arrayIndex === 0) ? nth-1 : nth) {
    indices.push(arrayIndex);
  }
  return indices;
}

const getBalanceData = (data, monthIndexes, keyOfDataToReturn) => {
  let balances = [];
  monthIndexes.forEach(month => {
    let loanBalance = data[month][keyOfDataToReturn];
    balances.push(loanBalance);
  });
  return balances;
}

const getMonthLabels = (monthIndexes) => monthIndexes.map(monthIndex => monthIndex+1);

const LoanChart = ({ data }) => {

  const monthIndexes = getNthArrayIndexes(data.length, 12);
  const monthLabels = getMonthLabels(monthIndexes);
  const balanceData = getBalanceData(data, monthIndexes, 'loanBalance');
  const interestData = getBalanceData(data, monthIndexes, 'totalInterest');
  const principalData = getBalanceData(data, monthIndexes, 'totalPrincipal');

  const chartData = {
    datasets: [{
        label: 'Balance',
        data: balanceData,
        type: 'line',
        backgroundColor: 'rgb(78, 32, 189)',
			  borderColor: 'rgb(78, 32, 189)',
      },
       {
        label: 'Principal',
        data: principalData,
        type: 'bar', 
        backgroundColor: 'rgb(255, 99, 77)',
        borderColor: 'rgb(255, 99, 77)',
      }, {
        label: 'Interest Paid',
        data: interestData,
        type: 'bar', 
        backgroundColor: 'rgb(0, 99, 132)',
        borderColor: 'rgb(0, 99, 132)',
      }],
    labels: monthLabels
  };

  const chartOptions = {
    tooltips: {
      mode: 'label',
      callbacks: {
        label: function (title, data) {
          var xLabel = data.datasets[title.datasetIndex].label;
          var yLabel = formatMoney(title.yLabel);
          return xLabel + ': ' + yLabel;
        }
      }
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return formatMoney(value, false);
          }
        }
      }],
      xAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Payment',
          lineHeight: '1.2em',
          fontColor: '#456',
          fontSize: 16,
          fontStyle: 'normal',
          //padding: 20
        }
      }]
    },
    legend: {
      display: true,
      poisiton: 'left',
      labels: {
        fontColor: 'rgb(0, 99, 132)'
      }
    }
  };
  
  return (
    <BarChart
      data={chartData}
      options={chartOptions}
    />
  );
}

export default LoanChart; 