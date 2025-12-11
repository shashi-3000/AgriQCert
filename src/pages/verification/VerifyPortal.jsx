// src/pages/verification/VerifyPortal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, QrCode, Shield, CheckCircle, XCircle, AlertCircle, Leaf, Globe, Zap, Lock, Package, Calendar, MapPin, Building } from "lucide-react";
import toast from "react-hot-toast";
import verificationService, { getVerificationStatusConfig } from "../../services/verificationService";

export default function VerifyPortal() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setVerificationResult(null);
    
    const trimmed = id.trim();
    if (!trimmed) {
      setError("Please enter a certificate ID or batch number.");
      return;
    }

    setIsLoading(true);

    try {
      // Try verification by credential ID first
      let result;
      try {
        result = await verificationService.verifyCredential(trimmed);
      } catch (err) {
        // If not found by credential ID, try batch number
        if (err.response?.status === 404) {
          result = await verificationService.verifyByBatchNumber(trimmed);
        } else {
          throw err;
        }
      }

      if (result) {
        setVerificationResult(result);
        if (result.valid) {
          toast.success("Certificate verified successfully!");
        } else {
          toast.error(result.statusMessage || "Certificate verification failed");
        }
      }
    } catch (err) {
      console.error("Verification error:", err);
      const status = err.response?.status;
      const message = err.response?.data?.message;
      
      if (status === 404) {
        setError("Certificate not found. Please check the ID and try again.");
      } else {
        setError(message || "Verification failed. Please try again.");
      }
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle className="h-20 w-20 text-emerald-500" />;
      case 'REVOKED':
        return <XCircle className="h-20 w-20 text-red-500" />;
      case 'EXPIRED':
        return <AlertCircle className="h-20 w-20 text-amber-500" />;
      default:
        return <Shield className="h-20 w-20 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
              <Lock className="h-4 w-4 text-emerald-300" />
              <span className="text-emerald-200 text-sm font-medium">Blockchain Verified</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Certificate Verification
            </h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Instantly verify the authenticity of agricultural quality certificates using our secure verification system
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-10 pb-16">
        {/* Search Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate ID or Batch Number
              </label>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  value={id}
                  onChange={e => setId(e.target.value)}
                  placeholder="Enter certificate ID (e.g., VC-2025-12-001) or batch number"
                  className="w-full pl-14 pr-6 py-5 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all text-lg"
                  disabled={isLoading}
                />
              </div>
            </div>
          
            {error && (
              <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                <XCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex gap-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className={`flex-1 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/25'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    Verify Certificate
                  </>
                )}
              </button>
              <button 
                type="button"
                onClick={() => navigate('/verify/scan')}
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 flex items-center gap-2 transition-all"
              >
                <QrCode className="h-5 w-5" />
                Scan QR
              </button>
            </div>
          </form>
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${
            verificationResult.valid ? 'ring-4 ring-emerald-500/20' : 'ring-4 ring-red-500/20'
          }`}>
            {/* Status Header */}
            <div className={`p-10 ${verificationResult.valid ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : 'bg-gradient-to-br from-red-500 to-rose-500'}`}>
              <div className="flex flex-col items-center text-white">
                <div className="bg-white/20 backdrop-blur rounded-full p-4 mb-4">
                  {verificationResult.valid ? (
                    <CheckCircle className="h-16 w-16 text-white" />
                  ) : (
                    <XCircle className="h-16 w-16 text-white" />
                  )}
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {verificationResult.valid ? 'Valid Certificate' : 'Invalid Certificate'}
                </h2>
                <p className="text-white/80 text-center max-w-md">
                  {verificationResult.statusMessage}
                </p>
              </div>
            </div>

            {/* Certificate Details */}
            {verificationResult.batchDetails && (
              <div className="p-8">
                <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                  <Package className="h-5 w-5 text-emerald-600" />
                  Certificate Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Certificate ID</p>
                    <p className="font-semibold text-gray-900">{verificationResult.credentialId}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      getVerificationStatusConfig(verificationResult.status).bgColor
                    } ${getVerificationStatusConfig(verificationResult.status).color}`}>
                      {verificationResult.status}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Batch Number</p>
                    <p className="font-semibold text-gray-900">{verificationResult.batchDetails.batchNumber}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Product Type</p>
                    <p className="font-semibold text-gray-900">{verificationResult.batchDetails.productType}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Quantity</p>
                    <p className="font-semibold text-gray-900">
                      {verificationResult.batchDetails.quantity} {verificationResult.batchDetails.unit}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Destination</p>
                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {verificationResult.batchDetails.destinationCountry}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Issuer Details */}
            {verificationResult.issuerDetails && (
              <div className="px-8 pb-8">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-emerald-600" />
                    Issued By
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-xl">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{verificationResult.issuerDetails.name}</p>
                      <p className="text-sm text-gray-500 font-mono">{verificationResult.issuerDetails.did}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Timestamp */}
            <div className="bg-gray-50 px-8 py-4 flex items-center justify-center gap-2 text-gray-500">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Verified at: {new Date(verificationResult.verifiedAt).toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Features Section */}
        {!verificationResult && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Zap, title: 'Instant Verification', description: 'Verify certificates in seconds using our real-time verification system' },
              { icon: Globe, title: 'Global Standard', description: 'W3C compliant verifiable credentials recognized worldwide' },
              { icon: Lock, title: 'Tamper-Proof', description: 'Blockchain-backed certificates that cannot be forged or altered' }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
