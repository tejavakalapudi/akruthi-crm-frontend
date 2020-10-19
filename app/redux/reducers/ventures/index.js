import { SET_VENTURES } from '../../../constants/actionTypes';
import initialState from '../initialState';

export default function leadsReducer(state = initialState.ventures, action) {
  switch (action.type) {
    case SET_VENTURES:
      return action.payload;
    default:
      return state;
  }
}
