import axios from 'axios';
import { SERVER_API } from '../constants/apis';

export default {
  getAllVentures: () => axios.get(`${SERVER_API}/ventures`),
};
