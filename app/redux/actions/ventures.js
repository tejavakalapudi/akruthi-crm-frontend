import venturesService from '../../services/venturesService';
import * as types from '../../constants/actionTypes';

const setVentures = (payload) => ({
  type: types.SET_VENTURES,
  payload,
});

const getAllVentures = () => async (dispatch) => {
  const venturesFetched = await venturesService.getAllVentures();
  return dispatch(setVentures(venturesFetched.data));
};

export default { getAllVentures };
