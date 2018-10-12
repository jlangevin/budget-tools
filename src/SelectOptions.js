import React from 'react';

const SelectOptions = function({ optionsArray }) {
  return optionsArray.map(option => {
    return <option key={ `opt${option.value}` } value={ option.value }>{ option.text }</option>
  });
}

export default SelectOptions;