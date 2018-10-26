// native rounding
const roundHalfUpAsymmetric = value => Math.round(value);

const roundHalfUpSymmetric = value => {
  if (value >= 0) {
    return Math.round(value);
  }
  return value % 0.5 === 0 ? 
         Math.floor(value) : 
         Math.round(value);
};

const roundHalfDownAsymmetric = value => {
  return value % 0.5 === 0 ?
         Math.floor(value) : 
         Math.round(value);
};

const roundHalfDownSymmetric = value => {
  return value % 0.5 === 0 ? 
         (
           value < 0 ? 
           Math.round(value) : 
           Math.floor(value)
         ) :
         Math.round(value);
};

// Banker's rounding
const roundHalfEven = value => {
  if (value % 0.5 !== 0) {
    return Math.round(value);
  }
  return Math.floor(value) % 2 === 0 ? 
         Math.floor(value) : 
         Math.round(value);
};

const roundHalfOdd = value => {
  if (value % 0.5 !== 0) {
    return Math.round(value);
  }
    
  return Math.floor(value) % 2 !== 0 ?
         Math.floor(value) : 
         Math.round(value);
};

const roundCeiling = (value) => {
  return parseInt(value, 10) === value ?
         value : 
         Math.floor(value + 1);
};

const roundFloor = value => {
  return parseInt(value, 10) === value ? 
         value : 
         Math.round(value - 0.5);
};

const roundTowardsZero = value => {
  return value < 0 ? 
         Math.floor(value + 1) : 
         Math.floor(value);
};

const roundAwayFromZero = value => {
  return (parseInt(value, 10) !== value && value > 0) ? 
         Math.floor(value + 1) : 
         Math.floor(value);
};

export {
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
};