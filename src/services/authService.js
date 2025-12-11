// src/services/authService.js
import api, { extractData, handleApiError } from '../utils/api';

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
    const response = await api.post('/auth/register', userData);
    const data = extractData(response);
    
    // Store tokens and user data
    if (data) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} - Auth response with tokens and user data
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const data = extractData(response);
    
    // Store tokens and user data
    if (data) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  /**
   * Refresh access token
   * @returns {Promise<string>} - New access token
   */
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await api.post('/auth/refresh', { refreshToken });
    const data = extractData(response);
    
    if (data?.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }
    
    return data?.accessToken;
  },

  /**
   * Get current user information
   * @returns {Promise<Object>} - Current user data
   */
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    const data = extractData(response);
    
    // Update stored user data
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    
    return data;
  },

  /**
   * Logout user - Clear all stored authentication data
   */
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if user has valid access token
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Get stored user data
   * @returns {Object|null} - User data from localStorage
   */
  getStoredUser: () => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
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
    return roleArray.some(role => role.toUpperCase() === userRole.toUpperCase());
  },
};

export default authService;
