import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL: Platform.select({
    default: 'http://192.168.68.104:50000',
    android: 'http://10.0.2.2:50000',
    ios: 'http://127.0.0.1:50000',
  }),
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('user_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
