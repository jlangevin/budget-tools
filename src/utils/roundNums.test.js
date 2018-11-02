import {
  roundHalfUpSymmetric,
  roundHalfUpAsymmetric,
  roundHalfDownSymmetric,
  roundHalfDownAsymmetric,
  roundHalfEven,
  roundHalfOdd,
  roundCeiling,
  roundFloor,
  roundTowardsZero,
  roundAwayFromZero
} from './roundNums';

describe('rounding functions', () => {
  it('roundHalfUpSymmetric() should round the half up/away from zero for both negative and positive, to the specified numer of decimals', () => {
    expect(roundHalfUpSymmetric(-5.4)).toEqual(-5);
    expect(roundHalfUpSymmetric(-5.5)).toEqual(-6);
    expect(roundHalfUpSymmetric(-5.6)).toEqual(-6);
    expect(roundHalfUpSymmetric(0.5)).toEqual(1);
    expect(roundHalfUpSymmetric(5.0)).toEqual(5);
    expect(roundHalfUpSymmetric(1, 2)).toEqual(1.00);
    expect(roundHalfUpSymmetric(1.2, 2)).toEqual(1.20);
    expect(roundHalfUpSymmetric(1.23, 2)).toEqual(1.23);
    expect(roundHalfUpSymmetric(1.234, 2)).toEqual(1.23);
    expect(roundHalfUpSymmetric(1.235, 2)).toEqual(1.24);
    expect(roundHalfUpSymmetric(1.4, 0)).toEqual(1);
    expect(roundHalfUpSymmetric(1.5, 0)).toEqual(2);
    expect(roundHalfUpSymmetric(1.14, 1)).toEqual(1.1);
    expect(roundHalfUpSymmetric(1.15, 1)).toEqual(1.2);
  });

  it('roundHalfUpAsymmetric() should return a rounded number of', () => {
    expect(roundHalfUpAsymmetric(5.4)).toEqual(5);
    expect(roundHalfUpSymmetric(5.5)).toEqual(6);
    expect(roundHalfUpSymmetric(5.6)).toEqual(6);
    expect(roundHalfUpSymmetric(-5.4)).toEqual(-5);
    expect(roundHalfUpSymmetric(-5.5)).toEqual(-6);
    expect(roundHalfUpSymmetric(-5.6)).toEqual(-6);
    expect(roundHalfUpSymmetric(-0.5)).toEqual(-1);
    expect(roundHalfUpSymmetric(0.5)).toEqual(1);
    expect(roundHalfUpSymmetric(5.0)).toEqual(5);
  });

  it('roundHalfDownSymmetric() should round the half down/toward from zero for both negative and positive', () => {
    expect(roundHalfDownSymmetric(5.4)).toEqual(5);
    expect(roundHalfDownSymmetric(5.5)).toEqual(5);
    expect(roundHalfDownSymmetric(5.6)).toEqual(6);
    expect(roundHalfDownSymmetric(-5.4)).toEqual(-5);
    expect(roundHalfDownSymmetric(-5.5)).toEqual(-5);
    expect(roundHalfDownSymmetric(-5.6)).toEqual(-6);
    expect(roundHalfDownSymmetric(0.5)).toEqual(0);
    expect(roundHalfDownSymmetric(5.0)).toEqual(5);
  });

  it('roundHalfDownAsymmetric() should round the half down to next lowest number including negative nums.', () => {
    expect(roundHalfDownAsymmetric(5.4)).toEqual(5);
    expect(roundHalfDownAsymmetric(5.5)).toEqual(5);
    expect(roundHalfDownAsymmetric(5.6)).toEqual(6);
    expect(roundHalfDownAsymmetric(-5.4)).toEqual(-5);
    expect(roundHalfDownAsymmetric(-5.5)).toEqual(-6);
    expect(roundHalfDownAsymmetric(-5.6)).toEqual(-6);
    expect(roundHalfDownAsymmetric(0.5)).toEqual(0);
    expect(roundHalfDownAsymmetric(5.0)).toEqual(5);
  });

  it('roundHalfEven() should round the half to the nearest even number', () => {
    expect(roundHalfEven(4.4, 0)).toEqual(4);
    expect(roundHalfEven(4.5, 0)).toEqual(4);
    expect(roundHalfEven(5.4, 0)).toEqual(5);
    expect(roundHalfEven(5.5, 0)).toEqual(6);
    expect(roundHalfEven(5.6, 0)).toEqual(6);
    expect(roundHalfEven(-5.4, 0)).toEqual(-5);
    expect(roundHalfEven(-5.5, 0)).toEqual(-6);
    expect(roundHalfEven(-5.6, 0)).toEqual(-6);
    expect(roundHalfEven(0.5, 0)).toEqual(0);
    expect(roundHalfEven(5.0, 0)).toEqual(5);
  });

  it('roundHalfOdd() should round the half to the nearest odd number', () => {
    expect(roundHalfOdd(4.4)).toEqual(4);
    expect(roundHalfOdd(4.5)).toEqual(5);
    expect(roundHalfOdd(4.6)).toEqual(5);
    expect(roundHalfOdd(5.4)).toEqual(5);
    expect(roundHalfOdd(5.5)).toEqual(5);
    expect(roundHalfOdd(5.6)).toEqual(6);
    expect(roundHalfOdd(-4.4)).toEqual(-4);
    expect(roundHalfOdd(-4.5)).toEqual(-5);
    expect(roundHalfOdd(-4.6)).toEqual(-5);
    expect(roundHalfOdd(-5.4)).toEqual(-5);
    expect(roundHalfOdd(-5.5)).toEqual(-5);
    expect(roundHalfOdd(-5.6)).toEqual(-6);
    expect(roundHalfOdd(0.5)).toEqual(1);
    expect(roundHalfOdd(5.0)).toEqual(5);
  });

  it('roundCeiling() should round up to the next largest whole number', () => {
    expect(roundCeiling(5.4)).toEqual(6);
    expect(roundCeiling(5.5)).toEqual(6);
    expect(roundCeiling(5.6)).toEqual(6);
    expect(roundCeiling(-5.4, 0)).toEqual(-5);
    expect(roundCeiling(-5.5, 0)).toEqual(-5);
    expect(roundCeiling(-5.6, 0)).toEqual(-5);
    expect(roundCeiling(0.5, 0)).toEqual(1);
    expect(roundCeiling(5.0, 0)).toEqual(5);
    expect(roundCeiling(5.554, 2)).toEqual(5.56);
    expect(roundCeiling(5.555, 2)).toEqual(5.56);
    expect(roundCeiling(5.556, 2)).toEqual(5.56);
    expect(roundCeiling(-5.554, 2)).toEqual(-5.55);
    expect(roundCeiling(-5.555, 2)).toEqual(-5.55);
    expect(roundCeiling(-5.556, 2)).toEqual(-5.55);
    expect(roundCeiling(0.555, 2)).toEqual(.56);
    expect(roundCeiling(5.550, 2)).toEqual(5.55);
    expect(roundCeiling(1.234, 2)).toEqual(1.24);
    expect(roundCeiling(1.235, 2)).toEqual(1.24);
    expect(roundCeiling(1.2344, 3)).toEqual(1.235);
    expect(roundCeiling(1.2355, 3)).toEqual(1.236);
  });



  it('roundFloor() should round down to the specified number of decimal places', () => {
    expect(roundFloor(5.4)).toEqual(5);
    expect(roundFloor(5.5)).toEqual(5);
    expect(roundFloor(5.6)).toEqual(5);
    expect(roundFloor(-5.4)).toEqual(-6);
    expect(roundFloor(-5.5)).toEqual(-6);
    expect(roundFloor(-5.6)).toEqual(-6);
    expect(roundFloor(0.5)).toEqual(0);
    expect(roundFloor(5.0)).toEqual(5);
    expect(roundFloor(1.234, 2)).toEqual(1.23);
    expect(roundFloor(1.235, 2)).toEqual(1.23);
    expect(roundFloor(1.2344, 3)).toEqual(1.234);
    expect(roundFloor(1.2355, 3)).toEqual(1.235);
  });


  it('roundTowardsZero() should round toward zero', () => {
    expect(roundTowardsZero(5.4)).toEqual(5);
    expect(roundTowardsZero(5.5)).toEqual(5);
    expect(roundTowardsZero(5.6)).toEqual(5);
    expect(roundTowardsZero(-5.4)).toEqual(-5);
    expect(roundTowardsZero(-5.5)).toEqual(-5);
    expect(roundTowardsZero(-5.6)).toEqual(-5);
    expect(roundTowardsZero(0.5)).toEqual(0);
    expect(roundTowardsZero(5.0)).toEqual(5);
  });

  it('roundAwayFromZero() should round away from zero', () => {
    expect(roundAwayFromZero(5.4)).toEqual(6);
    expect(roundAwayFromZero(5.5)).toEqual(6);
    expect(roundAwayFromZero(5.6)).toEqual(6);
    expect(roundAwayFromZero(-5.4)).toEqual(-6);
    expect(roundAwayFromZero(-5.5)).toEqual(-6);
    expect(roundAwayFromZero(-5.6)).toEqual(-6);
    expect(roundAwayFromZero(0.5)).toEqual(1);
    expect(roundAwayFromZero(5.0)).toEqual(5);
  });

});
