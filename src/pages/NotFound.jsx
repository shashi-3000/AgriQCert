import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, MapPin } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Background Elements */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          {/* 404 Number */}
          <div className="relative">
            <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 leading-none">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <MapPin className="h-16 w-16 md:h-20 md:w-20 text-emerald-400/50 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-400 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off into the fields. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all border border-slate-700"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <p className="text-slate-500 mb-4">Popular destinations</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/verify" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Verify Certificate
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Login
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/register" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Register
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/about" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;