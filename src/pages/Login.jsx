import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Package, FileCheck, ScanLine } from 'lucide-react';
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'exporter'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // TODO: Replace with actual API call
//       // const response = await axios.post('/api/auth/login', formData);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       console.log('Login data:', formData);

//       // Store user data (in real app, this comes from backend)
//       const userData = {
//         email: formData.email,
//         role: formData.role,
//         name: 'John Doe', // This will come from backend
//         token: 'fake-jwt-token' // This will come from backend
//       };

//       // Store in localStorage
//       localStorage.setItem('user', JSON.stringify(userData));

//       // Redirect based on role
//       if (formData.role === 'exporter') {
//         navigate('/exporter/dashboard');
//       } else if (formData.role === 'qa') {
//         navigate('/qa/dashboard');
//       } else if (formData.role === 'verifier') {
//         navigate('/verify');
//       }

//     } catch (error) {
//       console.error('Login error:', error);
//       setErrors({ submit: 'Invalid credentials. Please try again.' });
//     } finally {
//       setIsLoading(false);
//     }
//   };
    // Handle form submission
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    setIsLoading(true);

    try {
        // TODO: Replace with actual API call
        // const response = await axios.post('/api/auth/login', formData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Login data:', formData);

        // Store user data (in real app, this comes from backend)
        const userData = {
        name: 'John Doe', // This will come from backend
        email: formData.email,
        role: formData.role,
        token: 'fake-jwt-token' // This will come from backend
        };

        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // Toast success notification
        toast.success('Login successful!');

        // Redirect based on role
        if (formData.role === 'exporter') {
        navigate('/exporter/dashboard');
        } else if (formData.role === 'qa') {
        navigate('/qa/dashboard');
        } else if (formData.role === 'verifier') {
        navigate('/verify');
        }

    } catch (error) {
        console.error('Login error:', error);
        setErrors({ submit: 'Invalid credentials. Please try again.' });
        toast.error('Login failed!');
    } finally {
        setIsLoading(false);
    }
    };

  // Demo credentials info
  const demoCredentials = {
    exporter: { email: 'exporter@demo.com', password: 'demo123' },
    qa: { email: 'qa@demo.com', password: 'demo123' },
    verifier: { email: 'verifier@demo.com', password: 'demo123' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side - Info Section */}
        <div className="hidden lg:flex flex-col justify-center text-white bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-8 shadow-xl">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-10 w-10" />
              <span className="font-bold text-3xl">AgriQCert</span>
            </div>
            <p className="text-green-100 text-lg">
              Secure digital certification for agricultural imports and exports
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="bg-green-500 rounded-full p-2 mt-1">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">For Exporters</h3>
                <p className="text-green-100 text-sm">
                  Submit batches, track inspections, and receive digital certificates
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-500 rounded-full p-2 mt-1">
                <FileCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">For QA Agencies</h3>
                <p className="text-green-100 text-sm">
                  Conduct inspections and issue verifiable quality certificates
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-500 rounded-full p-2 mt-1">
                <ScanLine className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">For Verifiers</h3>
                <p className="text-green-100 text-sm">
                  Instantly verify certificates using QR codes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Login to access your AgriQCert dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Login As
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'exporter' }))}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    formData.role === 'exporter'
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Package className="h-6 w-6 mx-auto mb-1 text-green-600" />
                  <span className="text-xs font-semibold block">Exporter</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'qa' }))}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    formData.role === 'qa'
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FileCheck className="h-6 w-6 mx-auto mb-1 text-green-600" />
                  <span className="text-xs font-semibold block">QA Agency</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'verifier' }))}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    formData.role === 'verifier'
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <ScanLine className="h-6 w-6 mx-auto mb-1 text-green-600" />
                  <span className="text-xs font-semibold block">Verifier</span>
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors flex items-center justify-center ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</p>
            <div className="text-xs text-blue-800 space-y-1">
              <p><strong>Exporter:</strong> {demoCredentials.exporter.email} / {demoCredentials.exporter.password}</p>
              <p><strong>QA:</strong> {demoCredentials.qa.email} / {demoCredentials.qa.password}</p>
              <p><strong>Verifier:</strong> {demoCredentials.verifier.email} / {demoCredentials.verifier.password}</p>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 font-semibold hover:text-green-700">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;