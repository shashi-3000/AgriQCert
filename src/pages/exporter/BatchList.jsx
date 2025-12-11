// src/pages/exporter/BatchList.jsx
import React from "react";
import { getBatches } from "../../utils/batches";
import { Eye, Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function BatchList() {
  const batches = getBatches();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Batches</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Batch ID</th>
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
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No batches submitted yet.</td>
              </tr>
            )}
            {batches.map(b => (
              <tr key={b.batchId} className="border-t">
                <td className="px-6 py-4 font-semibold">{b.batchId}</td>
                <td className="px-6 py-4">{b.productName} <div className="text-xs text-gray-400">{b.productType}</div></td>
                <td className="px-6 py-4">{b.quantity}</td>
                <td className="px-6 py-4">{b.destination}</td>
                <td className="px-6 py-4">{new Date(b.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 text-yellow-800 text-sm">
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link to={`/exporter/certificate/${b.batchId}`} className="text-blue-600" title="View">
                      <Eye />
                    </Link>
                    <button className="text-green-600" title="Download (placeholder)">
                      <Download />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
