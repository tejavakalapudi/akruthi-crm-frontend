import axios from 'axios';
import { SERVER_API } from '../constants/apis';

export default {
  createLead: () => axios.post(`${SERVER_API}/leads`),
  getAllLeads: () => axios.get(`${SERVER_API}/leads`),
  getLeadById: () => axios.get(`${SERVER_API}/leads/:id`),
  updateLead: () => axios.put(`${SERVER_API}/leads/:id`),
  deleteLead: () => axios.delete(`${SERVER_API}/leads/:id`),
};
