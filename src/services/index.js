// src/services/index.js
// Central export for all services

export { default as authService } from './authService';
export { default as batchService, PRODUCT_TYPES, BATCH_STATUS, BATCH_STATUS_CONFIG } from './batchService';
export { default as inspectionService, GRADE_RATINGS, INSPECTION_STATUS, INSPECTION_STATUS_CONFIG } from './inspectionService';
export { default as credentialService, CREDENTIAL_STATUS, CREDENTIAL_STATUS_CONFIG } from './credentialService';
export { default as verificationService, parseVerificationResult, getVerificationStatusConfig } from './verificationService';
export { default as dashboardService } from './dashboardService';

// Re-export API utilities
export { default as api, handleApiError, extractData, extractPaginatedData } from '../utils/api';
