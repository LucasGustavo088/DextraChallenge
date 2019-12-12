import axios from "axios";
import { getToken } from "./auth";

const baseUrl = "http://localhost:8080/";
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