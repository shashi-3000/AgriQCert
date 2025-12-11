// src/services/authService.js
import api, { extractData, handleApiError } from "../utils/api";

// Simple logger utility
const logger = {
  info: (message, data = null) => {
    console.log(`[AuthService] ${message}`, data ? data : "");
  },
  error: (message, error = null) => {
    console.error(`[AuthService] ERROR: ${message}`, error ? error : "");
  },
  warn: (message, data = null) => {
    console.warn(`[AuthService] WARN: ${message}`, data ? data : "");
  },
};

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.email - User email (required)
   * @param {string} userData.password - User password (min 8 chars) (required)
   * @param {string} userData.fullName - Full name (required)
   * @param {string} userData.role - User role: EXPORTER | QA_AGENCY | CUSTOMS_OFFICIAL | ADMIN (required)
   * @param {string} userData.companyName - Company name (optional)
   * @param {string} userData.phoneNumber - Phone number (optional)
   * @param {string} userData.companyAddress - Company address (optional)
   * @param {string} userData.licenseNumber - License number (optional, for QA agencies)
   * @returns {Promise<Object>} - Auth response with tokens and user data
   */
  register: async (userData) => {
    logger.info("Registration attempt", {
      email: userData.email,
      role: userData.role,
    });

    try {
      const response = await api.post("/auth/register", userData);
      const data = extractData(response);

      // Store tokens and user data
      if (data) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        logger.info("Registration successful", {
          userId: data.user?.id,
          email: data.user?.email,
          role: data.user?.role,
        });
      }

      return data;
    } catch (error) {
      logger.error("Registration failed", {
        email: userData.email,
        error: error.message,
      });
      throw error;
    }
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} - Auth response with tokens and user data
   */
  login: async (credentials) => {
    logger.info("Login attempt", { email: credentials.email });

    try {
      const response = await api.post("/auth/login", credentials);
      const data = extractData(response);

      // Store tokens and user data
      if (data) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        logger.info("Login successful", {
          userId: data.user?.id,
          email: data.user?.email,
          role: data.user?.role,
        });
      }

      return data;
    } catch (error) {
      logger.error("Login failed", {
        email: credentials.email,
        error: error.message,
      });
      throw error;
    }
  },

  /**
   * Refresh access token
   * @returns {Promise<string>} - New access token
   */
  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      logger.warn("Token refresh failed - no refresh token available");
      throw new Error("No refresh token available");
    }

    logger.info("Refreshing access token");

    try {
      const response = await api.post("/auth/refresh", { refreshToken });
      const data = extractData(response);

      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        logger.info("Token refresh successful");
      }

      return data?.accessToken;
    } catch (error) {
      logger.error("Token refresh failed", error.message);
      throw error;
    }
  },

  /**
   * Get current user information
   * @returns {Promise<Object>} - Current user data
   */
  getCurrentUser: async () => {
    logger.info("Fetching current user from API");

    try {
      const response = await api.get("/auth/me");
      const data = extractData(response);

      // Update stored user data
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        logger.info("User data updated", {
          email: data.email,
          role: data.role,
        });
      }

      return data;
    } catch (error) {
      logger.error("Failed to fetch current user", error.message);
      throw error;
    }
  },

  /**
   * Logout user - Clear all stored authentication data
   */
  logout: () => {
    const user = authService.getStoredUser();
    logger.info("Logging out user", { email: user?.email });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    logger.info("User logged out successfully - all tokens cleared");
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if user has valid access token
   */
  isAuthenticated: () => {
    const hasToken = !!localStorage.getItem("accessToken");
    return hasToken;
  },

  /**
   * Get stored user data
   * @returns {Object|null} - User data from localStorage
   */
  getStoredUser: () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      logger.error("Failed to parse stored user data", error);
      return null;
    }
  },

  /**
   * Get user role
   * @returns {string|null} - User role or null
   */
  getUserRole: () => {
    const user = authService.getStoredUser();
    return user?.role || null;
  },

  /**
   * Check if user has a specific role
   * @param {string|string[]} roles - Role(s) to check
   * @returns {boolean} - True if user has the specified role
   */
  hasRole: (roles) => {
    const userRole = authService.getUserRole();
    if (!userRole) return false;

    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.some(
      (role) => role.toUpperCase() === userRole.toUpperCase()
    );
  },
};

export default authService;
