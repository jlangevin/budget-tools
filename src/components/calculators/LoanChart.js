import React from 'react';
import { Bar as BarChart } from 'react-chartjs-2';

const LoanChart = ({ data }) => {

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
  
  return (
    <BarChart
      data={chartData}
      options={chartOptions}
    />
  );
}

export default LoanChart; 