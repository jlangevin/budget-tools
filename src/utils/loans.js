const formatMoney = (number) => {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const getValidDecimal = (value, wholePlaces = 2, decimalPlaces = 2) => {
  let regex = new RegExp("((?:\\d{0," + wholePlaces + "})(?:\\.\\d{0," + decimalPlaces + "}|\\d{0}))");
  let match = value.match(regex);
  return match.length ? match[0] : null;
};

const roundNum = (num) => {
  return Math.round(num * 100) / 100;
}

const calculateInterest = (rate, principal) => {
  return roundNum(principal * rate);
}

/**
 * Recursive function that returns an object's keys as an array of arrays.  Can be 
 * used with lodash's Array methods such as _.get() and _.has().  Created to help 
 * find missing and/or extraneous keys in localization objects. 
 * @function
 * @name calculateMonthlyPayment
 * @param {number} rate - Yearly rate (APR)
 * @param {number} duration - Length of loan term in years
 * @param {number} principal - Amount borrowed
 * @returns {number}
 * @description Calculates monthly loan payment 
 * 
 * Equation:
 * 
 * P = (Pv*R) / [1 - (1 + R)^(-n)]
 * 
 * P = Monthly payment;
 * Pv = Present value (starting value of the loan);
 * APR = Annual Percentage Rate; 
 * R = Periodic interest rate = APR/number of interest periods per year; 
 * n = Total number of interest periods (interest periods per year * number of years)
 */
const calculateMonthlyPayment = (rate, duration, principal) => {
  let monthlyRate = +rate / 100 / 12;
  let months      = +duration * 12;
  let payment     = (principal * monthlyRate) / (1 - Math.pow(monthlyRate + 1, -months));
  return Math.round(payment * 100) / 100;
}

const calculateAmortization = (monthlyPayment, months, pctMonthlyInterest, loanBalance, amortArray = []) => {
  let interestPmt    = calculateInterest(pctMonthlyInterest, loanBalance);
  let principalPmt   = roundNum(monthlyPayment - interestPmt);
  let newLoanBalance = roundNum(loanBalance - principalPmt);

  let amortData = {
    monthlyPayment,
    principalPmt,
    interestPmt,
    loanBalance: newLoanBalance
  };
  let newAmortArray = [
    ...amortArray,
    amortData
  ];

  if (amortArray.length < months) {
    return calculateAmortization(monthlyPayment, months, pctMonthlyInterest, newLoanBalance, newAmortArray);
  } else {
    return amortArray;
  }
}

export {
  formatMoney,
  getValidDecimal,
  calculateMonthlyPayment,
  calculateAmortization,
  calculateInterest,
  roundNum
};