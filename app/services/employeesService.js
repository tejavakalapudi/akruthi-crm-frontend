import axios from 'axios';
import { SERVER_API } from '../constants/apis';

export default {
  getAllEmployees: () => axios.get(`${SERVER_API}/employees`),
};
