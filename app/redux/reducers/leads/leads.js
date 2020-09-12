import { SET_LEADS } from '../../../constants/actionTypes';
import initialState from '../initialState';

export default function leadsReducer(state = initialState.leads, action) {
  switch (action.type) {
    case SET_LEADS:
      return action.payload;
    default:
      return state;
  }
}
