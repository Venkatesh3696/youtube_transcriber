import axios from "axios";

const baseURL = "http://localhost:5000";

export const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default API;
