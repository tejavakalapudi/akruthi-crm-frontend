import { SET_STATUSES } from '../../../constants/actionTypes';
import initialState from '../initialState';

export default function leadsReducer(state = initialState.statuses, action) {
  switch (action.type) {
    case SET_STATUSES:
      return action.payload;
    default:
      return state;
  }
}
