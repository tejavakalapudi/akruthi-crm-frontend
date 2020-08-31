import * as types from '../../constants/actionTypes';

const setIsBusy = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

export default { setIsBusy };
