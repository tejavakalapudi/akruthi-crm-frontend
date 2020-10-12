import axios from 'axios';
import { SERVER_API } from '../constants/apis';

export default {
  createLead: () => axios.post(`${SERVER_API}/leads`),
  bulkUploadLeads: (csvFile) =>
    axios.post(`${SERVER_API}/leads/bulk-upload`, csvFile, {
      headers: { 'content-type': 'multipart/form-data' },
    }),
  getAllLeads: (limit, page) => axios.get(`${SERVER_API}/leads?limit=${limit}&page=${page}`),
  getLeadById: () => axios.get(`${SERVER_API}/leads/:id`),
  updateLead: () => axios.put(`${SERVER_API}/leads/:id`),
  deleteLead: () => axios.delete(`${SERVER_API}/leads/:id`),
};
