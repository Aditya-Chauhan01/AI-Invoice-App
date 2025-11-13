import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle common errors globally
//     if (error.response) {
//       if (error.response.status === 500) {
//         console.error("Server error. Please try again later.");
//       }
//     } else if (error.code === "ECONNABORTED") {
//       console.error("Request timeout. Please try again.");
//     }
//     return Promise.reject(error);
//   }
// );


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // if the server responds 401 -> token invalid/expired -> redirect to login
    if (error && error.response && error.response.status === 401) {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // optional: remove refreshToken if you have one
        localStorage.removeItem("refreshToken");
      } catch (e) {}
      // redirect to login page immediately
      window.location.href = "/login";
      // return a rejected promise to stop further handling
      return Promise.reject(error);
    }

    // existing handling for 500 or timeout (keep your current handlers)
    if (error.response && error.response.status === 500) {
      console.error("Server error. Please try again later.");
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
