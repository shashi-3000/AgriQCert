// src/pages/exporter/ViewCertificate.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBatchById } from "../../utils/batches";
import QRCodeLib from "qrcode";
import { Printer, Download } from "lucide-react";

export default function ViewCertificate() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [batch, setBatch] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const b = getBatchById(batchId);
      if (!b) {
        setError("Certificate not found.");
        setBatch(null);
        return;
      }
      setBatch(b);

      // generate verify url and QR data url
      const verifyUrl = `${window.location.origin}/verify/result/${b.batchId}`;
      QRCodeLib.toDataURL(verifyUrl, { margin: 2, width: 300 })
        .then(url => setQrDataUrl(url))
        .catch((err) => {
          console.error("QR generation failed:", err);
          setQrDataUrl(null);
        });

    } catch (e) {
      console.error("Error loading certificate:", e);
      setError("Unexpected error loading certificate.");
    }
  }, [batchId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    if (!batch) return;
    const blob = new Blob([JSON.stringify(batch, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${batch.batchId}_certificate.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded shadow p-6">
          <p className="text-red-600 font-semibold">{error}</p>
          <div className="mt-4">
            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded border">Go Back</button>
          </div>
        </div>
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-gray-600">Loading certificate...</div>
      </div>
    );
  }

  const latestInspection = Array.isArray(batch.inspections) && batch.inspections.length > 0 ? batch.inspections[0] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Certificate — {batch.batchId}</h1>
          <p className="text-gray-600">Digital Quality Certificate (verifiable)</p>
        </div>

        <div className="flex gap-3">
          <button onClick={handlePrint} className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded">
            <Printer className="h-4 w-4" /> Print
          </button>
          <button onClick={handleDownloadJSON} className="inline-flex items-center gap-2 px-4 py-2 border rounded">
            <Download className="h-4 w-4" /> Download JSON
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">{batch.productName}</h2>
            <div className="text-sm text-gray-600 mb-4">
              <div><strong>Product Type:</strong> {batch.productType}</div>
              <div><strong>Quantity:</strong> {batch.quantity}</div>
              <div><strong>Destination:</strong> {batch.destination}</div>
              <div><strong>Submitted:</strong> {new Date(batch.createdAt).toLocaleString()}</div>
              <div>
                <strong>Status:</strong>{" "}
                <span className={`inline-block px-2 py-0.5 rounded ${
                  batch.status === "Certified" ? "bg-emerald-50 text-emerald-800" :
                  batch.status === "Rejected" ? "bg-red-50 text-red-800" :
                  "bg-yellow-50 text-yellow-800"
                }`}>{batch.status}</span>
              </div>
            </div>

            <hr className="my-4" />

            <h3 className="font-semibold mb-2">Inspection Summary</h3>
            {latestInspection ? (
              <div className="text-sm text-gray-700 space-y-1">
                <div><strong>Inspector:</strong> {latestInspection.inspector}</div>
                <div><strong>Verdict:</strong> {latestInspection.verdict}</div>
                <div><strong>Moisture:</strong> {latestInspection.moisture ?? "—"}</div>
                <div><strong>Purity:</strong> {latestInspection.purity ?? "—"}</div>
                <div><strong>Infestation:</strong> {latestInspection.infestation ? "Yes" : "No"}</div>
                <div><strong>Remarks:</strong> {latestInspection.remarks || "—"}</div>
                <div><strong>Inspected At:</strong> {new Date(latestInspection.inspectedAt).toLocaleString()}</div>
              </div>
            ) : (
              <div className="text-sm text-gray-600">No inspection record available.</div>
            )}

            {batch.notes && (
              <>
                <hr className="my-4" />
                <div><strong>Exporter Notes:</strong></div>
                <p className="text-sm text-gray-700 mt-2">{batch.notes}</p>
              </>
            )}
          </div>

          <div className="flex flex-col items-center justify-between p-4 border rounded">
            <div className="mb-4">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR code for verification" width={200} height={200} />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-gray-100 text-gray-500 rounded">QR not available</div>
              )}
            </div>
            <div className="text-sm text-gray-600 text-center">
              Scan to verify
              <div className="text-xs text-gray-400 mt-1">{`${window.location.origin}/verify/result/${batch.batchId}`}</div>
            </div>
            <div className="mt-4">
              <button onClick={() => navigate(`/verify/result/${batch.batchId}`)} className="px-3 py-2 bg-emerald-50 text-emerald-800 rounded">Open Verification</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from 'react'

// function ViewCertificate() {
//   return (
//     <div>ViewCertificate</div>
//   )
// }

// export default ViewCertificate