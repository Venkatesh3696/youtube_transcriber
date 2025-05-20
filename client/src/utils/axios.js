import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default API;
