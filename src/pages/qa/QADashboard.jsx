// src/pages/qa/QADashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, CheckCircle, XCircle, Clock, RefreshCw, AlertCircle, TrendingUp, Calendar, Shield, ArrowRight } from "lucide-react";
import { dashboardService, inspectionService, batchService, INSPECTION_STATUS_CONFIG } from "../../services";
import toast from "react-hot-toast";

export default function QADashboard() {
  const [stats, setStats] = useState({
    pendingInspections: 0,
    completedInspections: 0,
    passedInspections: 0,
    failedInspections: 0
  });
  const [recentInspections, setRecentInspections] = useState([]);
  const [pendingBatches, setPendingBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch QA dashboard stats
      const dashboardStats = await dashboardService.getQADashboard();
      setStats({
        pendingInspections: dashboardStats.pendingInspections || 0,
        completedInspections: dashboardStats.completedInspections || 0,
        passedInspections: dashboardStats.passedInspections || 0,
        failedInspections: dashboardStats.failedInspections || 0
      });

      // Fetch pending batches for inspection
      try {
        const pending = await batchService.getPendingBatches({ page: 0, size: 5 });
        setPendingBatches(pending.content || pending || []);
      } catch (e) {
        console.log('Could not fetch pending batches:', e);
      }

      // Fetch recent inspections
      try {
        const inspections = await inspectionService.getAllInspections({ page: 0, size: 5, sortBy: 'createdAt', sortDir: 'desc' });
        setRecentInspections(inspections.content || inspections || []);
      } catch (e) {
        console.log('Could not fetch inspections:', e);
      }
    } catch (err) {
      console.error('Failed to fetch QA dashboard:', err);
      setError(err.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getResultBadge = (result) => {
    if (result === 'PASS') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
          <CheckCircle className="h-4 w-4" /> Pass
        </span>
      );
    } else if (result === 'FAIL') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-700">
          <XCircle className="h-4 w-4" /> Fail
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
        <Clock className="h-4 w-4" /> {result || 'Pending'}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading QA dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Dashboard</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchDashboardData} 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-rose-600 shadow-lg"
          >
            <RefreshCw className="h-5 w-5" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/10 backdrop-blur p-2 rounded-xl">
                  <Shield className="h-6 w-6 text-blue-300" />
                </div>
                <span className="text-blue-300 font-medium">QA Agency Portal</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Quality Assurance Dashboard</h1>
              <p className="mt-2 text-blue-100">Overview of inspections and quality control activity</p>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={fetchDashboardData} 
                className="p-3 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <Link
                to="/qa/pending-inspections"
                className="inline-flex items-center gap-2 bg-white text-blue-800 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                <ClipboardList className="h-5 w-5" /> View Pending
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Pending Inspections', value: stats.pendingInspections, icon: Clock, gradient: 'from-amber-500 to-orange-500' },
            { label: 'Total Completed', value: stats.completedInspections, icon: TrendingUp, gradient: 'from-blue-500 to-indigo-500' },
            { label: 'Passed', value: stats.passedInspections, icon: CheckCircle, gradient: 'from-emerald-500 to-teal-500' },
            { label: 'Failed', value: stats.failedInspections, icon: XCircle, gradient: 'from-red-500 to-rose-500' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-xl shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          <Link
            to="/qa/pending-inspections"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 inline-flex items-center gap-2 font-semibold"
          >
            <ClipboardList className="h-5 w-5" />
            Pending Inspections ({stats.pendingInspections})
          </Link>
          <Link
            to="/qa/history"
            className="px-6 py-3 bg-white text-gray-700 rounded-xl shadow-lg hover:bg-gray-50 inline-flex items-center gap-2 font-semibold border border-gray-200"
          >
            <Calendar className="h-5 w-5" />
            Inspection History
          </Link>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Batches */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="px-6 py-5 border-b bg-gradient-to-r from-amber-50 to-orange-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Batches Awaiting Inspection</h2>
              </div>
              <Link 
                to="/qa/pending-inspections" 
                className="text-amber-600 text-sm font-medium hover:text-amber-700 inline-flex items-center gap-1 group"
              >
                View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="divide-y">
              {pendingBatches.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No batches pending inspection</p>
                </div>
              ) : (
                pendingBatches.slice(0, 5).map(batch => (
                  <div key={batch.id} className="px-6 py-4 hover:bg-amber-50/50 flex items-center justify-between transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">{batch.batchNumber}</p>
                      <p className="text-sm text-gray-500">{batch.productType} • {batch.quantity} {batch.unit}</p>
                    </div>
                    <Link 
                      to={`/qa/inspection/${batch.id}`}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow transition-all"
                    >
                      Inspect
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Inspections */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="px-6 py-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <ClipboardList className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Recent Inspections</h2>
              </div>
              <Link 
                to="/qa/history" 
                className="text-blue-600 text-sm font-medium hover:text-blue-700 inline-flex items-center gap-1 group"
              >
                View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="divide-y">
              {recentInspections.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClipboardList className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No inspections conducted yet</p>
                </div>
              ) : (
                recentInspections.slice(0, 5).map(inspection => (
                  <div key={inspection.id} className="px-6 py-4 hover:bg-blue-50/50 flex items-center justify-between transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">{inspection.batch?.batchNumber || 'Batch'}</p>
                      <p className="text-sm text-gray-500">
                        {inspection.batch?.productType || 'Product'} • {new Date(inspection.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {getResultBadge(inspection.result)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
