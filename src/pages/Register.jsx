// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, Building, MapPin, ArrowRight, Eye, EyeOff, Shield, Leaf, Truck, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import authService from '../services/authService';
import { handleApiError } from '../utils/api';

// User roles as per backend
const USER_ROLES = [
  { value: 'EXPORTER', label: 'Exporter', icon: Truck, description: 'Submit batches for quality certification', color: 'emerald' },
  { value: 'QA_AGENCY', label: 'QA Agency', icon: Shield, description: 'Inspect batches and issue credentials', color: 'blue' },
  { value: 'CUSTOMS_OFFICIAL', label: 'Customs Official', icon: CheckCircle, description: 'Verify certificates at checkpoints', color: 'purple' },
];

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    role: "EXPORTER",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    companyName: "",
    companyAddress: "",
    licenseNumber: "" // For QA agencies
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
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.role === "QA_AGENCY" && !formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "License number is required for QA agencies";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Get redirect path based on role
  const getRedirectPath = (role) => {
    switch (role) {
      case 'EXPORTER':
        return '/exporter/dashboard';
      case 'QA_AGENCY':
        return '/qa/dashboard';
      case 'CUSTOMS_OFFICIAL':
        return '/verify';
      case 'ADMIN':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  // Handle form submission with real API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Build registration payload matching backend API
      const registrationData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
        companyName: formData.companyName || undefined,
        phoneNumber: formData.phoneNumber || undefined,
        companyAddress: formData.companyAddress || undefined,
        licenseNumber: formData.role === 'QA_AGENCY' ? formData.licenseNumber : undefined,
      };

      // Call the actual registration API
      const response = await authService.register(registrationData);

      toast.success("Registration successful — welcome!");

      // Redirect based on role
      const redirectPath = getRedirectPath(response.user?.role || formData.role);
      navigate(redirectPath);

    } catch (error) {
      console.error("Registration error:", error);
      
      const status = error.response?.status;
      const message = error.response?.data?.message;
      
      if (status === 409) {
        setErrors({ email: 'An account with this email already exists' });
        toast.error('Email already registered');
      } else if (status === 400) {
        const apiErrors = error.response?.data?.errors;
        if (apiErrors?.length > 0) {
          const fieldErrors = {};
          apiErrors.forEach(err => {
            fieldErrors[err.field] = err.message;
          });
          setErrors(fieldErrors);
        } else {
          setErrors({ submit: message || 'Invalid registration data' });
        }
        toast.error(message || 'Registration failed');
      } else {
        setErrors({ submit: message || 'Registration failed. Please try again.' });
        handleApiError(error, toast);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-xl">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <span className="font-bold text-3xl text-white">AgriQCert</span>
          </Link>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Create Your Account
          </h2>
          <p className="text-emerald-200/80 text-lg">
            Join thousands of exporters and agencies on AgriQCert
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">I want to register as</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {USER_ROLES.map((roleOption) => {
                  const Icon = roleOption.icon;
                  const isSelected = formData.role === roleOption.value;
                  const colorClasses = {
                    emerald: { selected: 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20', icon: 'text-emerald-600', iconBg: 'bg-emerald-100' },
                    blue: { selected: 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20', icon: 'text-blue-600', iconBg: 'bg-blue-100' },
                    purple: { selected: 'border-purple-500 bg-purple-50 ring-2 ring-purple-500/20', icon: 'text-purple-600', iconBg: 'bg-purple-100' }
                  };
                  const colors = colorClasses[roleOption.color];
                  
                  return (
                    <button
                      key={roleOption.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: roleOption.value }))}
                      className={`relative p-5 border-2 rounded-2xl transition-all duration-200 ${
                        isSelected 
                          ? colors.selected
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle className={`h-5 w-5 ${colors.icon}`} />
                        </div>
                      )}
                      <div className="text-center">
                        <div className={`${colors.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                          <Icon className={`h-7 w-7 ${colors.icon}`} />
                        </div>
                        <span className="font-semibold text-gray-900 block">{roleOption.label}</span>
                        <span className="text-xs text-gray-500 block mt-1">{roleOption.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-gray-500 text-sm">Account Details</span>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${errors.fullName ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-gray-300 transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">Company/Organization Name</label>
              <div className="relative">
                <Building className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-gray-300 transition-all"
                  placeholder="Your Company Name"
                />
              </div>
            </div>

            {/* QA license (conditional) */}
            {formData.role === "QA_AGENCY" && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-blue-900 mb-2">
                  QA License Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.licenseNumber ? "border-red-400 bg-red-50" : "border-blue-200 hover:border-blue-300 bg-white"}`}
                  placeholder="QA-12345"
                />
                {errors.licenseNumber && <p className="mt-2 text-sm text-red-600">{errors.licenseNumber}</p>}
                <p className="text-xs text-blue-600 mt-2">Required for QA Agency registration verification</p>
              </div>
            )}

            {/* Company Address */}
            <div>
              <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <textarea
                  id="companyAddress"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  rows="2"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-gray-300 transition-all"
                  placeholder="123 Main Street, City, Country"
                />
              </div>
            </div>

            {/* Password Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
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
              className={`w-full py-4 px-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center shadow-lg ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/25"}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-600 font-semibold hover:text-emerald-700">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
