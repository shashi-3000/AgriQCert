// src/pages/verification/VerificationResult.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { verificationService, parseVerificationResult, getVerificationStatusConfig } from "../../services";
import { 
  CheckCircle, XCircle, AlertCircle, Loader2, ArrowLeft, Shield, 
  Package, MapPin, Calendar, Building, User, FileText, Printer, RefreshCw 
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function VerificationResult() {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVerificationResult = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await verificationService.verifyCredential(certificateId);
      const parsed = parseVerificationResult(response);
      setResult(parsed);
    } catch (err) {
      console.error('Verification failed:', err);
      setError(err.message || 'Failed to verify certificate');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (certificateId) {
      fetchVerificationResult();
    }
  }, [certificateId]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-green-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Verifying certificate...</p>
          <p className="text-sm text-gray-400 mt-1">ID: {certificateId}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-800 mb-2">Verification Failed</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/verify" className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ArrowLeft className="h-4 w-4" /> Try Another
            </Link>
            <button onClick={fetchVerificationResult} className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <RefreshCw className="h-4 w-4" /> Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">Certificate Not Found</h2>
          <p className="text-yellow-600 mb-6">
            We could not find a certificate with ID: <code className="bg-yellow-100 px-2 py-1 rounded">{certificateId}</code>
          </p>
          <Link to="/verify" className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
            <ArrowLeft className="h-4 w-4" /> Back to Verification
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getVerificationStatusConfig(result.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 print:py-4">
      {/* Header - Hidden on print */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <Link to="/verify" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <ArrowLeft className="h-4 w-4" /> Back to Verification
        </Link>
        <button onClick={handlePrint} className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Printer className="h-4 w-4" /> Print Result
        </button>
      </div>

      {/* Result Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none print:border">
        {/* Status Banner */}
        <div className={`px-8 py-6 ${result.isValid ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-red-600 to-red-700'} text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {result.isValid ? (
                <div className="bg-white/20 rounded-full p-3">
                  <CheckCircle className="h-10 w-10" />
                </div>
              ) : (
                <div className="bg-white/20 rounded-full p-3">
                  <XCircle className="h-10 w-10" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold">
                  {result.isValid ? 'Certificate Verified' : 'Certificate Invalid'}
                </h1>
                <p className="text-white/80 mt-1">
                  {result.isValid 
                    ? 'This is an authentic AgriQCert certificate'
                    : 'This certificate could not be verified'
                  }
                </p>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-sm text-white/70">Certificate ID</p>
              <p className="font-mono text-lg">{result.credentialId || certificateId}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Batch Information */}
              {result.batch && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5 text-green-600" /> Product Information
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Batch Number</p>
                        <p className="font-semibold text-gray-900">{result.batch.batchNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Product Type</p>
                        <p className="font-semibold text-gray-900">{result.batch.productType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="font-semibold text-gray-900">{result.batch.quantity} {result.batch.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Quality Grade</p>
                        <p className="font-semibold text-gray-900">{result.batch.qualityGrade || 'A'}</p>
                      </div>
                    </div>
                    {result.batch.productDescription && (
                      <div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="font-medium text-gray-900">{result.batch.productDescription}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Origin & Destination */}
              {result.batch && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" /> Origin & Destination
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Source Country</p>
                        <p className="font-semibold text-gray-900">{result.batch.sourceCountry}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Destination Country</p>
                        <p className="font-semibold text-gray-900">{result.batch.destinationCountry}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Exporter Information */}
              {result.exporter && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-green-600" /> Exporter Information
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Company Name</p>
                        <p className="font-semibold text-gray-900">{result.exporter.companyName || result.exporter.fullName}</p>
                      </div>
                      {result.exporter.licenseNumber && (
                        <div>
                          <p className="text-sm text-gray-500">License Number</p>
                          <p className="font-semibold text-gray-900">{result.exporter.licenseNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Issuer Information */}
              {result.issuer && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" /> Issued By
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">QA Agency</p>
                        <p className="font-semibold text-gray-900">{result.issuer.companyName || result.issuer.fullName || 'AgriQCert QA'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Issue Date</p>
                        <p className="font-semibold text-gray-900">
                          {result.issuedAt 
                            ? new Date(result.issuedAt).toLocaleDateString() 
                            : 'N/A'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dates */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" /> Certificate Validity
                </h3>
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Valid From</p>
                      <p className="font-semibold text-gray-900">
                        {result.validFrom 
                          ? new Date(result.validFrom).toLocaleDateString()
                          : result.issuedAt 
                            ? new Date(result.issuedAt).toLocaleDateString()
                            : 'N/A'
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Valid Until</p>
                      <p className="font-semibold text-gray-900">
                        {result.validUntil 
                          ? new Date(result.validUntil).toLocaleDateString()
                          : 'No Expiry'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - QR & Status */}
            <div className="space-y-6">
              {/* Verification Status Card */}
              <div className={`rounded-xl p-6 text-center ${result.isValid ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                {result.isValid ? (
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-3" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-600 mx-auto mb-3" />
                )}
                <h3 className={`text-xl font-bold ${result.isValid ? 'text-green-800' : 'text-red-800'}`}>
                  {statusConfig.label}
                </h3>
                <p className={`text-sm mt-1 ${result.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {statusConfig.description}
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-6 text-center">
                <QRCodeSVG
                  value={`${window.location.origin}/verify/result/${certificateId}`}
                  size={180}
                  level="H"
                  includeMargin={true}
                  className="mx-auto"
                />
                <p className="text-sm text-gray-500 mt-3">Scan to verify this certificate</p>
              </div>

              {/* Verification Timestamp */}
              <div className="text-center text-sm text-gray-500">
                <p>Verified on</p>
                <p className="font-medium text-gray-700">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t text-center">
          <p className="text-sm text-gray-500">
            This certificate was issued and verified by AgriQCert. 
            For any inquiries, visit <span className="text-green-600">{window.location.origin}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
