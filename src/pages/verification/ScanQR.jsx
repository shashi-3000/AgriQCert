// src/pages/verification/ScanQR.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, XCircle, AlertCircle, RefreshCw, ArrowLeft, QrCode, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ScanQR() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [lastScanned, setLastScanned] = useState(null);
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  const startScanner = async () => {
    setError(null);
    setIsScanning(true);
    
    try {
      // Check for camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);

      // Initialize scanner
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("qr-reader");
      }

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };

      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanFailure
      );
    } catch (err) {
      console.error("Scanner error:", err);
      setHasPermission(false);
      setIsScanning(false);
      
      if (err.name === "NotAllowedError") {
        setError("Camera permission denied. Please allow camera access to scan QR codes.");
      } else if (err.name === "NotFoundError") {
        setError("No camera found on this device.");
      } else {
        setError(err.message || "Failed to start camera");
      }
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
      } catch (err) {
        console.log("Stop scanner error:", err);
      }
    }
    setIsScanning(false);
  };

  const onScanSuccess = (decodedText, decodedResult) => {
    console.log("QR Code scanned:", decodedText);
    setLastScanned(decodedText);
    
    // Parse the URL to extract certificate ID
    let certificateId = null;
    
    try {
      const url = new URL(decodedText);
      // Check if it's a verification URL
      if (url.pathname.includes('/verify/result/')) {
        certificateId = url.pathname.split('/verify/result/')[1];
      } else if (url.pathname.includes('/verify')) {
        // Check for query params
        certificateId = url.searchParams.get('id') || url.searchParams.get('batch');
      }
    } catch {
      // Not a URL, treat as direct certificate ID
      certificateId = decodedText;
    }

    if (certificateId) {
      toast.success("QR Code scanned successfully!");
      stopScanner();
      navigate(`/verify/result/${certificateId}`);
    } else {
      toast.error("Invalid QR code format");
    }
  };

  const onScanFailure = (error) => {
    // Silently ignore scan failures (no QR in frame)
    // console.log("Scan failure:", error);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/verify" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Verification
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Scan QR Code</h1>
          <p className="text-gray-600 mt-2">Point your camera at a certificate QR code to verify</p>
        </div>

        {/* Scanner Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Scanner View */}
          <div className="relative aspect-square bg-black">
            {!isScanning ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                {error ? (
                  <>
                    <AlertCircle className="h-16 w-16 text-red-400 mb-4" />
                    <p className="text-red-300 text-center mb-4">{error}</p>
                    <button 
                      onClick={startScanner}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100"
                    >
                      <RefreshCw className="h-4 w-4" /> Try Again
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-48 h-48 border-4 border-dashed border-gray-600 rounded-2xl flex items-center justify-center mb-6">
                      <QrCode className="h-20 w-20 text-gray-500" />
                    </div>
                    <button 
                      onClick={startScanner}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                    >
                      <Camera className="h-5 w-5" /> Start Camera
                    </button>
                    <p className="text-gray-400 text-sm mt-4">
                      Allow camera access when prompted
                    </p>
                  </>
                )}
              </div>
            ) : (
              <>
                <div id="qr-reader" className="w-full h-full" ref={scannerRef}></div>
                {/* Overlay with scanning indicator */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-center">
                    <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Scanning...
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Controls */}
          <div className="p-6 border-t">
            {isScanning ? (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Position the QR code within the frame
                </p>
                <button 
                  onClick={stopScanner}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  <XCircle className="h-4 w-4" /> Stop
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  Can't scan? <Link to="/verify" className="text-green-600 hover:underline">Enter certificate ID manually</Link>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Last Scanned */}
        {lastScanned && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-800">Last Scanned</p>
                <p className="text-sm text-green-600 truncate">{lastScanned}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold text-gray-900 mb-3">Tips for scanning</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              Ensure good lighting on the QR code
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              Hold the camera steady and align the QR code within the frame
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              Make sure the QR code is flat and not crumpled
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              Keep a distance of 10-20 cm from the code
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}