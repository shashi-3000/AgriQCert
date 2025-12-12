// src/pages/qa/InspectionHistory.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  RefreshCw,
  AlertCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Filter,
  Download,
} from "lucide-react";
import { inspectionService, INSPECTION_STATUS_CONFIG } from "../../services";
import toast from "react-hot-toast";

export default function InspectionHistory() {
  const [inspections, setInspections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterResult, setFilterResult] = useState("");

  // Pagination
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  });

  const fetchInspections = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await inspectionService.getAllInspections({
        page: pagination.page,
        size: pagination.size,
        sortBy: "createdAt",
        sortDir: "desc",
      });

      const content = response.content || response || [];
      setInspections(content);
      setPagination((prev) => ({
        ...prev,
        totalPages:
          response.totalPages ||
          Math.ceil(content.length / pagination.size) ||
          0,
        totalElements: response.totalElements || content.length || 0,
      }));
    } catch (err) {
      console.error("Failed to fetch inspections:", err);
      setError(err.message || "Failed to load inspection history");
      toast.error("Failed to load inspection history");
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.size]);

  useEffect(() => {
    fetchInspections();
  }, [fetchInspections]);

  const filteredInspections = inspections.filter((inspection) => {
    let matches = true;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      matches =
        matches &&
        (inspection.batch?.batchNumber?.toLowerCase().includes(term) ||
          inspection.batch?.productType?.toLowerCase().includes(term) ||
          inspection.inspectorName?.toLowerCase().includes(term));
    }

    if (filterResult) {
      matches = matches && inspection.result === filterResult;
    }

    return matches;
  });

  const getResultBadge = (result) => {
    if (result === "PASS") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
          Pass
        </span>
      );
    } else if (result === "FAIL") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
          Fail
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
        {result || "Pending"}
      </span>
    );
  };

  const getGradeBadge = (grade) => {
    const colors = {
      A: "bg-green-100 text-green-800",
      B: "bg-blue-100 text-blue-800",
      C: "bg-yellow-100 text-yellow-800",
      D: "bg-orange-100 text-orange-800",
      F: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
          colors[grade] || "bg-gray-100 text-gray-800"
        }`}
      >
        Grade {grade || "N/A"}
      </span>
    );
  };

  if (isLoading && inspections.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading inspection history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && inspections.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Failed to Load
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchInspections}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
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
          <h1 className="text-2xl font-bold text-gray-900">
            Inspection History
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {pagination.totalElements} total inspections
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/qa/pending-inspections"
            className="text-green-600 text-sm inline-flex items-center gap-2 hover:underline"
          >
            <ClipboardList className="h-4 w-4" /> Pending
          </Link>
          <button
            onClick={fetchInspections}
            className="inline-flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />{" "}
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by batch, product, inspector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterResult}
          onChange={(e) => setFilterResult(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Results</option>
          <option value="PASS">Pass Only</option>
          <option value="FAIL">Fail Only</option>
        </select>
      </div>

      {/* Inspections Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Batch Number
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Product
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Grade
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Result
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Inspector
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredInspections.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <ClipboardList className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">
                      No inspection records found
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {searchTerm || filterResult
                        ? "Try adjusting your filters"
                        : "Start by conducting inspections"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredInspections.map((inspection) => (
                  <tr key={inspection.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {inspection.batch?.batchNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {inspection.batch?.productType || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {getGradeBadge(inspection.qualityGrade)}
                    </td>
                    <td className="px-6 py-4">
                      {getResultBadge(inspection.result)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {inspection.inspectorName ||
                        inspection.inspector?.fullName ||
                        "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {inspection.createdAt
                        ? new Date(inspection.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {inspection.batch?.id && (
                          <Link
                            to={`/exporter/certificate/${inspection.batch.id}`}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="View Batch Details"
                          >
                            <Eye className="h-5 w-5" />
                          </Link>
                        )}
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
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                }
                disabled={pagination.page === 0}
                className="inline-flex items-center gap-1 px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                }
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
