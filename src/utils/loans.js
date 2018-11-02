import { roundCeiling, roundHalfUpAsymmetric } from './roundNums';

const formatMoney = (number, includeDecinal=true) => {
  let value = number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return includeDecinal ? value : value.split('.')[0];
}

const getValidDecimal = (value, wholePlaces = 2, decimalPlaces = 2) => {
  let regex = new RegExp("((?:\\d{0," + wholePlaces + "})(?:\\.\\d{0," + decimalPlaces + "}|\\d{0}))");
  let match = value.match(regex);
  return match.length ? match[0] : null;
};

const calculateInterest = (rate, principal) => {
  return principal * rate;
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
  let factor          = roundHalfUpAsymmetric( (1 + monthlyRate)**numberOfPeriods, 4 );
  let payment         = principal * ( ( (monthlyRate * factor) / (factor - 1) ) );
  return Math.round(payment * 100) / 100;
}

const calculateMonthlyAmortization = (payment, periodicInterestRate, totalInterest, totalPrincipal, loanBalance) => {
  let interestPayment  = roundHalfUpAsymmetric(calculateInterest(periodicInterestRate, loanBalance), 2);
  let newTotalInterest = interestPayment + totalInterest;
  let principalPayment = roundCeiling(payment - interestPayment, 2);
  let newTotalPrincipal = principalPayment + totalPrincipal;
  let newLoanBalance   = loanBalance - principalPayment;

  
  if ( newLoanBalance < 0 ) {
    principalPayment = principalPayment + newLoanBalance;
    newTotalPrincipal = principalPayment + totalPrincipal;
    payment = principalPayment + interestPayment;
    newLoanBalance = 0;
  }
  
  let amortData = {
    payment,
    principalPayment,
    interestPayment,
    totalInterest: newTotalInterest,
    totalPrincipal: newTotalPrincipal,
    loanBalance: newLoanBalance
  };
  return amortData;
}

const calculateAmortization = (payment, periods, periodicInterestRate, loanBalance, totalInterest = 0, totalPrincipal = 0, amortArray = []) => {
  
  let amortData = calculateMonthlyAmortization(payment, periodicInterestRate, totalInterest, totalPrincipal, loanBalance);
 
  amortArray.push(amortData);

  if (amortArray.length < periods && amortData.loanBalance > 0) {
    return calculateAmortization(payment, periods, periodicInterestRate, amortData.loanBalance, amortData.totalInterest, amortData.totalPrincipal, amortArray);
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
  // roundDown,
  // roundHalfToEven,
  // roundNum,
  // roundUp
};

