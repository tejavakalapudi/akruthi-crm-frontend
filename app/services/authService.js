import axios from 'axios';
import { SERVER_API } from '../constants/apis';

export default {
  postAuth: () => axios.post(`${SERVER_API}/auth`),
  getVentures: () => axios.get(`${SERVER_API}/ventures`),
};
