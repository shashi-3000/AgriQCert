// src/services/verificationService.js
import axios from 'axios';

// Use axios directly without auth interceptor for public endpoints
const API_BASE_URL = 'http://localhost:8083/api/v1';

/**
 * Verification Service
 * Handles all public verification-related API calls
 * Note: These endpoints do NOT require authentication
 */
const verificationService = {
  /**
   * Verify a credential by its public ID
   * @param {string} credentialId - Public credential ID (e.g., VC-2025-12-001)
   * @returns {Promise<Object>} - Verification result
   */
  verifyCredential: async (credentialId) => {
    const response = await axios.get(`${API_BASE_URL}/verify/${credentialId}`);
    return response.data?.data;
  },

  /**
   * Verify a credential (POST method)
   * @param {string} credentialId - Public credential ID
   * @returns {Promise<Object>} - Verification result
   */
  verifyCredentialPost: async (credentialId) => {
    const response = await axios.post(`${API_BASE_URL}/verify/credential`, {
      credentialId,
    });
    return response.data?.data;
  },

  /**
   * Verify credential by batch number
   * @param {string} batchNumber - Batch number string
   * @returns {Promise<Object>} - Verification result
   */
  verifyByBatchNumber: async (batchNumber) => {
    const response = await axios.get(`${API_BASE_URL}/verify/batch/${batchNumber}`);
    return response.data?.data;
  },

  /**
   * Get credential status (Inji Verify compatible)
   * @param {string} credentialId - Public credential ID
   * @returns {Promise<Object>} - Credential status information
   */
  getCredentialStatus: async (credentialId) => {
    const response = await axios.get(`${API_BASE_URL}/verify/${credentialId}/status`);
    return response.data?.data;
  },

  /**
   * Get verification statistics
   * @returns {Promise<Object>} - Verification stats
   */
  getVerificationStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/verify/stats`);
    return response.data?.data;
  },
};

/**
 * Parse verification result for display
 * @param {Object} result - Verification result from API
 * @returns {Object} - Parsed result for UI display
 */
export const parseVerificationResult = (result) => {
  if (!result) {
    return {
      isValid: false,
      status: 'UNKNOWN',
      message: 'No verification data received',
    };
  }

  return {
    isValid: result.valid,
    status: result.status,
    credentialId: result.credentialId,
    message: result.statusMessage,
    batchDetails: result.batchDetails,
    inspectionDetails: result.inspectionDetails,
    issuerDetails: result.issuerDetails,
    verifiedAt: result.verifiedAt,
  };
};

/**
 * Get status display configuration
 * @param {string} status - Credential status
 * @returns {Object} - Display configuration
 */
export const getVerificationStatusConfig = (status) => {
  const configs = {
    ACTIVE: {
      label: 'Valid Certificate',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-500',
      icon: 'check-circle',
    },
    REVOKED: {
      label: 'Certificate Revoked',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-500',
      icon: 'x-circle',
    },
    EXPIRED: {
      label: 'Certificate Expired',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-500',
      icon: 'clock',
    },
    NOT_FOUND: {
      label: 'Certificate Not Found',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-500',
      icon: 'search',
    },
  };

  return configs[status] || configs.NOT_FOUND;
};

export default verificationService;
