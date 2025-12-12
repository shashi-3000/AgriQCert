// src/pages/exporter/ViewCertificate.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Printer,
  Download,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  MapPin,
  Calendar,
  Package,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  batchService,
  credentialService,
  inspectionService,
  BATCH_STATUS_CONFIG,
} from "../../services";
import toast from "react-hot-toast";

export default function ViewCertificate() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [batch, setBatch] = useState(null);
  const [credential, setCredential] = useState(null);
  const [inspection, setInspection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingCredential, setIsGeneratingCredential] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Fetch batch details
      const batchData = await batchService.getBatchById(batchId);
      setBatch(batchData);

      // Try to fetch credential if batch is certified
      if (batchData.status === "CERTIFIED") {
        try {
          const credentialData = await credentialService.getCredentialByBatchId(
            batchId
          );
          setCredential(credentialData);
        } catch (credErr) {
          console.log("No credential found:", credErr);
        }
      }

      // Try to fetch inspection data
      try {
        const inspectionData = await inspectionService.getInspectionByBatchId(
          batchId
        );
        setInspection(inspectionData);
      } catch (inspErr) {
        console.log("No inspection found:", inspErr);
      }
    } catch (err) {
      console.error("Error loading batch:", err);
      setError(err.message || "Failed to load batch details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [batchId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQR = async () => {
    if (!credential?.id) {
      toast.error("No credential available");
      return;
    }

    try {
      await credentialService.downloadQRCode(credential.id);
      toast.success("QR Code downloaded");
    } catch (err) {
      console.error("Failed to download QR:", err);
      toast.error("Failed to download QR code");
    }
  };

  const handleGenerateCredential = async () => {
    if (!batch?.id) return;

    setIsGeneratingCredential(true);
    try {
      const newCredential = await credentialService.issueCredential(batch.id);
      setCredential(newCredential);
      toast.success("Certificate generated successfully!");
      // Refresh batch data
      await fetchData();
    } catch (err) {
      console.error("Failed to generate credential:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to generate certificate. Please contact administrator."
      );
    } finally {
      setIsGeneratingCredential(false);
    }
  };

  const getVerifyUrl = () => {
    if (credential?.credentialId) {
      return `${window.location.origin}/verify/result/${credential.credentialId}`;
    }
    // Don't generate URL without valid credential - prevents confusing verification results
    return "";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "CERTIFIED":
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "REJECTED":
        return <XCircle className="h-6 w-6 text-red-600" />;
      case "UNDER_INSPECTION":
        return <Clock className="h-6 w-6 text-yellow-600" />;
      default:
        return <Clock className="h-6 w-6 text-blue-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading certificate...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Failed to Load Certificate
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 inline mr-2" /> Go Back
            </button>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              <RefreshCw className="h-4 w-4 inline mr-2" /> Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">
            Batch Not Found
          </h2>
          <p className="text-yellow-600 mb-4">
            The requested batch could not be found.
          </p>
          <button
            onClick={() => navigate("/exporter/batches")}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            View All Batches
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = BATCH_STATUS_CONFIG[batch.status] || {
    color: "bg-gray-100 text-gray-800",
    label: batch.status,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 print:py-4">
      {/* Header - Hidden on print */}
      <div className="flex items-start justify-between mb-6 print:hidden">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800 mb-2 inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Batch Details</h1>
          <p className="text-gray-600">Batch Number: {batch.batchNumber}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Printer className="h-4 w-4" /> Print
          </button>
          {credential && (
            <button
              onClick={handleDownloadQR}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              <Download className="h-4 w-4" /> Download QR
            </button>
          )}
          {batch.status?.toUpperCase() === "CERTIFIED" && !credential && (
            <button
              onClick={handleGenerateCredential}
              disabled={isGeneratingCredential}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isGeneratingCredential ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" /> Generate Certificate
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Certificate Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden print:shadow-none print:border">
        {/* Status Banner */}
        <div
          className={`px-6 py-4 ${
            batch.status?.toUpperCase() === "CERTIFIED"
              ? "bg-green-600"
              : batch.status?.toUpperCase() === "REJECTED"
              ? "bg-red-600"
              : "bg-blue-600"
          } text-white`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(batch.status)}
              <div>
                <h2 className="text-xl font-bold">{statusConfig.label}</h2>
                <p className="text-sm opacity-90">
                  {batch.status?.toUpperCase() === "CERTIFIED" &&
                  credential?.credentialId
                    ? `Certificate ID: ${credential.credentialId}`
                    : batch.status?.toUpperCase() === "CERTIFIED" && !credential
                    ? "Certificate generation in progress..."
                    : `Status as of ${new Date(
                        batch.updatedAt || batch.createdAt
                      ).toLocaleDateString()}`}
                </p>
              </div>
            </div>
            {batch.status?.toUpperCase() === "CERTIFIED" && (
              <div className="text-right">
                <p className="text-sm opacity-90">Valid Quality Certificate</p>
                <p className="font-semibold">AgriQCert Verified</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Details */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-600" /> Product
                  Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Product Type</p>
                    <p className="font-medium text-gray-900">
                      {batch.productType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Quantity</p>
                    <p className="font-medium text-gray-900">
                      {batch.quantity} {batch.unit}
                    </p>
                  </div>
                  {batch.productDescription && (
                    <div className="col-span-2">
                      <p className="text-gray-500">Description</p>
                      <p className="font-medium text-gray-900">
                        {batch.productDescription}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" /> Origin &
                  Destination
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Source Country</p>
                    <p className="font-medium text-gray-900">
                      {batch.sourceCountry}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Destination Country</p>
                    <p className="font-medium text-gray-900">
                      {batch.destinationCountry}
                    </p>
                  </div>
                  {batch.farmerDetails && (
                    <div className="col-span-2">
                      <p className="text-gray-500">Farmer Details</p>
                      <p className="font-medium text-gray-900">
                        {batch.farmerDetails}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" /> Dates
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Harvest Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(batch.harvestDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expected Shipment</p>
                    <p className="font-medium text-gray-900">
                      {new Date(
                        batch.expectedShipmentDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Submitted</p>
                    <p className="font-medium text-gray-900">
                      {new Date(batch.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {batch.storageConditions && (
                    <div>
                      <p className="text-gray-500">Storage Conditions</p>
                      <p className="font-medium text-gray-900">
                        {batch.storageConditions}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Inspection Results */}
              {inspection && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" /> Inspection
                    Results
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Inspector</p>
                        <p className="font-medium text-gray-900">
                          {inspection.inspectorName || "QA Inspector"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Grade</p>
                        <p className="font-medium text-gray-900">
                          {inspection.qualityGrade || inspection.grade || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Inspection Date</p>
                        <p className="font-medium text-gray-900">
                          {inspection.inspectionDate
                            ? new Date(
                                inspection.inspectionDate
                              ).toLocaleString()
                            : new Date(inspection.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Result</p>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${
                            inspection.result === "PASS"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {inspection.result}
                        </span>
                      </div>
                      {inspection.remarks && (
                        <div className="col-span-2">
                          <p className="text-gray-500">Remarks</p>
                          <p className="font-medium text-gray-900">
                            {inspection.remarks}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-dashed border-gray-200">
                {batch.status?.toUpperCase() === "CERTIFIED" &&
                credential?.credentialId ? (
                  <>
                    <QRCodeSVG
                      value={getVerifyUrl()}
                      size={180}
                      level="H"
                      includeMargin={true}
                    />
                    <p className="text-sm text-gray-600 mt-3 font-medium">
                      Scan to Verify
                    </p>
                    <p className="text-xs text-gray-400 mt-1 break-all max-w-[200px]">
                      {getVerifyUrl()}
                    </p>
                  </>
                ) : batch.status?.toUpperCase() === "CERTIFIED" &&
                  !credential ? (
                  <div className="py-8">
                    <AlertCircle className="h-16 w-16 text-amber-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-amber-700 mb-1">
                      Certificate Pending
                    </p>
                    <p className="text-xs text-gray-500">
                      Certificate generation in progress. Please refresh or
                      click Generate Certificate button.
                    </p>
                  </div>
                ) : (
                  <div className="py-8">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">
                      QR code will be available once the batch is certified
                    </p>
                  </div>
                )}
              </div>

              {batch.status?.toUpperCase() === "CERTIFIED" &&
                credential?.credentialId && (
                  <Link
                    to={`/verify/result/${credential.credentialId}`}
                    className="mt-4 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 w-full text-center"
                  >
                    Open Verification Page
                  </Link>
                )}

              {/* Exporter Info */}
              {/* Generate Certificate Button */}
              {batch.status?.toUpperCase() === "CERTIFIED" && !credential && (
                <button
                  onClick={handleGenerateCredential}
                  disabled={isGeneratingCredential}
                  className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2"
                >
                  {isGeneratingCredential ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      Generate Certificate
                    </>
                  )}
                </button>
              )}

              {/* Exporter Info */}
              {batch.exporter && (
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Exporter
                  </p>
                  <p className="font-medium text-gray-900">
                    {batch.exporter.companyName || batch.exporter.fullName}
                  </p>
                  {batch.exporter.licenseNumber && (
                    <p className="text-xs text-gray-500">
                      License: {batch.exporter.licenseNumber}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t text-center text-sm text-gray-500">
          <p>
            This is a digitally issued certificate by AgriQCert. Verify
            authenticity at{" "}
            <span className="text-green-600">
              {window.location.origin}/verify
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
