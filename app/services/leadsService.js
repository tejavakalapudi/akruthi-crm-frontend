import axios from 'axios';
import { SERVER_API } from '../constants/apis';

export default {
  createLead: (payload) => axios.post(`${SERVER_API}/leads`, payload),
  bulkUploadLeads: (csvFile) =>
    axios.post(`${SERVER_API}/leads/bulk-upload`, csvFile, {
      headers: { 'content-type': 'multipart/form-data' },
    }),
  getAllLeads: (page = 1, limit = 10) => axios.get(`${SERVER_API}/leads?limit=${limit}&page=${page}`),
  getLeadById: () => axios.get(`${SERVER_API}/leads/:id`),
  updateLead: (payload, id) => axios.put(`${SERVER_API}/leads/${id}`, payload),
  deleteLead: () => axios.delete(`${SERVER_API}/leads/:id`),
  deleteLeads: (ids) => axios.delete(`${SERVER_API}/leads/${ids.join()}`),
};
