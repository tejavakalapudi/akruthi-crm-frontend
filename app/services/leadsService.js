import axios from 'axios';
import { SERVER_API } from '../constants/apis';

export default {
  createLead: (payload) => axios.post(`${SERVER_API}/leads`, payload),
  bulkUploadLeads: (csvFile) =>
    axios.post(`${SERVER_API}/leads/bulk-upload`, csvFile, {
      headers: { 'content-type': 'multipart/form-data' },
    }),
  getAllLeads: (limit = 10) => axios.get(`${SERVER_API}/leads?limit=${limit}`),
  getLeadById: () => axios.get(`${SERVER_API}/leads/:id`),
  updateLead: () => axios.put(`${SERVER_API}/leads/:id`),
  deleteLead: () => axios.delete(`${SERVER_API}/leads/:id`),
};
