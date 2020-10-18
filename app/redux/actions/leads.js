import leadsService from '../../services/leadsService';
import * as types from '../../constants/actionTypes';
import AppStateActions from './appState';

const setLeads = (payload) => ({
  type: types.SET_LEADS,
  payload,
});

const getAllLeads = () => async (dispatch) => {
  const leadsFetched = await leadsService.getAllLeads();
  dispatch(AppStateActions.setIsBusy(false));
  return dispatch(setLeads(leadsFetched.data.data));
};

const bulkUploadLeads = (bulkCsv) => async () => {
  const data = new FormData();
  data.append('file', bulkCsv);
  const leadsUploaded = await leadsService.bulkUploadLeads(data);
  return leadsUploaded;
};

const createLead = (payload) => async (dispatch) => {
  dispatch(AppStateActions.setIsBusy(true));
  await leadsService.createLead(payload);
  await leadsService.getAllLeads();
  return dispatch(AppStateActions.setIsBusy(false));
};

export default { getAllLeads, bulkUploadLeads, createLead };
