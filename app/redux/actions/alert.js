import * as types from '../../constants/actionTypes';

const setAlert = (payload) => ({
  type: types.SET_ALERT,
  payload,
});

const resetAlert = () => ({
  type: types.RESET_ALERT,
});

export default { setAlert, resetAlert };
