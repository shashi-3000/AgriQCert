// src/pages/qa/InspectionForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  RefreshCw,
  Package,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { batchService, inspectionService, GRADE_RATINGS } from "../../services";

const schema = yup
  .object({
    qualityGrade: yup.string().required("Quality grade is required"),
    moistureContent: yup
      .number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .min(0)
      .max(100),
    foreignMatter: yup
      .number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .min(0)
      .max(100),
    pestResidueLevel: yup.string().nullable(),
    visualAppearance: yup
      .string()
      .required("Visual appearance assessment is required"),
    odorAssessment: yup.string().required("Odor assessment is required"),
    packagingCondition: yup
      .string()
      .required("Packaging condition is required"),
    result: yup
      .string()
      .required("Inspection result is required")
      .oneOf(["PASS", "FAIL"]),
    remarks: yup.string().nullable(),
  })
  .required();

export default function InspectionForm() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [batch, setBatch] = useState(null);
  const [inspection, setInspection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      qualityGrade: "",
      moistureContent: "",
      foreignMatter: "",
      pestResidueLevel: "",
      visualAppearance: "",
      odorAssessment: "",
      packagingCondition: "",
      result: "PASS",
      remarks: "",
    },
  });

  const watchResult = watch("result");

  const fetchBatch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const batchData = await batchService.getBatchById(batchId);
      if (!batchData) {
        setError("Batch not found");
        return;
      }
      setBatch(batchData);

      // Try to get existing inspection for this batch
      try {
        const inspectionData = await inspectionService.getInspectionByBatchId(
          batchId
        );
        setInspection(inspectionData);
      } catch (err) {
        // No inspection exists yet, will create one when submitting
        console.log("No existing inspection found, will create new one");
        setInspection(null);
      }
    } catch (err) {
      console.error("Failed to fetch batch:", err);
      setError(err.message || "Failed to load batch details");
      toast.error("Failed to load batch details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBatch();
  }, [batchId]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      let inspectionId = inspection?.id;

      // Step 1: Create inspection if it doesn't exist
      if (!inspectionId) {
        const scheduleData = {
          scheduledDate: new Date().toISOString(),
          inspectorName: "QA Inspector",
          inspectionLocation: batch.sourceCountry || "Inspection Site",
          estimatedDuration: 120,
          specialInstructions: null,
        };
        const createdInspection = await inspectionService.scheduleInspection(
          batchId,
          scheduleData
        );
        inspectionId = createdInspection.id;
        setInspection(createdInspection);
      }

      // Step 2: Start the inspection if not already started
      try {
        await inspectionService.startInspection(inspectionId);
      } catch (e) {
        // May already be started, continue
        console.log("Inspection already started:", e.message);
      }

      // Step 3: Submit inspection results
      const inspectionData = {
        inspectionDate: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
        inspectorName: "QA Inspector",
        inspectorId: null,
        moistureLevel: data.moistureContent
          ? parseFloat(data.moistureContent)
          : null,
        pesticideContent: null,
        pesticideCompliant: data.pestResidueLevel
          ? data.pestResidueLevel === "NONE"
          : null,
        organicStatus: null,
        organicCertificationNumber: null,
        isoCodes: null,
        gradeRating: data.qualityGrade, // Should be A_PLUS, A, B, C, D, or F
        proteinContent: null,
        fatContent: null,
        fiberContent: null,
        foreignMatter: data.foreignMatter
          ? parseFloat(data.foreignMatter)
          : null,
        brokenDamagedPercentage: null,
        colorGrade: data.visualAppearance || null,
        odorStatus: data.odorAssessment || null,
        packagingCondition: data.packagingCondition || null,
        remarks: data.remarks || null,
        detailedReport: null,
        passed: data.result === "PASS",
        failureReason: data.result === "FAIL" ? data.remarks : null,
      };

      await inspectionService.submitResults(inspectionId, inspectionData);

      toast.success(
        `Inspection completed — ${
          data.result === "PASS" ? "Certified" : "Rejected"
        }`
      );
      navigate("/qa/history");
    } catch (err) {
      console.error("Failed to submit inspection:", err);
      toast.error(err.message || "Failed to submit inspection");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading batch details...</p>
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
            Error Loading Batch
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 inline mr-2" /> Go Back
            </button>
            <button
              onClick={fetchBatch}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              <RefreshCw className="h-4 w-4 inline mr-2" /> Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!batch) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800 mb-2 inline-flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Pending
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Conduct Inspection</h1>
        <p className="text-gray-600">Batch: {batch.batchNumber}</p>
      </div>

      {/* Batch Summary Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-green-600" /> Batch Information
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Product Type</p>
            <p className="font-medium">{batch.productType}</p>
          </div>
          <div>
            <p className="text-gray-500">Quantity</p>
            <p className="font-medium">
              {batch.quantity} {batch.unit}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Source</p>
            <p className="font-medium">{batch.sourceCountry}</p>
          </div>
          <div>
            <p className="text-gray-500">Destination</p>
            <p className="font-medium">{batch.destinationCountry}</p>
          </div>
          <div>
            <p className="text-gray-500">Harvest Date</p>
            <p className="font-medium">
              {new Date(batch.harvestDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Expected Shipment</p>
            <p className="font-medium">
              {new Date(batch.expectedShipmentDate).toLocaleDateString()}
            </p>
          </div>
          {batch.productDescription && (
            <div className="col-span-2">
              <p className="text-gray-500">Description</p>
              <p className="font-medium">{batch.productDescription}</p>
            </div>
          )}
        </div>
      </div>

      {/* Inspection Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Inspection Details</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Quality Assessment */}
          <div className="border-b pb-6">
            <h3 className="text-md font-medium text-gray-800 mb-4">
              Quality Assessment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quality Grade *
                </label>
                <select
                  {...register("qualityGrade")}
                  className={`block w-full rounded-lg border px-3 py-2.5 ${
                    errors.qualityGrade ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500`}
                >
                  <option value="">Select grade</option>
                  {GRADE_RATINGS.map((grade) => (
                    <option key={grade.value} value={grade.value}>
                      {grade.label} - {grade.description}
                    </option>
                  ))}
                </select>
                {errors.qualityGrade && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.qualityGrade.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Moisture Content (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("moistureContent")}
                  placeholder="e.g., 12.5"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-green-500"
                />
                {errors.moistureContent && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.moistureContent.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foreign Matter (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("foreignMatter")}
                  placeholder="e.g., 0.5"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pest Residue Level
                </label>
                <select
                  {...register("pestResidueLevel")}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select level</option>
                  <option value="NONE">None Detected</option>
                  <option value="TRACE">Trace Amount</option>
                  <option value="LOW">Low</option>
                  <option value="MODERATE">Moderate</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Physical Assessment */}
          <div className="border-b pb-6">
            <h3 className="text-md font-medium text-gray-800 mb-4">
              Physical Assessment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visual Appearance *
                </label>
                <select
                  {...register("visualAppearance")}
                  className={`block w-full rounded-lg border px-3 py-2.5 ${
                    errors.visualAppearance
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500`}
                >
                  <option value="">Select assessment</option>
                  <option value="EXCELLENT">Excellent</option>
                  <option value="GOOD">Good</option>
                  <option value="ACCEPTABLE">Acceptable</option>
                  <option value="POOR">Poor</option>
                  <option value="UNACCEPTABLE">Unacceptable</option>
                </select>
                {errors.visualAppearance && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.visualAppearance.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Odor Assessment *
                </label>
                <select
                  {...register("odorAssessment")}
                  className={`block w-full rounded-lg border px-3 py-2.5 ${
                    errors.odorAssessment ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500`}
                >
                  <option value="">Select assessment</option>
                  <option value="NORMAL">Normal/Natural</option>
                  <option value="SLIGHTLY_OFF">Slightly Off</option>
                  <option value="ABNORMAL">Abnormal</option>
                  <option value="RANCID">Rancid/Spoiled</option>
                </select>
                {errors.odorAssessment && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.odorAssessment.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Packaging Condition *
                </label>
                <select
                  {...register("packagingCondition")}
                  className={`block w-full rounded-lg border px-3 py-2.5 ${
                    errors.packagingCondition
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500`}
                >
                  <option value="">Select condition</option>
                  <option value="INTACT">Intact</option>
                  <option value="MINOR_DAMAGE">Minor Damage</option>
                  <option value="MODERATE_DAMAGE">Moderate Damage</option>
                  <option value="SEVERE_DAMAGE">Severe Damage</option>
                </select>
                {errors.packagingCondition && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.packagingCondition.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Final Verdict */}
          <div className="border-b pb-6">
            <h3 className="text-md font-medium text-gray-800 mb-4">
              Final Verdict
            </h3>
            <div className="flex gap-4 mb-4">
              <label
                className={`flex-1 flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  watchResult === "PASS"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <input
                  type="radio"
                  value="PASS"
                  {...register("result")}
                  className="sr-only"
                />
                <CheckCircle
                  className={`h-6 w-6 ${
                    watchResult === "PASS" ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <div>
                  <p className="font-medium">Pass (Certify)</p>
                  <p className="text-sm text-gray-500">
                    Batch meets quality standards
                  </p>
                </div>
              </label>

              <label
                className={`flex-1 flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  watchResult === "FAIL"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-red-300"
                }`}
              >
                <input
                  type="radio"
                  value="FAIL"
                  {...register("result")}
                  className="sr-only"
                />
                <XCircle
                  className={`h-6 w-6 ${
                    watchResult === "FAIL" ? "text-red-600" : "text-gray-400"
                  }`}
                />
                <div>
                  <p className="font-medium">Fail (Reject)</p>
                  <p className="text-sm text-gray-500">
                    Batch does not meet standards
                  </p>
                </div>
              </label>
            </div>
            {errors.result && (
              <p className="text-red-600 text-sm">{errors.result.message}</p>
            )}
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks / Comments
            </label>
            <textarea
              {...register("remarks")}
              rows="3"
              placeholder="Add any additional observations, recommendations, or notes..."
              className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/qa/pending-inspections")}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 rounded-lg font-medium text-white inline-flex items-center ${
                watchResult === "FAIL"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  {watchResult === "PASS" ? (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  {watchResult === "PASS" ? "Certify Batch" : "Reject Batch"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
