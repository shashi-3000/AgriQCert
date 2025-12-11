// src/pages/exporter/SubmitBatch.jsx
import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addBatch } from "../../utils/batches";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
// import { Input, Label } from "../../components/ui"; // optional if you have simple ui components — if not, ignore
import { Calendar, UploadCloud, ArrowRight } from "lucide-react";

const schema = yup.object({
  productType: yup.string().required("Product type is required"),
  productName: yup.string().required("Product name is required"),
  quantity: yup.number().typeError("Quantity must be a number").positive("Must be positive").required("Quantity is required"),
  unit: yup.string().required("Unit is required"),
  destination: yup.string().required("Destination is required"),
  shipDate: yup.date().required("Ship date is required"),
  notes: yup.string().nullable()
}).required();

function generateBatchId() {
  const now = Date.now().toString(36).toUpperCase();
  const short = now.slice(-6);
  return `BATCH${short}`;
}

export default function SubmitBatch() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productType: "",
      productName: "",
      quantity: "",
      unit: "kg",
      destination: "",
      shipDate: "",
      notes: ""
    }
  });

  const onDrop = useCallback(acceptedFiles => {
    // keep small objects in memory: name + size + type + preview (base64 optional)
    const mapped = acceptedFiles.map(f => Object.assign(f, {
      preview: URL.createObjectURL(f)
    }));
    setFiles(prev => [...prev, ...mapped]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": []
    },
    maxSize: 5 * 1024 * 1024 // 5MB per file
  });

  const removeFile = (name) => {
    setFiles(prev => prev.filter(f => f.name !== name));
  };

  const onSubmit = async (data) => {
    try {
      // build batch object
      const batch = {
        batchId: generateBatchId(),
        productType: data.productType,
        productName: data.productName,
        quantity: `${data.quantity} ${data.unit}`,
        quantityRaw: Number(data.quantity),
        unit: data.unit,
        destination: data.destination,
        shipDate: data.shipDate,
        notes: data.notes || "",
        attachments: files.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type,
          preview: f.preview // temporary in-memory preview
        })),
        status: "Submitted",
        createdAt: new Date().toISOString()
      };

      addBatch(batch);
      toast.success("Batch submitted successfully");
      // reset form and files
      reset();
      setFiles([]);
      // redirect to batch list
      navigate("/exporter/batches");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit batch");
    }
  };

  return (
    <div className=" mx-auto p-16 bg-gradient-to-tr from-emerald-200 via-teal-100 to-red-200">
      <h1 className="text-4xl font-bold mb-4 ">Submit New Batch</h1>
      <p className="text-gray-600 mb-6">Fill product details and upload relevant documents/images.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Type</label>
            <select {...register("productType")} className={`mt-1 block w-full rounded border px-3 py-2 ${errors.productType ? "border-red-500" : "border-gray-300"}`}>
              <option value="">Select type</option>
              <option value="Grains">Grains</option>
              <option value="Spices">Spices</option>
              <option value="Pulses">Pulses</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Other">Other</option>
            </select>
            {errors.productType && <p className="text-red-600 text-sm mt-1">{errors.productType.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input {...register("productName")} className={`mt-1 block w-full rounded border px-3 py-2 ${errors.productName ? "border-red-500" : "border-gray-300"}`} placeholder="e.g., Basmati Rice" />
            {errors.productName && <p className="text-red-600 text-sm mt-1">{errors.productName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <div className="flex gap-2">
              <input {...register("quantity")} className={`mt-1 block w-2/3 rounded border px-3 py-2 ${errors.quantity ? "border-red-500" : "border-gray-300"}`} placeholder="1000" />
              <select {...register("unit")} className="mt-1 block w-1/3 rounded border px-3 py-2 border-gray-300">
                <option value="kg">kg</option>
                <option value="ton">ton</option>
                <option value="lb">lb</option>
              </select>
            </div>
            {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Destination Country</label>
            <input {...register("destination")} className={`mt-1 block w-full rounded border px-3 py-2 ${errors.destination ? "border-red-500" : "border-gray-300"}`} placeholder="e.g., UAE" />
            {errors.destination && <p className="text-red-600 text-sm mt-1">{errors.destination.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Ship Date</label>
            <div className="relative">
              <input type="date" {...register("shipDate")} className={`mt-1 block w-full rounded border px-3 py-2 ${errors.shipDate ? "border-red-500" : "border-gray-300"}`} />
              <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            {errors.shipDate && <p className="text-red-600 text-sm mt-1">{errors.shipDate.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
            <textarea {...register("notes")} rows="3" className="mt-1 block w-full rounded border px-3 py-2 border-gray-300" placeholder="Any special instructions..." />
          </div>
        </div>

        {/* Dropzone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
          <div {...getRootProps()} className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${isDragActive ? "border-green-500 bg-green-50" : "border-gray-200"}`}>
            <input {...getInputProps()} />
            <UploadCloud className="mx-auto mb-2 h-6 w-6 text-gray-500" />
            <p className="text-sm text-gray-600">Drag & drop images or PDFs here, or click to browse (max 5MB each)</p>
          </div>

          {/* previews */}
          {files.length > 0 && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
              {files.map(f => (
                <div key={f.name} className="border rounded p-2 bg-gray-50 relative">
                  {f.type.startsWith("image/") ? (
                    <img src={f.preview} alt={f.name} className="h-28 w-full object-contain rounded" />
                  ) : (
                    <div className="h-28 flex items-center justify-center text-sm text-gray-700">{f.name}</div>
                  )}
                  <button type="button" onClick={() => removeFile(f.name)} className="absolute top-1 right-1 text-red-600 text-xs">Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end items-center gap-3">
          <button type="button" onClick={() => { reset(); setFiles([]); }} className="px-4 py-2 rounded border">Reset</button>
          <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white rounded shadow inline-flex items-center">
            Submit
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
