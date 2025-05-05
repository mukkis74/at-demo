import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * API Client for making HTTP requests
 */
export class ApiClient {
  private client: AxiosInstance;
  private baseUrl: string;

  /**
   * Creates a new API client
   * @param baseUrl Base URL for API requests
   * @param config Additional Axios configuration
   */
  constructor(baseUrl: string, config: AxiosRequestConfig = {}) {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...config,
    });
  }

  /**
   * Makes a GET request to the specified endpoint
   * @param endpoint API endpoint
   * @param params Query parameters
   * @returns Promise with response data
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(endpoint, { params });
    return response.data;
  }

  /**
   * Makes a POST request to the specified endpoint
   * @param endpoint API endpoint
   * @param data Request body
   * @returns Promise with response data
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(endpoint, data);
    return response.data;
  }

  /**
   * Makes a PUT request to the specified endpoint
   * @param endpoint API endpoint
   * @param data Request body
   * @returns Promise with response data
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(endpoint, data);
    return response.data;
  }

  /**
   * Makes a DELETE request to the specified endpoint
   * @param endpoint API endpoint
   * @returns Promise with response data
   */
  async delete<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(endpoint);
    return response.data;
  }

  /**
   * Sets an authorization token for subsequent requests
   * @param token Authorization token
   */
  setAuthToken(token: string): void {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Clears the authorization token
   */
  clearAuthToken(): void {
    delete this.client.defaults.headers.common['Authorization'];
  }
}