// src/services/dashboardService.js
import api, { extractData } from '../utils/api';

/**
 * Dashboard Service
 * Handles dashboard-related API calls
 */
const dashboardService = {
  /**
   * Get admin dashboard data (Admin only)
   * @returns {Promise<Object>} - Admin dashboard statistics
   */
  getAdminDashboard: async () => {
    const response = await api.get('/dashboard/admin');
    return extractData(response);
  },

  /**
   * Get exporter dashboard data (Exporter only)
   * @returns {Promise<Object>} - Exporter dashboard statistics
   */
  getExporterDashboard: async () => {
    const response = await api.get('/dashboard/exporter');
    return extractData(response);
  },

  /**
   * Get QA Agency dashboard data (QA Agency only)
   * @returns {Promise<Object>} - QA Agency dashboard statistics
   */
  getQADashboard: async () => {
    const response = await api.get('/dashboard/qa-agency');
    return extractData(response);
  },
};

export default dashboardService;
