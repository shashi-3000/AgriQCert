import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Package,
  FileCheck,
  ScanLine,
  Leaf,
  Shield,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import authService from "../services/authService";
import { handleApiError } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in and redirect
  useEffect(() => {
    const user = authService.getStoredUser();
    if (user && authService.isAuthenticated()) {
      console.log("[Login] User already logged in, redirecting to dashboard");
      const redirectPath = getRedirectPath(user.role);
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  // Get redirect path based on user role
  const getRedirectPath = (role) => {
    const roleUpper = role?.toUpperCase();
    switch (roleUpper) {
      case "EXPORTER":
        return "/exporter/dashboard";
      case "QA_AGENCY":
        return "/qa/dashboard";
      case "CUSTOMS_OFFICIAL":
        return "/verify";
      case "ADMIN":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call the actual login API
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      // Success notification
      toast.success("Login successful!");

      // Redirect based on role from response
      const redirectPath = getRedirectPath(response.user?.role);
      navigate(redirectPath);
    } catch (error) {
      console.error("Login error:", error);

      // Handle specific error cases
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 401) {
        setErrors({ submit: "Invalid email or password. Please try again." });
        toast.error("Invalid credentials");
      } else if (status === 400) {
        // Validation errors from backend
        const apiErrors = error.response?.data?.errors;
        if (apiErrors?.length > 0) {
          const fieldErrors = {};
          apiErrors.forEach((err) => {
            fieldErrors[err.field] = err.message;
          });
          setErrors(fieldErrors);
        } else {
          setErrors({
            submit: message || "Invalid request. Please check your input.",
          });
        }
        toast.error(message || "Login failed");
      } else {
        setErrors({
          submit: message || "An error occurred. Please try again.",
        });
        handleApiError(error, toast);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Info Section */}
        <div className="hidden lg:flex flex-col justify-center">
          <div className="mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-2xl">
                <Leaf className="h-10 w-10 text-white" />
              </div>
              <span className="font-bold text-4xl text-white">AgriQCert</span>
            </div>
            <p className="text-emerald-200 text-xl leading-relaxed">
              Secure digital certification for agricultural imports and exports
              worldwide
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: Package,
                title: "For Exporters",
                desc: "Submit batches, track inspections, and receive digital certificates",
              },
              {
                icon: FileCheck,
                title: "For QA Agencies",
                desc: "Conduct inspections and issue verifiable quality credentials",
              },
              {
                icon: ScanLine,
                title: "For Customs Officials",
                desc: "Instantly verify certificates using QR codes at checkpoints",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
              >
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-3 shadow-lg">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-emerald-200/80 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-emerald-300">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Blockchain Secured</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">W3C Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-xl">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <span className="font-bold text-2xl text-gray-900">AgriQCert</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Login to access your AgriQCert dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                    errors.email
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                    errors.password
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center shadow-lg ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/25"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
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

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                New to AgriQCert?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center w-full py-3.5 px-4 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
