// src/services/inspectionService.js
import api, { extractData, extractPaginatedData } from '../utils/api';

/**
 * Inspection Service
 * Handles all inspection-related API calls (QA Agency operations)
 */
const inspectionService = {
  /**
   * Schedule an inspection for a batch (QA Agency only)
   * @param {string} batchId - Batch UUID
   * @param {Object} scheduleData - Scheduling information
   * @param {string} scheduleData.scheduledDate - ISO-8601 datetime
   * @param {string} scheduleData.inspectorName - Name of the inspector
   * @param {string} scheduleData.inspectionLocation - Location of inspection
   * @param {number} scheduleData.estimatedDuration - Duration in minutes
   * @param {string} scheduleData.specialInstructions - Special instructions (optional)
   * @returns {Promise<Object>} - Created inspection data
   */
  scheduleInspection: async (batchId, scheduleData) => {
    const response = await api.post(`/inspections/${batchId}/schedule`, scheduleData);
    return extractData(response);
  },

  /**
   * Start an inspection (QA Agency only)
   * @param {string} inspectionId - Inspection UUID
   * @returns {Promise<Object>} - Updated inspection data
   */
  startInspection: async (inspectionId) => {
    const response = await api.post(`/inspections/${inspectionId}/start`);
    return extractData(response);
  },

  /**
   * Submit inspection results (QA Agency only)
   * @param {string} inspectionId - Inspection UUID
   * @param {Object} results - Inspection results
   * @param {number} results.moistureContent - Moisture content percentage
   * @param {number} results.pesticideLevel - Pesticide level in ppm
   * @param {number} results.proteinContent - Protein content percentage
   * @param {string} results.gradeRating - Grade rating (A_PLUS, A, B, C, D, F)
   * @param {boolean} results.passed - Whether inspection passed
   * @param {string} results.inspectionDate - ISO-8601 datetime
   * @param {string} results.remarks - Inspector remarks
   * @param {string} results.laboratoryReportNumber - Lab report number
   * @param {string} results.certificateNumber - Certificate number (optional if failed)
   * @returns {Promise<Object>} - Updated inspection data
   */
  submitResults: async (inspectionId, results) => {
    const response = await api.post(`/inspections/${inspectionId}/results`, results);
    return extractData(response);
  },

  /**
   * Get inspection by ID
   * @param {string} inspectionId - Inspection UUID
   * @returns {Promise<Object>} - Inspection data
   */
  getInspectionById: async (inspectionId) => {
    const response = await api.get(`/inspections/${inspectionId}`);
    return extractData(response);
  },

  /**
   * Get inspection by batch ID
   * @param {string} batchId - Batch UUID
   * @returns {Promise<Object>} - Inspection data
   */
  getInspectionByBatchId: async (batchId) => {
    const response = await api.get(`/inspections/batch/${batchId}`);
    return extractData(response);
  },

  /**
   * Get pending inspections (QA Agency only)
   * Returns inspections with status SCHEDULED or IN_PROGRESS
   * @returns {Promise<Array>} - Array of pending inspections
   */
  getPendingInspections: async () => {
    const response = await api.get('/inspections/qa-agency/pending');
    return extractData(response) || [];
  },

  /**
   * Get all inspections for QA Agency (paginated)
   * @param {Object} params - Pagination parameters
   * @param {number} params.page - Page number
   * @param {number} params.size - Page size
   * @returns {Promise<Object>} - Paginated inspection data
   */
  getAllInspections: async (params = {}) => {
    const { page = 0, size = 10 } = params;
    const response = await api.get('/inspections/qa-agency/all', {
      params: { page, size },
    });
    return extractPaginatedData(response);
  },
};

// Grade rating constants
export const GRADE_RATINGS = [
  { value: 'A_PLUS', label: 'A+', description: 'Excellent quality' },
  { value: 'A', label: 'A', description: 'Very good quality' },
  { value: 'B', label: 'B', description: 'Good quality' },
  { value: 'C', label: 'C', description: 'Average quality' },
  { value: 'D', label: 'D', description: 'Below average quality' },
  { value: 'F', label: 'F', description: 'Failed - Poor quality' },
];

// Inspection status constants
export const INSPECTION_STATUS = {
  SCHEDULED: 'SCHEDULED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

// Inspection status display configuration
export const INSPECTION_STATUS_CONFIG = {
  SCHEDULED: {
    label: 'Scheduled',
    color: 'bg-blue-100 text-blue-800',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'bg-yellow-100 text-yellow-800',
  },
  COMPLETED: {
    label: 'Completed',
    color: 'bg-green-100 text-green-800',
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'bg-gray-100 text-gray-800',
  },
};

export default inspectionService;
