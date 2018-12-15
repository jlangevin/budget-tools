import * as actions from './types';

export const setPaydownMethod = (paydownMethod) => dispatch => {
  dispatch({
    type: actions.SET_PAYDOWN_METHOD,
    payload: paydownMethod
  });
}
