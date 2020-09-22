import axios from 'axios';
import { SERVER_API } from '../constants/apis';

export default {
  getAllStatuses: () => axios.get(`${SERVER_API}/statuses`),
};
