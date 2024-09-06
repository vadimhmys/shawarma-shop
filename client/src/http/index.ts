import axios, { InternalAxiosRequestConfig } from 'axios';

const guestInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

const authInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    if (config.headers) config.headers.authorization = 'Bearer ' + localStorage.getItem('token');
  }
  return config;
};
authInstance.interceptors.request.use(authInterceptor);

export {
  guestInstance,
  authInstance
}