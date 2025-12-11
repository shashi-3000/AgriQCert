// src/pages/qa/InspectionForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBatchById, addInspectionToBatch, updateBatch } from "../../utils/batches";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function InspectionForm() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [batch, setBatch] = useState(null);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      moisture: "",
      purity: "",
      infestation: false,
      verdict: "pass", // pass | fail
      remarks: ""
    }
  });

  useEffect(() => {
    const b = getBatchById(batchId);
    if (!b) {
      toast.error("Batch not found");
      navigate("/qa/pending-inspections");
      return;
    }
    setBatch(b);
  }, [batchId, navigate]);

  // optional: prefill some fields with defaults
  useEffect(() => {
    setValue("moisture", "");
    setValue("purity", "");
    setValue("infestation", false);
    setValue("verdict", "pass");
    setValue("remarks", "");
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const userRaw = localStorage.getItem("user");
      const inspector = userRaw ? JSON.parse(userRaw).name || JSON.parse(userRaw).email : "QA Inspector";

      // Mark status to under inspection first
      updateBatch(batchId, { status: "Under Inspection" });

      // Build inspection record
      const inspection = {
        inspector,
        moisture: data.moisture || null,
        purity: data.purity || null,
        infestation: !!data.infestation,
        verdict: data.verdict === "pass" ? "Pass" : "Fail",
        remarks: data.remarks || ""
      };

      const finalStatus = inspection.verdict === "Pass" ? "Certified" : "Rejected";

      addInspectionToBatch(batchId, inspection, finalStatus);

      toast.success(`Inspection saved — status: ${finalStatus}`);
      // navigate to history or pending list
      navigate("/qa/history");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save inspection");
    }
  };

  if (!batch) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Inspection — {batch.batchId}</h1>
        <p className="text-gray-600">{batch.productName} • {batch.productType} • {batch.quantity}</p>
      </div>

      <div className="bg-white rounded shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Moisture (%)</label>
              <input {...register("moisture")} placeholder="e.g., 12" className="mt-1 block w-full rounded border px-3 py-2 border-gray-300" />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Purity (%)</label>
              <input {...register("purity")} placeholder="e.g., 99.5" className="mt-1 block w-full rounded border px-3 py-2 border-gray-300" />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Infestation</label>
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input type="checkbox" {...register("infestation")} className="h-4 w-4" />
                  <span className="ml-2 text-sm text-gray-700">Evidence of infestation</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Verdict</label>
            <div className="mt-2 flex items-center gap-4">
              <label className="inline-flex items-center">
                <input type="radio" value="pass" {...register("verdict")} defaultChecked />
                <span className="ml-2">Pass (Certify)</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" value="fail" {...register("verdict")} className="ml-4" />
                <span className="ml-2">Fail (Reject)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Remarks</label>
            <textarea {...register("remarks")} rows="3" className="mt-1 block w-full rounded border px-3 py-2 border-gray-300" placeholder="Add notes or corrective actions..." />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={() => navigate("/qa/pending-inspections")} className="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded">Save & Finalize</button>
          </div>
        </form>
      </div>
    </div>
  );
}
