import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input, Label } from 'reactstrap';
import { setPaydownMethod } from '../../actions/debt';

const DebtRepaymentCalculator = ({paydownMethod, setPaydownMethod}) => {
  return (
    <div>
      <h4>Debt Repayment Calculator</h4>
      
      <div>
        { paydownMethod }
        
        <FormGroup tag="fieldset">  
          <Label>Paydown Method</Label>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="paydownMethod"
                value="snowball"
                checked={ paydownMethod === 'snowball' ? true : false }
                onChange={() => setPaydownMethod('snowball')}
              /> Snowball
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="paydownMethod"
                value="fastest"
                checked={ paydownMethod === 'fastest' ? true : false }
                onChange={() => setPaydownMethod('fastest')}
              /> Fastest
            </Label>
          </FormGroup>
        </FormGroup>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    paydownMethod: state.debts.paydownMethod,
  }
};

export default connect(mapStateToProps, { setPaydownMethod })(DebtRepaymentCalculator);
