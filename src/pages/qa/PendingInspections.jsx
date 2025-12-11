// src/pages/qa/PendingInspections.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, ClipboardList, RefreshCw, AlertCircle, Search, ChevronLeft, ChevronRight, Package } from "lucide-react";
import { batchService, BATCH_STATUS_CONFIG } from "../../services";
import toast from "react-hot-toast";

export default function PendingInspections() {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0
  });

  const fetchPendingBatches = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch batches assigned to this QA agency or pending inspection
      const response = await batchService.getAssignedBatches({ 
        page: pagination.page, 
        size: pagination.size 
      });
      
      const content = response.content || response || [];
      setBatches(content);
      setPagination(prev => ({
        ...prev,
        totalPages: response.totalPages || Math.ceil(content.length / pagination.size) || 0,
        totalElements: response.totalElements || content.length || 0
      }));
    } catch (err) {
      console.error('Failed to fetch pending batches:', err);
      // Try alternative endpoint
      try {
        const pending = await batchService.getPendingBatches({ page: pagination.page, size: pagination.size });
        const content = pending.content || pending || [];
        setBatches(content);
        setPagination(prev => ({
          ...prev,
          totalPages: pending.totalPages || 0,
          totalElements: pending.totalElements || content.length || 0
        }));
      } catch (e) {
        setError(err.message || 'Failed to load pending inspections');
        toast.error('Failed to load pending inspections');
      }
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.size]);

  useEffect(() => {
    fetchPendingBatches();
  }, [fetchPendingBatches]);

  const handleStartInspection = (batchId) => {
    navigate(`/qa/inspection/${batchId}`);
  };

  const filteredBatches = batches.filter(batch => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      batch.batchNumber?.toLowerCase().includes(term) ||
      batch.productType?.toLowerCase().includes(term) ||
      batch.destinationCountry?.toLowerCase().includes(term)
    );
  });

  const getStatusBadge = (status) => {
    const config = BATCH_STATUS_CONFIG[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (isLoading && batches.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading pending inspections...</p>
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
          <h2 className="text-xl font-semibold text-red-800 mb-2">Failed to Load</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchPendingBatches} className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
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
          <h1 className="text-2xl font-bold text-gray-900">Pending Inspections</h1>
          <p className="text-gray-600 text-sm mt-1">{pagination.totalElements} batches awaiting inspection</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/qa/history" className="text-sm text-green-600 inline-flex items-center gap-2 hover:underline">
            <ClipboardList className="h-4 w-4" /> View History
          </Link>
          <button onClick={fetchPendingBatches} className="inline-flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-50">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by batch number, product type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No batches awaiting inspection</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {searchTerm ? 'Try adjusting your search' : 'All caught up!'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredBatches.map(batch => (
                  <tr key={batch.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">{batch.batchNumber}</td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{batch.productType}</div>
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
                        <button 
                          onClick={() => handleStartInspection(batch.id)} 
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                          <Eye className="h-4 w-4" /> Inspect
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 0}
                className="inline-flex items-center gap-1 px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
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
