import * as querystring from 'querystring';

import axios from 'axios';

axios.defaults.paramsSerializer = (params: unknown) => {
  return querystring.stringify(params as { [key: string]: string });
};

export const apiInstance = axios.create({
  baseURL: '/',
});

apiInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
