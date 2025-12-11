// src/pages/verification/VerificationResult.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { getBatchById } from "../../utils/batches";

export default function VerificationResult() {
  const { certificateId } = useParams();
  const batch = getBatchById(certificateId);

  if (!batch) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Certificate Not Found</h2>
        <p className="text-gray-600">We could not find a certificate with that ID. Please check the QR or enter a valid ID.</p>
      </div>
    );
  }

  const latest = Array.isArray(batch.inspections) && batch.inspections.length > 0 ? batch.inspections[0] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded shadow p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Verification Result</h1>
            <p className="text-sm text-gray-600">Certificate ID: {batch.batchId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{batch.productName}</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <div><strong>Product Type:</strong> {batch.productType}</div>
              <div><strong>Quantity:</strong> {batch.quantity}</div>
              <div><strong>Destination:</strong> {batch.destination}</div>
              <div><strong>Submitted:</strong> {new Date(batch.createdAt).toLocaleString()}</div>
              <div><strong>Status:</strong> <span className={`px-2 py-0.5 rounded ${batch.status === "Certified" ? "bg-emerald-50 text-emerald-800" : batch.status === "Rejected" ? "bg-red-50 text-red-800" : "bg-yellow-50 text-yellow-800"}`}>{batch.status}</span></div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Inspection</h3>
            {latest ? (
              <div className="text-sm text-gray-700 space-y-1">
                <div><strong>Verdict:</strong> {latest.verdict}</div>
                <div><strong>Inspector:</strong> {latest.inspector}</div>
                <div><strong>Moisture:</strong> {latest.moisture ?? "—"}</div>
                <div><strong>Purity:</strong> {latest.purity ?? "—"}</div>
                <div><strong>Infestation:</strong> {latest.infestation ? "Yes" : "No"}</div>
                <div><strong>Remarks:</strong> {latest.remarks || "—"}</div>
                <div><strong>Inspected At:</strong> {new Date(latest.inspectedAt).toLocaleString()}</div>
              </div>
            ) : (
              <div className="text-sm text-gray-600">No inspection record available.</div>
            )}
          </div>
        </div>

        <div className="mt-6 text-right">
          <a href={`#`} onClick={(e)=>{ e.preventDefault(); window.print(); }} className="inline-block px-4 py-2 bg-green-600 text-white rounded">Print Verification</a>
        </div>
      </div>
    </div>
  );
}
