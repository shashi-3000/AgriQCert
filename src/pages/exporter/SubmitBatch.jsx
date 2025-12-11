// src/pages/exporter/SubmitBatch.jsx
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { Calendar, UploadCloud, ArrowRight, X, FileText, Image, Loader2 } from "lucide-react";
import { batchService, PRODUCT_TYPES } from "../../services";

const schema = yup.object({
  productType: yup.string().required("Product type is required"),
  batchNumber: yup.string().required("Batch number is required"),
  quantity: yup.number().typeError("Quantity must be a number").positive("Must be positive").required("Quantity is required"),
  unit: yup.string().required("Unit is required"),
  sourceCountry: yup.string().required("Source country is required"),
  destinationCountry: yup.string().required("Destination country is required"),
  harvestDate: yup.date().required("Harvest date is required").max(new Date(), "Harvest date cannot be in the future"),
  expectedShipmentDate: yup.date().required("Expected shipment date is required"),
  productDescription: yup.string().nullable(),
  farmerDetails: yup.string().nullable(),
  storageConditions: yup.string().nullable()
}).required();

const UNITS = ['KG', 'TONS', 'LBS', 'QUINTALS', 'BAGS'];

export default function SubmitBatch() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productType: "",
      batchNumber: "",
      quantity: "",
      unit: "KG",
      sourceCountry: "",
      destinationCountry: "",
      harvestDate: "",
      expectedShipmentDate: "",
      productDescription: "",
      farmerDetails: "",
      storageConditions: ""
    }
  });

  const onDrop = useCallback(acceptedFiles => {
    const mapped = acceptedFiles.map(f => Object.assign(f, {
      preview: URL.createObjectURL(f)
    }));
    setFiles(prev => [...prev, ...mapped]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      "application/pdf": [".pdf"]
    },
    maxSize: 10 * 1024 * 1024 // 10MB per file
  });

  const removeFile = (name) => {
    setFiles(prev => {
      const file = prev.find(f => f.name === name);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter(f => f.name !== name);
    });
  };

  const onSubmit = async (data) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Format dates properly
      const batchData = {
        productType: data.productType,
        batchNumber: data.batchNumber,
        quantity: Number(data.quantity),
        unit: data.unit,
        sourceCountry: data.sourceCountry,
        destinationCountry: data.destinationCountry,
        harvestDate: new Date(data.harvestDate).toISOString().split('T')[0],
        expectedShipmentDate: new Date(data.expectedShipmentDate).toISOString().split('T')[0],
        productDescription: data.productDescription || null,
        farmerDetails: data.farmerDetails || null,
        storageConditions: data.storageConditions || null
      };

      const result = await batchService.submitBatch(
        batchData, 
        files,
        (progress) => setUploadProgress(progress)
      );

      toast.success("Batch submitted successfully!");
      
      // Clean up file previews
      files.forEach(f => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
      
      // Reset form
      reset();
      setFiles([]);
      
      // Navigate to batch details or list
      navigate("/exporter/batches");
    } catch (err) {
      console.error('Failed to submit batch:', err);
      toast.error(err.message || "Failed to submit batch");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const generateBatchNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BATCH-${timestamp}-${random}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Submit New Batch</h1>
          <p className="text-gray-600 mt-2">Fill in product details and upload relevant documents for quality inspection.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
          {/* Product Information */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Type *</label>
                <select 
                  {...register("productType")} 
                  className={`block w-full rounded-lg border px-3 py-2.5 ${errors.productType ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"} focus:border-transparent focus:ring-2`}
                >
                  <option value="">Select product type</option>
                  {PRODUCT_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.productType && <p className="text-red-600 text-sm mt-1">{errors.productType.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number *</label>
                <div className="flex gap-2">
                  <input 
                    {...register("batchNumber")} 
                    className={`flex-1 rounded-lg border px-3 py-2.5 ${errors.batchNumber ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-transparent`} 
                    placeholder="e.g., BATCH-2024-001" 
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector('input[name="batchNumber"]');
                      if (input) {
                        input.value = generateBatchNumber();
                        input.dispatchEvent(new Event('input', { bubbles: true }));
                      }
                    }}
                    className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Generate
                  </button>
                </div>
                {errors.batchNumber && <p className="text-red-600 text-sm mt-1">{errors.batchNumber.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                <div className="flex gap-2">
                  <input 
                    {...register("quantity")} 
                    type="number"
                    className={`flex-1 rounded-lg border px-3 py-2.5 ${errors.quantity ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-transparent`} 
                    placeholder="e.g., 1000" 
                  />
                  <select {...register("unit")} className="w-28 rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    {UNITS.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                <textarea 
                  {...register("productDescription")} 
                  rows="2" 
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Describe the product quality, grade, variety, etc." 
                />
              </div>
            </div>
          </div>

          {/* Origin & Destination */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Origin & Destination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source Country *</label>
                <input 
                  {...register("sourceCountry")} 
                  className={`block w-full rounded-lg border px-3 py-2.5 ${errors.sourceCountry ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-transparent`} 
                  placeholder="e.g., India" 
                />
                {errors.sourceCountry && <p className="text-red-600 text-sm mt-1">{errors.sourceCountry.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Country *</label>
                <input 
                  {...register("destinationCountry")} 
                  className={`block w-full rounded-lg border px-3 py-2.5 ${errors.destinationCountry ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-transparent`} 
                  placeholder="e.g., UAE" 
                />
                {errors.destinationCountry && <p className="text-red-600 text-sm mt-1">{errors.destinationCountry.message}</p>}
              </div>
            </div>
          </div>

          {/* Dates & Details */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Dates & Additional Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harvest Date *</label>
                <div className="relative">
                  <input 
                    type="date" 
                    {...register("harvestDate")} 
                    className={`block w-full rounded-lg border px-3 py-2.5 ${errors.harvestDate ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-transparent`} 
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.harvestDate && <p className="text-red-600 text-sm mt-1">{errors.harvestDate.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Shipment Date *</label>
                <div className="relative">
                  <input 
                    type="date" 
                    {...register("expectedShipmentDate")} 
                    className={`block w-full rounded-lg border px-3 py-2.5 ${errors.expectedShipmentDate ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-transparent`} 
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.expectedShipmentDate && <p className="text-red-600 text-sm mt-1">{errors.expectedShipmentDate.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Details</label>
                <input 
                  {...register("farmerDetails")} 
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Farm name, location, etc." 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Storage Conditions</label>
                <input 
                  {...register("storageConditions")} 
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="e.g., Cool, dry warehouse at 20°C" 
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Attachments</h2>
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              <UploadCloud className="mx-auto mb-3 h-10 w-10 text-gray-400" />
              <p className="text-gray-600 font-medium">Drag & drop files here, or click to browse</p>
              <p className="text-sm text-gray-400 mt-1">Supports images (JPG, PNG) and PDFs up to 10MB each</p>
            </div>

            {/* File previews */}
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {files.map(f => (
                  <div key={f.name} className="relative border rounded-lg p-3 bg-gray-50 group">
                    {f.type.startsWith("image/") ? (
                      <div className="aspect-square overflow-hidden rounded">
                        <img src={f.preview} alt={f.name} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-square flex flex-col items-center justify-center">
                        <FileText className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-xs text-gray-600 truncate max-w-full px-1">{f.name}</span>
                      </div>
                    )}
                    <button 
                      type="button" 
                      onClick={() => removeFile(f.name)} 
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <p className="text-xs text-gray-500 mt-2 truncate">{(f.size / 1024).toFixed(1)} KB</p>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && uploadProgress > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Uploading...</span>
                  <span className="text-green-600 font-medium">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end items-center gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => { 
                reset(); 
                setFiles([]); 
              }} 
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
            >
              Reset
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || isUploading} 
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg shadow font-medium inline-flex items-center hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {(isSubmitting || isUploading) ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Batch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
