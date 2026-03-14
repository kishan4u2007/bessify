import axios from "axios";

const defaultApiUrl =
  typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : "/api";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultApiUrl,
  withCredentials: true, // Required for authentication cookies/tokens
});
