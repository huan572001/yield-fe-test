import axios from "axios";
import QueryString from "qs";

export const request = axios.create({
  headers: {
    "content-type": "application/json;charset=UTF-8",
  },
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 50000,
});

request.defaults.paramsSerializer = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize: (params: Record<string, any>) => {
    return QueryString.stringify(params, { arrayFormat: "repeat" });
  },
};

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use((response) => {
  if (response.data) return response.data;

  return response;
});
