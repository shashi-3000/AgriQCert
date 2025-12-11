// src/services/credentialService.js
import api, { extractData, extractPaginatedData } from '../utils/api';

/**
 * Credential Service
 * Handles all verifiable credential-related API calls
 */
const credentialService = {
  /**
   * Issue a verifiable credential for a certified batch (QA Agency/Admin only)
   * @param {string} batchId - Batch UUID (must have CERTIFIED status)
   * @returns {Promise<Object>} - Issued credential data
   */
  issueCredential: async (batchId) => {
    const response = await api.post(`/credentials/issue/${batchId}`);
    return extractData(response);
  },

  /**
   * Get credential by internal ID
   * @param {string} credentialId - Credential internal database UUID
   * @returns {Promise<Object>} - Credential data
   */
  getCredentialById: async (credentialId) => {
    const response = await api.get(`/credentials/${credentialId}`);
    return extractData(response);
  },

  /**
   * Get credential by batch ID
   * @param {string} batchId - Batch UUID
   * @returns {Promise<Object>} - Credential data
   */
  getCredentialByBatchId: async (batchId) => {
    const response = await api.get(`/credentials/batch/${batchId}`);
    return extractData(response);
  },

  /**
   * Get credential by public credential ID
   * @param {string} publicCredentialId - Public credential ID (e.g., VC-2025-12-001)
   * @returns {Promise<Object>} - Credential data
   */
  getCredentialByPublicId: async (publicCredentialId) => {
    const response = await api.get(`/credentials/by-credential-id/${publicCredentialId}`);
    return extractData(response);
  },

  /**
   * Get current user's credentials (Exporter only)
   * @param {Object} params - Pagination parameters
   * @param {number} params.page - Page number
   * @param {number} params.size - Page size
   * @returns {Promise<Object>} - Paginated credential data
   */
  getMyCredentials: async (params = {}) => {
    const { page = 0, size = 10 } = params;
    const response = await api.get('/credentials/my-credentials', {
      params: { page, size },
    });
    return extractPaginatedData(response);
  },

  /**
   * Get credentials by status (Admin only)
   * @param {string} status - Credential status (ACTIVE, REVOKED, EXPIRED)
   * @param {Object} params - Pagination parameters
   * @returns {Promise<Object>} - Paginated credential data
   */
  getCredentialsByStatus: async (status, params = {}) => {
    const { page = 0, size = 10 } = params;
    const response = await api.get(`/credentials/by-status/${status}`, {
      params: { page, size },
    });
    return extractPaginatedData(response);
  },

  /**
   * Revoke a credential (QA Agency/Admin only)
   * @param {string} credentialId - Credential internal database UUID
   * @param {string} reason - Revocation reason
   * @returns {Promise<Object>} - Updated credential data
   */
  revokeCredential: async (credentialId, reason) => {
    const response = await api.post(`/credentials/${credentialId}/revoke`, null, {
      params: { reason },
    });
    return extractData(response);
  },

  /**
   * Get QR code as Base64 string
   * @param {string} credentialId - Credential internal database UUID
   * @returns {Promise<string>} - Base64 encoded QR code image (data:image/png;base64,...)
   */
  getQRCodeBase64: async (credentialId) => {
    const response = await api.get(`/credentials/${credentialId}/qr-code`);
    return extractData(response);
  },

  /**
   * Get QR code image URL for direct download/display
   * @param {string} credentialId - Credential internal database UUID
   * @returns {string} - URL to QR code image
   */
  getQRCodeImageUrl: (credentialId) => {
    const token = localStorage.getItem('accessToken');
    return `http://localhost:8083/api/v1/credentials/${credentialId}/qr-code/image?token=${token}`;
  },

  /**
   * Download QR code as image file
   * @param {string} credentialId - Credential internal database UUID
   * @param {string} filename - Optional filename for download
   */
  downloadQRCode: async (credentialId, filename = 'qr-code.png') => {
    try {
      const response = await api.get(`/credentials/${credentialId}/qr-code/image`, {
        responseType: 'blob',
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      throw error;
    }
  },
};

// Credential status constants
export const CREDENTIAL_STATUS = {
  ACTIVE: 'ACTIVE',
  REVOKED: 'REVOKED',
  EXPIRED: 'EXPIRED',
};

// Credential status display configuration
export const CREDENTIAL_STATUS_CONFIG = {
  ACTIVE: {
    label: 'Active',
    color: 'bg-green-100 text-green-800',
    icon: 'check-circle',
  },
  REVOKED: {
    label: 'Revoked',
    color: 'bg-red-100 text-red-800',
    icon: 'x-circle',
  },
  EXPIRED: {
    label: 'Expired',
    color: 'bg-gray-100 text-gray-800',
    icon: 'clock',
  },
};

export default credentialService;
