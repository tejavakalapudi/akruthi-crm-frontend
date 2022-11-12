import { SET_ALERT, RESET_ALERT } from '../../../constants/actionTypes';
import initialState from '../initialState';

export default function authReducer(state = initialState.alert, action) {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, ...action.payload, open: true };
    case RESET_ALERT:
      return initialState.alert;
    default:
      return state;
  }
}
