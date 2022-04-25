/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import AuthService from './AuthService';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    const refreshToken = await localStorage.getItem('@Events:refresh_token');

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;
      const response = await AuthService.getNewToken(refreshToken);
      const { access_token: token, refresh_token } = response.data;

      await localStorage.setItem('@Events:refresh_token', refresh_token);

      await localStorage.setItem('@Events:token', token);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Api.defaults.headers.authorization = `Bearer ${token}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
