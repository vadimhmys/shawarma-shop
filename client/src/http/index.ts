import axios, { InternalAxiosRequestConfig } from 'axios';

const guestInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://shawarma-7f3078b82282.herokuapp.com/api/' : process.env.REACT_APP_API_URL,
  withCredentials: true
});

const authInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://shawarma-7f3078b82282.herokuapp.com/' : process.env.REACT_APP_IMG_URL,
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