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

const bulkUploadLeads = (bulkCsv) => async () => {
  const data = new FormData();
  data.append('file', bulkCsv);
  const leadsUploaded = await leadsService.bulkUploadLeads(data);
  return leadsUploaded;
};

export default { getAllLeads, bulkUploadLeads };
