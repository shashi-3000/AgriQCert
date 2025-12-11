// src/pages/qa/InspectionHistory.jsx
import React, { useEffect, useState } from "react";
import { getBatches } from "../../utils/batches";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function InspectionHistory() {
  const [inspected, setInspected] = useState([]);

  useEffect(() => {
    const all = getBatches();
    const withInspections = all.filter(b => Array.isArray(b.inspections) && b.inspections.length > 0);
    setInspected(withInspections);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Inspection History</h1>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Batch ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Product</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Last Verdict</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Inspector</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Inspected On</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>

          <tbody>
            {inspected.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No inspection records yet.</td>
              </tr>
            )}

            {inspected.map(b => {
              const last = b.inspections ? b.inspections[0] : null;
              return (
                <tr key={b.batchId} className="border-t">
                  <td className="px-6 py-4 font-semibold">{b.batchId}</td>
                  <td className="px-6 py-4">{b.productName}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      (last?.verdict || "").toLowerCase().includes("pass") ? "bg-emerald-50 text-emerald-800" :
                      "bg-red-50 text-red-800"
                    }`}>
                      {last?.verdict || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{last?.inspector || "—"}</td>
                  <td className="px-6 py-4">{last ? new Date(last.inspectedAt || last.createdAt).toLocaleString() : "—"}</td>
                  <td className="px-6 py-4">
                    <Link to={`/exporter/certificate/${b.batchId}`} className="text-blue-600 inline-flex items-center gap-2">
                      <Eye /> View Certificate
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
