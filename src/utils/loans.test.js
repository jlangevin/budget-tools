import {
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
} from './loans';

describe('formatMoney()', () => {
  it('should return a string in US dollar format (rounded to two decimal places)', () => {
    expect(formatMoney(1)).toEqual('$1.00');
    expect(formatMoney(1.234)).toEqual('$1.23');
    expect(formatMoney(2.345)).toEqual('$2.35');
  });
});

describe('getValidDecimal()', () => {
  it('should allow only numbers and decimal point as the user types', () => {
    expect(getValidDecimal('x')).toBe('');
    expect(getValidDecimal('1x')).toBe('1');
    expect(getValidDecimal('1.x')).toBe('1.');
    expect(getValidDecimal('.')).toBe('.');
  });

  it('should default to 2 whole numbers and 2 decimal places if none are passed in', () => {
    expect(getValidDecimal('.0')).toBe('.0');
    expect(getValidDecimal('1')).toBe('1');
    expect(getValidDecimal('1.')).toBe('1.');
    expect(getValidDecimal('1.1')).toBe('1.1');
    expect(getValidDecimal('12.12')).toBe('12.12');
    expect(getValidDecimal('123')).toBe('12');
    expect(getValidDecimal('12.123')).toBe('12.12');
  });

  it('should limit whole numbers and decimal places when passed in', () => {
    expect(getValidDecimal('.', 1, 0)).toBe('.');
    expect(getValidDecimal('.1', 1, 0)).toBe('.');
    expect(getValidDecimal('1.2', 1, 0)).toBe('1.');
    expect(getValidDecimal('12', 1, 0)).toBe('1');
    expect(getValidDecimal('1234', 3, 0)).toBe('123');
    expect(getValidDecimal('1.1234', 3, 3)).toBe('1.123');
  });
});

describe('calculateMonthlyPayment()', () => {
  it('should return a decimal number equal to the monthly payment', () => {
    // rate, duration, principal
    expect(calculateMonthlyPayment(5, 10, 1)).toEqual(.01);
    expect(calculateMonthlyPayment(5, 10, 10)).toEqual(.11);
    expect(calculateMonthlyPayment(5, 10, 100)).toEqual(1.06);
    expect(calculateMonthlyPayment(5, 10, 1000)).toEqual(10.61);
    expect(calculateMonthlyPayment(5, 10, 10000)).toEqual(106.07);
    expect(calculateMonthlyPayment(5, 10, 100000)).toEqual(1060.66);
    expect(calculateMonthlyPayment(5, 10, 1000000)).toEqual(10606.65);
  });
});

describe('numberMonthsInYears()', () => {
  it('should return a number 12 times the number of years passed in', () => {
    expect(numberMonthsInYears(5)).toEqual(60);
  });
});

describe('getMonthlyRateFromAPR()', () => {
  it('should return a number 1/12th of the APR passed in', () => {
    expect(getMonthlyRateFromAPR(6)).toEqual(.005);
  });
});

// describe('calculateMonthlyAmortization()', () => {
//   it('should return an object with payment, interest and balance info', () => {
//     expect(calculateMonthlyAmortization(536.82, .05/12, 0, 100000)).toEqual({
//       monthlyPayment   : 536.82,
//       principalPayment : 120.16,
//       interestPayment  : 416.67,
//       totalInterest    : 416.67,
//       loanBalance      : 99879.84
//     });
//   });
// });

describe('calculateInterest()', () => {
  it('should return the product of the rate and principal', () => {
    expect(calculateInterest(.1, 100)).toEqual(10);
  });
});

// describe('calculateAmortization()', () => {

// });
