import { combineReducers } from 'redux';

import debtsReducer from './debtReducer';

export default combineReducers({
	debts: debtsReducer,
});