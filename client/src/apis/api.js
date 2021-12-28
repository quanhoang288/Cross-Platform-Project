import axios from 'axios';
import { API_URL } from '../configs';

const abortFetchSignal = (timeout = 5 * 1000) => {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort, timeout);
  return abortController.signal;
};

const axiosClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  responseType: 'json',
  timeout: 15 * 1000,
});

export { abortFetchSignal };

export default axiosClient;
