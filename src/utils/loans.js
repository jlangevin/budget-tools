const formatMoney = (number) => {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const getValidDecimal = (value, wholePlaces = 2, decimalPlaces = 2) => {
  let regex = new RegExp("((?:\\d{0," + wholePlaces + "})(?:\\.\\d{0," + decimalPlaces + "}|\\d{0}))");
  let match = value.match(regex);
  return match.length ? match[0] : null;
};

const roundNum = (num, decimalPlaces) => {
  const multiplier = 10**decimalPlaces;
  return Math.round(num * multiplier) / multiplier;
}

const calculateInterest = (rate, principal) => {
  return roundNum(principal * rate, 2);
}

const numberMonthsInYears = (years) => {
  return years * 12;
}

const getMonthlyRateFromAPR = (ratePerYear) => {
  return ratePerYear / 100 / 12;
};

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
  let monthlyRate     = getMonthlyRateFromAPR(rate);
  let numberOfPeriods = numberMonthsInYears(duration);
  let factor          = roundNum( (1 + monthlyRate)**numberOfPeriods, 4 );
  let payment         = principal * ( ( (monthlyRate * factor) / (factor - 1) ) );
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
  calculateAmortization,
  calculateInterest,
  calculateMonthlyPayment,
  formatMoney,
  getMonthlyRateFromAPR,
  getValidDecimal,
  numberMonthsInYears,
  roundNum
};

