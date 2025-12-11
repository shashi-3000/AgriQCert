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
import { Package, FilePlus, DownloadCloud, Eye } from "lucide-react";
import { getBatches } from "../../utils/batches";

export default function ExporterDashboard() {
  const navigate = useNavigate();
  const [batches, setBatches] = useState(() => getBatches());

  // recompute when localStorage changes (other tab or after submit)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "batches_v1") {
        setBatches(getBatches());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // also update when component mounts (in case submit redirected here)
  useEffect(() => {
    setBatches(getBatches());
  }, []);

  // stat calculations
  const total = batches.length;
  const certified = batches.filter(b => (b.status || "").toLowerCase() === "certified").length;
  const rejected = batches.filter(b => (b.status || "").toLowerCase() === "rejected").length;
  const underInspection = batches.filter(b => {
    const s = (b.status || "").toLowerCase();
    return s === "under inspection" || s === "submitted" || s === "pending";
  }).length;

  // recent list (top 5)
  const recent = batches.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Exporter Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your product batches and certifications</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/exporter/submit-batch")}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            <FilePlus className="h-4 w-4" /> Submit Batch
          </button>
          <Link to="/exporter/batches" className="inline-flex items-center gap-2 px-4 py-2 rounded border border-gray-200 hover:bg-gray-50">
            My Batches
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-5 shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Batches</p>
            <p className="text-2xl font-semibold">{total}</p>
          </div>
          <div className="bg-emerald-50 p-3 rounded">
            <Package className="h-6 w-6 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Under Inspection</p>
            <p className="text-2xl font-semibold">{underInspection}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded">
            <svg className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 8v4l3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Certified</p>
            <p className="text-2xl font-semibold">{certified}</p>
          </div>
          <div className="bg-emerald-50 p-3 rounded">
            <svg className="h-6 w-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 6L9 17l-5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="text-2xl font-semibold">{rejected}</p>
          </div>
          <div className="bg-red-50 p-3 rounded">
            <svg className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-emerald-700 text-white rounded-lg p-6 mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Submit New Batch</h2>
          <p className="mt-1 text-emerald-100">Upload product details and request quality inspection</p>
        </div>
        <div>
          <button onClick={() => navigate("/exporter/submit-batch")} className="bg-white text-emerald-800 px-4 py-2 rounded font-semibold hover:bg-gray-100 inline-flex items-center gap-2">
            <FilePlus /> Submit Batch
          </button>
        </div>
      </div>

      {/* Recent batches */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Recent Batches</h3>
          <Link to="/exporter/batches" className="text-green-600 font-medium">View All</Link>
        </div>

        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Batch ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Product Type</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Quantity</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Destination</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Submitted Date</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>

          <tbody>
            {recent.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No recent batches.</td>
              </tr>
            )}

            {recent.map(b => (
              <tr key={b.batchId} className="border-t">
                <td className="px-6 py-4 font-semibold">{b.batchId}</td>
                <td className="px-6 py-4">{b.productType}</td>
                <td className="px-6 py-4">{b.quantity}</td>
                <td className="px-6 py-4">{b.destination}</td>
                <td className="px-6 py-4">{new Date(b.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    (b.status || "").toLowerCase() === "certified" ? "bg-emerald-50 text-emerald-800" :
                    (b.status || "").toLowerCase() === "rejected" ? "bg-red-50 text-red-800" :
                    "bg-yellow-50 text-yellow-800"
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link to={`/exporter/certificate/${b.batchId}`} className="text-blue-600" title="View">
                      <Eye />
                    </Link>
                    <button className="text-green-600" title="Download (placeholder)">
                      <DownloadCloud />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
