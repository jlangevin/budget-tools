import React, { Component } from 'react';

class YearsToRetirement extends Component {

  state = {};

  render() {

    return (
      <div>
        <h4>
          Years to Retirement
        </h4>

        <ul>
          Assumptions:
          <li>5% return on investment after inflation while saving</li>
          <li>4% withdrawal rate</li>
        </ul>
      </div>
    );
  }
}

export default YearsToRetirement;