import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layoutt from "./components/layout/Layoutt.jsx"

//Common pages...
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Login from "./pages/Login.jsx"
import Profile from "./pages/Profile.jsx"
import Register from "./pages/Register.jsx"
import NotFound from "./pages/NotFound.jsx"
import Unauthorised from "./pages/Unauthorised.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

//Exporter pages...
import BatchList from "./pages/exporter/BatchList.jsx"
import ExporterDashboard from "./pages/exporter/ExporterDashboard.jsx"
import SubmitBatch from "./pages/exporter/SubmitBatch.jsx"
import ViewCertificate from "./pages/exporter/ViewCertificate.jsx"

//QA pages...
import QADashboard from "./pages/qa/QADashboard.jsx"
import InspectionForm from "./pages/qa/InspectionForm.jsx"
import InspectionHistory from "./pages/qa/InspectionHistory.jsx"
import PendingInspections from "./pages/qa/PendingInspections.jsx"

//Verification pages...
import ScanQR from "./pages/verification/ScanQR.jsx"
import VerificationResult from "./pages/verification/VerificationResult.jsx"
import VerifyPortal from "./pages/verification/VerifyPortal.jsx"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layoutt/>}>
            {/* Basic Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Exporter Routes */}
            <Route element={<ProtectedRoute allowedRoles={['exporter']} />}>
              <Route path="/exporter/dashboard" element={<ExporterDashboard />} />
              <Route path="/exporter/submit-batch" element={<SubmitBatch />} />
              <Route path="/exporter/batches" element={<BatchList />} />
              <Route path="/exporter/certificate/:batchId" element={<ViewCertificate />} />
            </Route>
            

            {/* QA Routes */}
            <Route element={<ProtectedRoute allowedRoles={['qa']} />}>
              <Route path="/qa/dashboard" element={<QADashboard />} />
              <Route path="/qa/pending-inspections" element={<PendingInspections />} />
              <Route path="/qa/inspection/:batchId" element={<InspectionForm />} />
              <Route path="/qa/history" element={<InspectionHistory />} />
            </Route>
            

            {/* Verification Routes */}
            <Route path="/verify" element={<VerifyPortal />} />
            <Route path="/verify/scan" element={<ScanQR />} />
            <Route path="/verify/result/:certificateId" element={<VerificationResult />} />


            {/* Error Pages */}
            <Route path="/unauthorised" element={<Unauthorised />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layoutt from "./components/layout/Layoutt.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";

// // Common pages
// import Home from "./pages/Home.jsx";
// import About from "./pages/About.jsx";
// import Login from "./pages/Login.jsx";
// import Profile from "./pages/Profile.jsx";
// import Register from "./pages/Register.jsx";
// import NotFound from "./pages/NotFound.jsx";
// import Unauthorised from "./pages/Unauthorised.jsx";

// // Exporter pages
// import BatchList from "./pages/exporter/BatchList.jsx";
// import ExporterDashboard from "./pages/exporter/ExporterDashboard.jsx";
// import SubmitBatch from "./pages/exporter/SubmitBatch.jsx";
// import ViewCertificate from "./pages/exporter/ViewCertificate.jsx";

// // QA pages
// import QADashboard from "./pages/qa/QADashboard.jsx";
// import InspectionForm from "./pages/qa/InspectionForm.jsx";
// import InspectionHistory from "./pages/qa/InspectionHistory.jsx";
// import PendingInspections from "./pages/qa/PendingInspections.jsx";

// // Verification pages
// import ScanQR from "./pages/verification/ScanQR.jsx";
// import VerificationResult from "./pages/verification/VerificationResult.jsx";
// import VerifyPortal from "./pages/verification/VerifyPortal.jsx";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route element={<Layoutt />}>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected Exporter Routes */}
//           <Route element={<ProtectedRoute allowedRoles={['exporter']} />}>
//             <Route path="/exporter/dashboard" element={<ExporterDashboard />} />
//             <Route path="/exporter/submit-batch" element={<SubmitBatch />} />
//             <Route path="/exporter/batches" element={<BatchList />} />
//             <Route path="/exporter/certificate/:batchId" element={<ViewCertificate />} />
//           </Route>

//           {/* Protected QA Routes */}
//           <Route element={<ProtectedRoute allowedRoles={['qa']} />}>
//             <Route path="/qa/dashboard" element={<QADashboard />} />
//             <Route path="/qa/pending-inspections" element={<PendingInspections />} />
//             <Route path="/qa/inspection/:batchId" element={<InspectionForm />} />
//             <Route path="/qa/history" element={<InspectionHistory />} />
//           </Route>

//           {/* Protected Verifier Routes */}
//           <Route element={<ProtectedRoute allowedRoles={['verifier']} />}>
//             <Route path="/verify" element={<VerifyPortal />} />
//             <Route path="/verify/scan" element={<ScanQR />} />
//             <Route path="/verify/result/:certificateId" element={<VerificationResult />} />
//           </Route>

//           {/* Protected Profile (All roles) */}
//           <Route element={<ProtectedRoute allowedRoles={['exporter', 'qa', 'verifier']} />}>
//             <Route path="/profile" element={<Profile />} />
//           </Route>

//           {/* Error Pages */}
//           <Route path="/unauthorised" element={<Unauthorised />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;