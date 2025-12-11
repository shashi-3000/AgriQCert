// src/pages/verification/VerifyPortal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBatchById } from "../../utils/batches";

export default function VerifyPortal() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const trimmed = id.trim();
    if (!trimmed) {
      setError("Please enter a certificate ID or batch ID.");
      return;
    }
    const found = getBatchById(trimmed);
    if (!found) {
      setError("Certificate not found.");
      return;
    }
    navigate(`/verify/result/${trimmed}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Verify Certificate</h1>
      <p className="text-gray-600 mb-6">Enter certificate / batch ID to verify its authenticity</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder="Enter certificate or batch ID (e.g., BATCH06NBW8)"
          className="w-full px-4 py-3 border rounded"
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Verify</button>
        </div>
      </form>
    </div>
  );
}
