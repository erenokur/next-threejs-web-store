import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class AxiosClient {
  private readonly instance: AxiosInstance;

  constructor(baseURL: string, headers?: AxiosRequestConfig["headers"]) {
    this.instance = axios.create({
      baseURL,
      headers: {
        ...headers,
        // Set the Authorization header to the JWT token if it is available
        Authorization: `Bearer ${typeof window !== 'undefined' && localStorage.getItem("token")}`,
      },
    });

    this.instance.interceptors.response.use(
      this.handleSuccessResponse,
      this.handleErrorResponse
    );
  }

  private handleSuccessResponse(response: AxiosResponse) {
    return response;
  }

  private handleErrorResponse(error: any) {
    return Promise.reject(error);
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.instance.get(url, config);
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post(url, data, config);
  }

  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, config);
  }
}

