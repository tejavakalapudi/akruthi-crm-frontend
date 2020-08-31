import { SET_LOADING } from '../../../constants/actionTypes';
import initialState from '../initialState';

export default function authReducer(state = initialState.appState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isBusy: action.payload };
    default:
      return state;
  }
}
