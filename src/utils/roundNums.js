// native rounding
const roundHalfUpAsymmetric = (value, decimals=0) => {
  const multiplier = 10**decimals;
  return Math.round(value * multiplier) / multiplier;
}

const roundHalfUpSymmetric = (value, decimals=0) => {
  const multiplier = 10**decimals;
  let newValue = value * multiplier;
  if (newValue >= 0) {
    return Math.round(newValue) / multiplier;
  }
  newValue = newValue % 0.5 === 0 ? 
         Math.floor(newValue) : 
         Math.round(newValue);
  return newValue / multiplier;
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
const roundHalfEven = (value, decimals=0) => {
  const multiplier = 10**decimals;
  let newValue = value * multiplier;
  if (newValue % 0.5 !== 0) {
    newValue = Math.round(newValue);
  } else {
    newValue = Math.floor(newValue) % 2 === 0 ? 
            Math.floor(newValue) : 
            Math.round(newValue);
  }
  return newValue / multiplier;
};

const roundHalfOdd = value => {
  if (value % 0.5 !== 0) {
    return Math.round(value);
  }
    
  return Math.floor(value) % 2 !== 0 ?
         Math.floor(value) : 
         Math.round(value);
};

const roundCeiling = (value, decimals=0) => {
  const multiplier = 10**decimals;
  let newValue = value * multiplier;
  newValue = parseInt(newValue, 10) === newValue ?
             newValue : 
             Math.floor(newValue + 1);
  return newValue / multiplier;
};

const roundFloor = (value, decimals=0) => {
  const multiplier = 10**decimals;
  let newValue = value * multiplier;
  newValue = parseInt(newValue, 10) === newValue ? 
             newValue : 
             Math.round(newValue - 0.5);
  return newValue / multiplier;
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