// src/pages/qa/QADashboard.jsx
import React, { useEffect, useState } from "react";
import { getBatches } from "../../utils/batches";
import { Link } from "react-router-dom";
import { ClipboardList, CheckCircle, XCircle, Clock } from "lucide-react";

export default function QADashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    certified: 0,
    rejected: 0
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const batches = getBatches();
    const statsObj = {
      pending: batches.filter(b => (b.status || "").toLowerCase() === "submitted").length,
      certified: batches.filter(b => (b.status || "").toLowerCase() === "certified").length,
      rejected: batches.filter(b => (b.status || "").toLowerCase() === "rejected").length
    };

    setStats(statsObj);

    // show recent 5 inspections (any batch with inspections array)
    const inspected = batches
      .filter(b => Array.isArray(b.inspections) && b.inspections.length > 0)
      .sort((a, b) => new Date(b.inspections[0].inspectedAt) - new Date(a.inspections[0].inspectedAt))
      .slice(0, 5);

    setRecent(inspected);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">QA Dashboard</h1>
      <p className="text-gray-600 mb-8">Quality Assurance overview and inspection activity</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Pending */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Clock className="h-7 w-7 text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-600">Pending Inspections</p>
            <p className="text-3xl font-semibold">{stats.pending}</p>
          </div>
        </div>

        {/* Certified */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <CheckCircle className="h-7 w-7 text-green-600" />
          </div>
          <div>
            <p className="text-gray-600">Certified Batches</p>
            <p className="text-3xl font-semibold">{stats.certified}</p>
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <XCircle className="h-7 w-7 text-red-600" />
          </div>
          <div>
            <p className="text-gray-600">Rejected Batches</p>
            <p className="text-3xl font-semibold">{stats.rejected}</p>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-10">
        <Link
          to="/qa/pending-inspections"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 inline-flex items-center gap-2"
        >
          <ClipboardList className="h-5 w-5" />
          Pending Inspections
        </Link>

        <Link
          to="/qa/history"
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 inline-flex items-center gap-2"
        >
          Inspection History
        </Link>
      </div>

      {/* Recent Inspections */}
      <h2 className="text-xl font-semibold mb-4">Recent Inspections</h2>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-gray-500">Batch ID</th>
              <th className="px-6 py-3 text-left text-sm text-gray-500">Product</th>
              <th className="px-6 py-3 text-left text-sm text-gray-500">Verdict</th>
              <th className="px-6 py-3 text-left text-sm text-gray-500">Inspector</th>
              <th className="px-6 py-3 text-left text-sm text-gray-500">Date</th>
            </tr>
          </thead>

          <tbody>
            {recent.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-6 text-center text-gray-500">
                  No inspections conducted yet.
                </td>
              </tr>
            )}

            {recent.map(b => {
              const last = b.inspections[0]; // latest inspection
              return (
                <tr key={b.batchId} className="border-t">
                  <td className="px-6 py-4 font-semibold">{b.batchId}</td>
                  <td className="px-6 py-4">{b.productName}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        last.verdict === "Pass"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {last.verdict}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {last.inspector || "—"}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(last.inspectedAt).toLocaleString()}
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
