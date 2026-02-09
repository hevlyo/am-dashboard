import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true,
  timeout: 10000,
});

export type ResponseConfig<TData> = AxiosResponse<TData>;

export const client = async <TData, _TError = AxiosError, TVariables = any>(
  config: AxiosRequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  return axiosInstance.request<TData>(config);
};

export default client;
