// src/services/batchService.js
import api, { extractData, extractPaginatedData } from '../utils/api';

/**
 * Batch Service
 * Handles all batch-related API calls
 */
const batchService = {
  /**
   * Submit a new batch (Exporter only)
   * @param {Object} batchData - Batch information
   * @param {string} batchData.productType - Product type (RICE, WHEAT, CORN, etc.)
   * @param {string} batchData.batchNumber - Unique batch number
   * @param {number} batchData.quantity - Quantity
   * @param {string} batchData.unit - Unit (KG, TONS, etc.)
   * @param {string} batchData.sourceCountry - Source country
   * @param {string} batchData.destinationCountry - Destination country
   * @param {string} batchData.harvestDate - Harvest date (YYYY-MM-DD)
   * @param {string} batchData.expectedShipmentDate - Expected shipment date (YYYY-MM-DD)
   * @param {string} batchData.productDescription - Product description
   * @param {string} batchData.farmerDetails - Farmer details
   * @param {string} batchData.storageConditions - Storage conditions
   * @param {File[]} files - Optional files to upload
   * @param {Function} onUploadProgress - Optional progress callback
   * @returns {Promise<Object>} - Created batch data
   */
  submitBatch: async (batchData, files = [], onUploadProgress = null) => {
    const formData = new FormData();
    
    // Add batch data as JSON blob
    formData.append(
      'batch',
      new Blob([JSON.stringify(batchData)], { type: 'application/json' })
    );
    
    // Add files if any
    files.forEach((file) => {
      formData.append('files', file);
    });
    
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    
    if (onUploadProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onUploadProgress(percent);
      };
    }
    
    const response = await api.post('/batches/submit', formData, config);
    return extractData(response);
  },

  /**
   * Get exporter's batches (paginated)
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (0-indexed)
   * @param {number} params.size - Page size
   * @param {string} params.sortBy - Sort field
   * @param {string} params.sortDir - Sort direction (asc/desc)
   * @returns {Promise<Object>} - Paginated batch data
   */
  getMyBatches: async (params = {}) => {
    const { page = 0, size = 10, sortBy = 'createdAt', sortDir = 'desc' } = params;
    const response = await api.get('/batches/exporter/my-batches', {
      params: { page, size, sortBy, sortDir },
    });
    return extractPaginatedData(response);
  },

  /**
   * Get batch by ID
   * @param {string} batchId - Batch UUID
   * @returns {Promise<Object>} - Batch data
   */
  getBatchById: async (batchId) => {
    const response = await api.get(`/batches/${batchId}`);
    return extractData(response);
  },

  /**
   * Get batch by batch number
   * @param {string} batchNumber - Batch number string
   * @returns {Promise<Object>} - Batch data
   */
  getBatchByNumber: async (batchNumber) => {
    const response = await api.get(`/batches/number/${batchNumber}`);
    return extractData(response);
  },

  /**
   * Get exporter's batches by status
   * @param {string} status - Batch status (SUBMITTED, ASSIGNED, UNDER_INSPECTION, CERTIFIED, REJECTED, CANCELLED)
   * @returns {Promise<Array>} - Array of batches
   */
  getBatchesByStatus: async (status) => {
    const response = await api.get('/batches/exporter/by-status', {
      params: { status },
    });
    return extractData(response) || [];
  },

  /**
   * Cancel a batch (Exporter only, only if status is SUBMITTED)
   * @param {string} batchId - Batch UUID
   * @param {string} reason - Cancellation reason
   * @returns {Promise<Object>} - Updated batch data
   */
  cancelBatch: async (batchId, reason) => {
    const response = await api.put(`/batches/${batchId}/cancel`, null, {
      params: { reason },
    });
    return extractData(response);
  },

  /**
   * Get batch timeline/history
   * @param {string} batchId - Batch UUID
   * @returns {Promise<Array>} - Array of timeline events
   */
  getBatchTimeline: async (batchId) => {
    const response = await api.get(`/batches/${batchId}/timeline`);
    return extractData(response) || [];
  },

  /**
   * Search batches with filters
   * @param {Object} params - Search parameters
   * @param {string} params.status - Filter by status
   * @param {string} params.productType - Filter by product type
   * @param {string} params.sourceCountry - Filter by source country
   * @param {string} params.destinationCountry - Filter by destination country
   * @param {number} params.page - Page number
   * @param {number} params.size - Page size
   * @returns {Promise<Object>} - Paginated search results
   */
  searchBatches: async (params = {}) => {
    const response = await api.get('/batches/search', { params });
    return extractPaginatedData(response);
  },

  /**
   * Get assigned batches (QA Agency only)
   * @param {Object} params - Pagination parameters
   * @returns {Promise<Object>} - Paginated batch data
   */
  getAssignedBatches: async (params = {}) => {
    const { page = 0, size = 10 } = params;
    const response = await api.get('/batches/qa-agency/assigned', {
      params: { page, size },
    });
    return extractPaginatedData(response);
  },

  /**
   * Get pending batches waiting for inspection (QA Agency only)
   * @returns {Promise<Array>} - Array of pending batches
   */
  getPendingBatches: async () => {
    const response = await api.get('/batches/qa-agency/pending');
    return extractData(response) || [];
  },
};

// Product type constants
export const PRODUCT_TYPES = [
  'RICE',
  'WHEAT',
  'CORN',
  'SOYBEANS',
  'COFFEE',
  'TEA',
  'SPICES',
  'FRUITS',
  'VEGETABLES',
  'NUTS',
];

// Batch status constants
export const BATCH_STATUS = {
  SUBMITTED: 'SUBMITTED',
  ASSIGNED: 'ASSIGNED',
  UNDER_INSPECTION: 'UNDER_INSPECTION',
  CERTIFIED: 'CERTIFIED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
};

// Status display configuration
export const BATCH_STATUS_CONFIG = {
  SUBMITTED: {
    label: 'Submitted',
    color: 'bg-blue-100 text-blue-800',
    bgColor: 'bg-blue-500',
  },
  ASSIGNED: {
    label: 'Assigned',
    color: 'bg-purple-100 text-purple-800',
    bgColor: 'bg-purple-500',
  },
  UNDER_INSPECTION: {
    label: 'Under Inspection',
    color: 'bg-yellow-100 text-yellow-800',
    bgColor: 'bg-yellow-500',
  },
  CERTIFIED: {
    label: 'Certified',
    color: 'bg-green-100 text-green-800',
    bgColor: 'bg-green-500',
  },
  REJECTED: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-800',
    bgColor: 'bg-red-500',
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'bg-gray-100 text-gray-800',
    bgColor: 'bg-gray-500',
  },
};

export default batchService;
