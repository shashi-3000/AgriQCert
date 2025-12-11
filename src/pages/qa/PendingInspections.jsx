// src/pages/qa/PendingInspections.jsx
import React, { useEffect, useState } from "react";
import { getBatches } from "../../utils/batches";
import { Link, useNavigate } from "react-router-dom";
import { Eye, ClipboardList } from "lucide-react";

export default function PendingInspections() {
  const navigate = useNavigate();
  const [pending, setPending] = useState([]);

  useEffect(() => {
    setPending(getBatches().filter(b => {
      const s = (b.status || "").toLowerCase();
      return s === "submitted" || s === "pending";
    }));
  }, []);

  // Refresh util (call after inspection redirect back)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "batches_v1") setPending(getBatches().filter(b => {
        const s = (b.status || "").toLowerCase();
        return s === "submitted" || s === "pending";
      }));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pending Inspections</h1>
        <Link to="/qa/history" className="text-sm text-green-600 inline-flex items-center gap-2"><ClipboardList /> History</Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Batch ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Product</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Quantity</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Destination</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Submitted</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pending.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No batches awaiting inspection.</td>
              </tr>
            )}

            {pending.map(b => (
              <tr key={b.batchId} className="border-t">
                <td className="px-6 py-4 font-semibold">{b.batchId}</td>
                <td className="px-6 py-4">{b.productName}<div className="text-xs text-gray-400">{b.productType}</div></td>
                <td className="px-6 py-4">{b.quantity}</td>
                <td className="px-6 py-4">{b.destination}</td>
                <td className="px-6 py-4">{new Date(b.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => navigate(`/qa/inspection/${b.batchId}`)} className="text-white bg-green-600 px-3 py-1 rounded inline-flex items-center gap-2">
                      <Eye className="h-4 w-4" /> Inspect
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
