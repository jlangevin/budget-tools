const calculateLoanPayment = (rate, duration, principal) => {
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
    return Math.round(payment);
}

const getValidDecimal = (value, wholePlaces=2, decimalPlaces=2) => {
    let regex = new RegExp("((?:\\d{0," + wholePlaces + "})(?:\\.\\d{0," + decimalPlaces + "}|\\d{0}))");
    let match = value.match(regex);
    return match.length ? match[0] : '';
  };

export { calculateLoanPayment, getValidDecimal };