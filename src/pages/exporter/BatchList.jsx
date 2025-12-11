// src/pages/exporter/BatchList.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Eye, Download, RefreshCw, Search, Filter, ChevronLeft, ChevronRight, XCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { batchService, credentialService, BATCH_STATUS_CONFIG, PRODUCT_TYPES } from "../../services";
import toast from "react-hot-toast";

export default function BatchList() {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0
  });
  
  // Filter state
  const [filters, setFilters] = useState({
    status: '',
    productType: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchBatches = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      
      if (filters.status) {
        // Use status-specific endpoint
        response = await batchService.getBatchesByStatus(filters.status);
        // Status endpoint returns array, not paginated
        setBatches(Array.isArray(response) ? response : []);
        setPagination(prev => ({ ...prev, totalElements: Array.isArray(response) ? response.length : 0 }));
      } else if (filters.search) {
        // Use search endpoint
        response = await batchService.searchBatches(filters.search, { page: pagination.page, size: pagination.size });
        setBatches(response.content || []);
        setPagination(prev => ({
          ...prev,
          totalPages: response.totalPages || 0,
          totalElements: response.totalElements || 0
        }));
      } else {
        // Default: get my batches
        response = await batchService.getMyBatches({ 
          page: pagination.page, 
          size: pagination.size, 
          sortBy: 'createdAt', 
          sortDir: 'desc' 
        });
        setBatches(response.content || []);
        setPagination(prev => ({
          ...prev,
          totalPages: response.totalPages || 0,
          totalElements: response.totalElements || 0
        }));
      }
    } catch (err) {
      console.error('Failed to fetch batches:', err);
      setError(err.message || 'Failed to load batches');
      toast.error('Failed to load batches');
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.size, filters.status, filters.search]);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 0 })); // Reset to first page
  };

  const clearFilters = () => {
    setFilters({ status: '', productType: '', search: '' });
    setPagination(prev => ({ ...prev, page: 0 }));
  };

  const getStatusBadge = (status) => {
    const config = BATCH_STATUS_CONFIG[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleDownloadQR = async (batchId) => {
    try {
      const credential = await credentialService.getCredentialByBatchId(batchId);
      if (credential?.id) {
        await credentialService.downloadQRCode(credential.id);
        toast.success('QR Code downloaded');
      } else {
        toast.error('No credential found for this batch');
      }
    } catch (err) {
      console.error('Failed to download QR:', err);
      toast.error('Failed to download QR code');
    }
  };

  const handleCancelBatch = async (batchId) => {
    if (!window.confirm('Are you sure you want to cancel this batch?')) return;
    
    try {
      await batchService.cancelBatch(batchId);
      toast.success('Batch cancelled successfully');
      fetchBatches();
    } catch (err) {
      console.error('Failed to cancel batch:', err);
      toast.error(err.message || 'Failed to cancel batch');
    }
  };

  if (isLoading && batches.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading batches...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && batches.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">Failed to Load Batches</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchBatches} className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            <RefreshCw className="h-4 w-4" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Batches</h1>
          <p className="text-gray-600 text-sm mt-1">{pagination.totalElements} total batches</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded border ${showFilters ? 'bg-green-50 border-green-300' : 'border-gray-200'}`}
          >
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button onClick={fetchBatches} className="inline-flex items-center gap-2 px-3 py-2 rounded border border-gray-200 hover:bg-gray-50">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <Link to="/exporter/submit-batch" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            + New Batch
          </Link>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Batch number..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">All Statuses</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="UNDER_INSPECTION">Under Inspection</option>
                <option value="CERTIFIED">Certified</option>
                <option value="REJECTED">Rejected</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <select
                value={filters.productType}
                onChange={(e) => handleFilterChange('productType', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">All Types</option>
                {PRODUCT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={clearFilters} className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
                <XCircle className="h-4 w-4" /> Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batches Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Batch Number</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Product</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Quantity</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Destination</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Submitted</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <p className="mb-2">No batches found.</p>
                    <Link to="/exporter/submit-batch" className="text-green-600 hover:underline">Submit your first batch</Link>
                  </td>
                </tr>
              )}
              {batches.map(batch => (
                <tr key={batch.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{batch.batchNumber}</td>
                  <td className="px-6 py-4">
                    <div>{batch.productType}</div>
                    {batch.productDescription && (
                      <div className="text-xs text-gray-400 truncate max-w-[150px]">{batch.productDescription}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{batch.quantity} {batch.unit}</td>
                  <td className="px-6 py-4 text-gray-700">{batch.destinationCountry}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(batch.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{getStatusBadge(batch.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link to={`/exporter/certificate/${batch.id}`} className="text-blue-600 hover:text-blue-800 p-1" title="View Details">
                        <Eye className="h-5 w-5" />
                      </Link>
                      {batch.status === 'CERTIFIED' && (
                        <button onClick={() => handleDownloadQR(batch.id)} className="text-green-600 hover:text-green-800 p-1" title="Download QR">
                          <Download className="h-5 w-5" />
                        </button>
                      )}
                      {batch.status === 'SUBMITTED' && (
                        <button onClick={() => handleCancelBatch(batch.id)} className="text-red-600 hover:text-red-800 p-1" title="Cancel Batch">
                          <XCircle className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600">
              Page {pagination.page + 1} of {pagination.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 0}
                className="inline-flex items-center gap-1 px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages - 1}
                className="inline-flex items-center gap-1 px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
