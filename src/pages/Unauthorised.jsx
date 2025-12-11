import { Link, useNavigate } from 'react-router-dom';
import { ShieldX, Home, LogIn, ArrowLeft, Lock, AlertTriangle } from 'lucide-react';

const Unauthorised = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        {/* Icon Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-red-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-red-500 to-orange-500 p-6 rounded-3xl shadow-xl">
              <ShieldX className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Access Denied
            </h1>
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-100 rounded-xl mb-6">
              <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Unauthorized Access</h3>
                <p className="text-red-600 text-sm">
                  You don't have permission to access this page. This could be because:
                </p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'You need to log in to access this resource',
                'Your account doesn\'t have the required role',
                'Your session may have expired',
                'The page requires special permissions'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600">
                  <div className="bg-orange-100 p-1 rounded-full">
                    <Lock className="h-4 w-4 text-orange-600" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
              >
                <LogIn className="h-5 w-5" />
                Login to Continue
              </Link>
              
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center">
            <p className="text-gray-500 text-sm">
              Need help? Contact{' '}
              <a href="mailto:support@agriqcert.com" className="text-emerald-600 hover:underline">
                support@agriqcert.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorised;