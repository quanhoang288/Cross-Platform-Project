import { Platform } from 'react-native';

const API_URL =
<<<<<<< HEAD
  Platform.OS === 'web' ? 'http://localhost:8000' : 'http://192.168.2.11:8000';
const ASSET_API_URL = `${API_URL}/public`;
const SOCKET_URL =
  Platform.OS === 'web' ? 'ws://localhost:3000' : 'ws://192.168.2.11:3000';
=======
  Platform.OS === 'web' ? 'http://localhost:8000' : 'http://192.168.0.101:8000';
const ASSET_API_URL = `${API_URL}/public`;
const SOCKET_URL =
  Platform.OS === 'web' ? 'ws://localhost:3000' : 'ws://192.168.0.101:3000';
>>>>>>> 5762a0096c32f48a14a637a00f152fada39c83ba

export { API_URL, ASSET_API_URL, SOCKET_URL };
