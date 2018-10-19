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

const roundUp = (num, decimalPlaces) => {
  const multiplier = 10**(decimalPlaces);
  return Math.ceil(num * multiplier) / multiplier;
}

const roundDown = (num, decimalPlaces) => {
  const multiplier = 10**decimalPlaces;
  return Math.floor(num * multiplier) / multiplier;
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
 * P = Pv * ( ( ( R * (1 + R)^n ) / ( (1 + R)^n - 1 ) ) )
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

const calculateMonthlyAmortization = (monthlyPayment, monthlyInterestRate, totalInterest, loanBalance) => {

  let interestPayment  = calculateInterest(monthlyInterestRate, loanBalance);
  let principalPayment = roundNum(monthlyPayment - interestPayment, 2);
  let newLoanBalance   = roundNum(loanBalance - principalPayment, 2);
  let newTotalInterest = roundNum(interestPayment + totalInterest, 2);
  let amortData = {
    monthlyPayment,
    principalPayment,
    interestPayment,
    totalInterest: newTotalInterest,
    loanBalance: newLoanBalance
  };
  return amortData;
}


const calculateAmortization = (monthlyPayment, months, monthlyInterestRate, loanBalance, totalInterest = 0, amortArray = []) => {

  let amortData = calculateMonthlyAmortization(monthlyPayment, monthlyInterestRate, totalInterest, loanBalance);
  
  let newAmortArray = [
    ...amortArray,
    amortData
  ];

  if (amortArray.length < months) {
    return calculateAmortization(monthlyPayment, months, monthlyInterestRate, amortData.loanBalance, amortData.totalInterest, newAmortArray);
  } else {
    return amortArray;
  }
}

export {
  calculateAmortization,
  calculateMonthlyAmortization,
  calculateInterest,
  calculateMonthlyPayment,
  formatMoney,
  getMonthlyRateFromAPR,
  getValidDecimal,
  numberMonthsInYears,
  roundDown,
  roundNum,
  roundUp
};

