import axios from 'axios';
import firebaseAuth from '../firebase';
import { SERVER_API } from '../constants/apis';

axios.interceptors.request.use(
  async (config) => {
    try {
      const jwtToken = await firebaseAuth.currentUser.getIdToken();
      return {
        ...config,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'x-client-id': 'seed',
        },
      };
    } catch (error) {
      return console.log('-------', error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  postAuth: () => axios.post(`${SERVER_API}/auth`),
  getVentures: () => axios.get(`${SERVER_API}/ventures`),
};
