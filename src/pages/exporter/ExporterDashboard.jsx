// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Package, TrendingUp, Clock, CheckCircle, AlertCircle, Plus, Eye, Download } from 'lucide-react';

// const ExporterDashboard = () => {
//   const [stats, setStats] = useState({
//     totalBatches: 0,
//     underInspection: 0,
//     certified: 0,
//     rejected: 0
//   });

//   const [recentBatches, setRecentBatches] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // TODO: Replace with actual API call
//     // fetchDashboardData();
    
//     // Mock data
//     setTimeout(() => {
//       setStats({
//         totalBatches: 48,
//         underInspection: 12,
//         certified: 32,
//         rejected: 4
//       });

//       setRecentBatches([
//         {
//           id: 'BATCH001',
//           productType: 'Basmati Rice',
//           quantity: '1000 kg',
//           submittedDate: '2024-01-10',
//           status: 'certified',
//           destination: 'UAE'
//         },
//         {
//           id: 'BATCH002',
//           productType: 'Organic Wheat',
//           quantity: '2000 kg',
//           submittedDate: '2024-01-12',
//           status: 'under_inspection',
//           destination: 'USA'
//         },
//         {
//           id: 'BATCH003',
//           productType: 'Turmeric Powder',
//           quantity: '500 kg',
//           submittedDate: '2024-01-14',
//           status: 'submitted',
//           destination: 'UK'
//         },
//         {
//           id: 'BATCH004',
//           productType: 'Black Pepper',
//           quantity: '750 kg',
//           submittedDate: '2024-01-15',
//           status: 'certified',
//           destination: 'Germany'
//         }
//       ]);

//       setIsLoading(false);
//     }, 1000);
//   }, []);

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       submitted: { color: 'bg-blue-100 text-blue-800', text: 'Submitted', icon: Clock },
//       under_inspection: { color: 'bg-yellow-100 text-yellow-800', text: 'Under Inspection', icon: AlertCircle },
//       certified: { color: 'bg-green-100 text-green-800', text: 'Certified', icon: CheckCircle },
//       rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected', icon: AlertCircle }
//     };

//     const config = statusConfig[status] || statusConfig.submitted;
//     const Icon = config.icon;

//     return (
//       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
//         <Icon className="h-4 w-4 mr-1" />
//         {config.text}
//       </span>
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Exporter Dashboard</h1>
//           <p className="text-gray-600">Manage your product batches and certifications</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {/* Total Batches */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Total Batches</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.totalBatches}</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <Package className="h-8 w-8 text-blue-600" />
//               </div>
//             </div>
//           </div>

//           {/* Under Inspection */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Under Inspection</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.underInspection}</p>
//               </div>
//               <div className="bg-yellow-100 p-3 rounded-lg">
//                 <Clock className="h-8 w-8 text-yellow-600" />
//               </div>
//             </div>
//           </div>

//           {/* Certified */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Certified</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.certified}</p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-lg">
//                 <CheckCircle className="h-8 w-8 text-green-600" />
//               </div>
//             </div>
//           </div>

//           {/* Rejected */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Rejected</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.rejected}</p>
//               </div>
//               <div className="bg-red-100 p-3 rounded-lg">
//                 <AlertCircle className="h-8 w-8 text-red-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-6 mb-8">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="text-white mb-4 md:mb-0">
//               <h2 className="text-2xl font-bold mb-2">Submit New Batch</h2>
//               <p className="text-green-100">Upload product details and request quality inspection</p>
//             </div>
//             <Link
//               to="/exporter/submit-batch"
//               className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
//             >
//               <Plus className="h-5 w-5 mr-2" />
//               Submit Batch
//             </Link>
//           </div>
//         </div>

