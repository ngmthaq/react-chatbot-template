import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export class Api {
  private instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create();
    this.instance.defaults.baseURL = window.__ENV__.VITE_PUBLIC_API_BASE_URL;
    this.instance.defaults.timeout = 30000;
  }

  public get(
    url: string,
    params: Record<string, unknown> = {},
    config: AxiosRequestConfig = {},
  ) {
    return this.instance.get(url, { params, ...config });
  }

  public post(
    url: string,
    data: unknown = {},
    config: AxiosRequestConfig = {},
  ) {
    return this.instance.post(url, data, config);
  }

  public put(url: string, data: unknown = {}, config: AxiosRequestConfig = {}) {
    return this.instance.put(url, data, config);
  }

  public patch(
    url: string,
    data: unknown = {},
    config: AxiosRequestConfig = {},
  ) {
    return this.instance.patch(url, data, config);
  }

  public delete(
    url: string,
    params: Record<string, unknown> = {},
    config: AxiosRequestConfig = {},
  ) {
    return this.instance.delete(url, { params, ...config });
  }
}

export const api = new Api();
