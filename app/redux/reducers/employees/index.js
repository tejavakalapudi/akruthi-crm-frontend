import { SET_EMPLOYEES } from '../../../constants/actionTypes';
import initialState from '../initialState';

export default function leadsReducer(state = initialState.employees, action) {
  switch (action.type) {
    case SET_EMPLOYEES:
      return action.payload;
    default:
      return state;
  }
}
