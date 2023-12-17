import axios, {AxiosError} from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 20000,
});

API.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (config: any) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    console.log(config, 'asd');
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  },
);
