import { SET_AUTH, RESET_AUTH } from '../../../constants/actionTypes';
import initialState from '../initialState';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, isAuthorized: action.isAuthorized, user: action.user };
    case RESET_AUTH:
      return initialState.auth;
    default:
      return state;
  }
}
