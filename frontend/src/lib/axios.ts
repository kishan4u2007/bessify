import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api", // Always use API URL from .env
  withCredentials: true, // Required for authentication cookies/tokens
});
