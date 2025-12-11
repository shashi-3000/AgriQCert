// src/utils/api.js
import axios from "axios";

// Base API configuration
// Use environment variable or default to localhost backend
// In production, this should be configured via environment variables
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8083/api/v1";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Set to true if using cookies for auth
});

// Request interceptor - Automatically attach accessToken to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401 errors with automatic token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          // No refresh token available, redirect to login
          handleAuthFailure();
          return Promise.reject(error);
        }

        // Try to refresh the token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data.data;

        // Store the new access token
        localStorage.setItem("accessToken", accessToken);

        // Update the authorization header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear storage and redirect to login
        handleAuthFailure();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Handle authentication failure
const handleAuthFailure = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  // Only redirect if not already on login page
  if (!window.location.pathname.includes("/login")) {
    window.location.href = "/login";
  }
};

// Helper function to handle API errors consistently
export const handleApiError = (error, toast) => {
  const status = error.response?.status;
  const message = error.response?.data?.message;
  const errors = error.response?.data?.errors;

  switch (status) {
    case 400:
      // Validation errors
      if (errors?.length > 0) {
        errors.forEach((err) => {
          toast?.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast?.error(message || "Invalid request. Please check your input.");
      }
      break;
    case 401:
      // Unauthorized - handled by interceptor
      toast?.error("Session expired. Please login again.");
      break;
    case 403:
      // Forbidden
      toast?.error("You do not have permission to perform this action.");
      break;
    case 404:
      // Not found
      toast?.error(message || "Resource not found.");
      break;
    case 409:
      // Conflict (e.g., duplicate email)
      toast?.error(message || "Resource already exists.");
      break;
    case 500:
    default:
      // Server error
      toast?.error(
        message || "An unexpected error occurred. Please try again."
      );
      break;
  }

  return {
    status,
    message,
    errors,
  };
};

// Extract data from standard API response
export const extractData = (response) => {
  return response.data?.data;
};

// Extract paginated data from API response
export const extractPaginatedData = (response) => {
  const data = response.data?.data;
  return {
    content: data?.content || [],
    pageNumber: data?.pageNumber || 0,
    pageSize: data?.pageSize || 10,
    totalElements: data?.totalElements || 0,
    totalPages: data?.totalPages || 0,
    first: data?.first ?? true,
    last: data?.last ?? true,
  };
};

export default api;
