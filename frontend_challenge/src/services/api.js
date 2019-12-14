import axios from "axios";
import { getToken } from "./auth";

let baseUrl = "http://localhost:8080/";
// baseUrl = "http://192.168.99.100:8080/";

const api = axios.create({
    baseURL: baseUrl
});

api.baseUrl = baseUrl;

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;