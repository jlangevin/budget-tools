import * as actions from '../actions/types';

const INITIAL_STATE = {
  paydownMethod: 'fastest', // fastest or snowball
  budget: 1500,
  accounts: [
    {
      id: 1,
      amount: '1000',
      description: 'Bank of Foo',
      apr: .04,
      minimumPaymentPct: null,
      minimumPayment: 100,
      category: 'Student Loan'
    },
    {
      id: 1,
      amount: '2000',
      description: 'Bank of Bar',
      apr: .056,
      minimumPaymentPct: null,
      minimumPayment: 200,
      category: 'Student Loan'
    },
    {
      id: 1,
      amount: '2500',
      description: 'Bank of Bar',
      apr: .019,
      minimumPaymentPct: null,
      minimumPayment: 150,
      category: 'Auto Loan'
    },
    {
      id: 1,
      amount: '1500',
      description: 'Bank of Bar',
      apr: .12,
      minimumPaymentPct: .02,
      minimumPayment: null,
      category: 'Credit Card'
    }
  ]
};

const debtsReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_PAYDOWN_METHOD: 
      return {
        ...state,
        paydownMethod: action.payload
      };

    // case actions.ADD_DEBT: 
    //   return {
    //     ...state,
    //     ...action.payload
    //   };

    // case actions.DELETE_DEBT:
    //   const delState = {
    //     ...state
    //   };
    //   delete delState[action.payload]; 
    //   return delState;

    // case actions.UPDATE_DEBT:
    //   const udState = {
    //     ...state
    //   };
    //   udState[action.payload.id] = action.payload;

    //   return {
    //     ...state,
    //     ...action.payload
    //   };

    default: 
      return state;
  }
};

export default debtsReducer;
