import axios, { AxiosRequestConfig, type AxiosInstance } from 'axios';
import { API_ROUTES } from '@config/api.routes';

class AxiosService {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_ROUTES.ROOT,
      timeout: 10000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get<T>(url, config);
  }

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.axiosInstance.post<T>(url, data, config);
  }

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.axiosInstance.put<T>(url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.delete<T>(url, config);
  }
}

function createAxiosService() {
  return new AxiosService();
}

export default createAxiosService();
