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

const calculateMonthlyPayment = (rate, duration, principal) => {
  // P = (Pv*R) / [1 - (1 + R)^(-n)]
  //     P = Monthly Payment
  //     Pv = Present Value (starting value of the loan)
  //     APR = Annual Percentage Rate
  //     R = Periodic Interest Rate = APR/number of interest periods per year
  //     n = Total number of interest periods (interest periods per year * number of years)

  // Convert the APR to a monthly rate by dividing by 100 and then by 12 months.
  let monthlyRate = +rate / 100 / 12;

  // Multiply the mortgage term in years by 12 to get total monthly payments.
  let months = +duration * 12;

  // Raise ( 1 plus the monthly rate ) to the negative power of the number of monthly 
  // payments. Subtract that result from 1.
  let raise = 1 - Math.pow(monthlyRate + 1, -months);

  // Divide the monthly rate by the result and multiply by the amount borrowed.
  let payment = monthlyRate / raise * principal;

  // Round payment
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