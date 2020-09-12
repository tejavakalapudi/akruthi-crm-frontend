import leadsService from '../../services/leadsService';
import * as types from '../../constants/actionTypes';

const setLeads = (payload) => ({
  type: types.SET_LEADS,
  payload,
});

const getAllLeads = () => async (dispatch) => {
  const leadsFetched = await leadsService.getAllLeads();
  return dispatch(setLeads(leadsFetched.data.data));
};

export default { getAllLeads };
