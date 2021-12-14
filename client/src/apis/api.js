import axios from 'axios';
import { API_URL } from '../configs';

const axiosClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  responseType: 'json',
  timeout: 15 * 1000,
});


export default axiosClient;
