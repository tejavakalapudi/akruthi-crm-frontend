import statusesService from '../../services/statuses';
import * as types from '../../constants/actionTypes';

const setStatuses = (payload) => ({
  type: types.SET_STATUSES,
  payload,
});

const getAllStatuses = () => async (dispatch) => {
  const leadsFetched = await statusesService.getAllStatuses();
  return dispatch(setStatuses(leadsFetched.data));
};

export default { getAllStatuses };