//         {/* Recent Batches */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-900">Recent Batches</h2>
//               <Link
//                 to="/exporter/batches"
//                 className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
//               >
//                 View All
//                 <TrendingUp className="h-4 w-4 ml-1" />
//               </Link>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Batch ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Product Type
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Quantity
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Destination
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Submitted Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {recentBatches.map((batch) => (
//                   <tr key={batch.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {batch.id}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {batch.productType}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {batch.quantity}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {batch.destination}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {batch.submittedDate}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getStatusBadge(batch.status)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <div className="flex space-x-2">
//                         <button className="text-blue-600 hover:text-blue-800">
//                           <Eye className="h-5 w-5" />
//                         </button>
//                         {batch.status === 'certified' && (
//                           <button className="text-green-600 hover:text-green-800">
//                             <Download className="h-5 w-5" />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExporterDashboard;




// src/pages/exporter/ExporterDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, FilePlus, DownloadCloud, Eye, AlertCircle, Clock, CheckCircle, XCircle, RefreshCw, TrendingUp, ArrowRight, Leaf } from "lucide-react";
import { batchService, dashboardService, credentialService, BATCH_STATUS_CONFIG } from "../../services";
import toast from "react-hot-toast";

export default function ExporterDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBatches: 0,
    submittedBatches: 0,
    underInspection: 0,
    certifiedBatches: 0,
    rejectedBatches: 0
  });
  const [recentBatches, setRecentBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch dashboard stats
      const dashboardStats = await dashboardService.getExporterDashboard();
      setStats({
        totalBatches: dashboardStats.totalBatches || 0,
        submittedBatches: dashboardStats.submittedBatches || 0,
        underInspection: dashboardStats.underInspectionBatches || 0,
        certifiedBatches: dashboardStats.certifiedBatches || 0,
        rejectedBatches: dashboardStats.rejectedBatches || 0
      });

      // Fetch recent batches
      const batchesResponse = await batchService.getMyBatches({ page: 0, size: 5, sortBy: 'createdAt', sortDir: 'desc' });
      setRecentBatches(batchesResponse.content || []);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadge = (status) => {
    const config = BATCH_STATUS_CONFIG[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleDownloadQR = async (batchId) => {
    try {
      // First get credential by batch ID
      const credential = await credentialService.getCredentialByBatchId(batchId);
      if (credential?.id) {
        await credentialService.downloadQRCode(credential.id);
        toast.success('QR Code downloaded');
      } else {
        toast.error('No credential found for this batch');
      }
    } catch (err) {
      console.error('Failed to download QR:', err);
      toast.error('Failed to download QR code');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-emerald-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading dashboard...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/10 backdrop-blur p-2 rounded-xl">
                  <Leaf className="h-6 w-6 text-emerald-300" />
                </div>
                <span className="text-emerald-300 font-medium">Exporter Portal</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
              <p className="mt-2 text-emerald-100">Manage your product batches and certifications</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchDashboardData}
                className="p-3 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => navigate("/exporter/submit-batch")}
                className="inline-flex items-center gap-2 bg-white text-emerald-800 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <FilePlus className="h-5 w-5" /> Submit Batch
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-12">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Batches', value: stats.totalBatches, icon: Package, color: 'blue', gradient: 'from-blue-500 to-indigo-500' },
            { label: 'Under Inspection', value: stats.underInspection, icon: Clock, color: 'amber', gradient: 'from-amber-500 to-orange-500' },
            { label: 'Certified', value: stats.certifiedBatches, icon: CheckCircle, color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
            { label: 'Rejected', value: stats.rejectedBatches, icon: XCircle, color: 'red', gradient: 'from-red-500 to-rose-500' }
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

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white rounded-3xl p-8 mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Submit a New Batch?</h2>
              <p className="text-emerald-100 max-w-lg">Upload product details, documentation, and request quality inspection from certified agencies.</p>
            </div>
            <button 
              onClick={() => navigate("/exporter/submit-batch")} 
              className="flex-shrink-0 bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 inline-flex items-center gap-2 shadow-lg transition-all hover:scale-105"
            >
              <FilePlus className="h-5 w-5" /> Submit Batch <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Recent batches */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Recent Batches</h3>
            </div>
            <Link 
              to="/exporter/batches" 
              className="inline-flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700 group"
            >
              View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Batch Number</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Type</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {recentBatches.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                          <Package className="h-10 w-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500 mb-2">No batches submitted yet</p>
                        <Link 
                          to="/exporter/submit-batch" 
                          className="text-emerald-600 font-medium hover:text-emerald-700 inline-flex items-center gap-1"
                        >
                          Submit your first batch <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}

                {recentBatches.map(batch => (
                  <tr key={batch.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{batch.batchNumber}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{batch.productType}</td>
                    <td className="px-6 py-4 text-gray-700">{batch.quantity} {batch.unit}</td>
                    <td className="px-6 py-4 text-gray-700">{batch.destinationCountry}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(batch.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(batch.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link 
                          to={`/exporter/certificate/${batch.id}`} 
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        {batch.status === 'CERTIFIED' && (
                          <button 
                            onClick={() => handleDownloadQR(batch.id)} 
                            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                            title="Download QR Code"
                          >
                            <DownloadCloud className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
