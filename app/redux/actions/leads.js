import leadsService from '../../services/leadsService';
import * as types from '../../constants/actionTypes';
import AppStateActions from './appState';

const setLeads = (payload) => ({
  type: types.SET_LEADS,
  payload,
});

const getAllLeads = (page = 1, limit = 10) => async (dispatch) => {
  const leadsFetched = await leadsService.getAllLeads(page, limit);
  dispatch(AppStateActions.setIsBusy(false));
  return dispatch(setLeads(leadsFetched.data));
};

const bulkUploadLeads = (bulkCsv) => async () => {
  const data = new FormData();
  data.append('file', bulkCsv);
  const leadsUploaded = await leadsService.bulkUploadLeads(data);
  return leadsUploaded;
};

const setLead = (payload, actionType = 'createLead', id) => async (dispatch) => {
  dispatch(AppStateActions.setIsBusy(true));
  await leadsService[actionType](payload, id);
  return dispatch(getAllLeads());
};

const deleteLeads = (ids) => async (dispatch) => {
  dispatch(AppStateActions.setIsBusy(true));
  await leadsService.deleteLeads(ids);
  return dispatch(getAllLeads());
};

export default { getAllLeads, bulkUploadLeads, setLead, deleteLeads };
