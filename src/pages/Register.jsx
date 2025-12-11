// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { User, Mail, Lock, Phone, Building, MapPin, ArrowRight, Eye, EyeOff } from 'lucide-react';

// const Register = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     role: 'exporter',
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     organization: '',
//     address: '',
//     city: '',
//     country: '',
//     licenseNumber: '' // For QA agencies
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     }

//     if (!formData.organization.trim()) {
//       newErrors.organization = 'Organization name is required';
//     }

//     if (formData.role === 'qa' && !formData.licenseNumber.trim()) {
//       newErrors.licenseNumber = 'License number is required for QA agencies';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // TODO: Replace with actual API call
//       // const response = await axios.post('/api/auth/register', formData);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       console.log('Registration data:', formData);

//       // Show success message (you can add a toast notification here)
//       alert('Registration successful! Please login.');

//       // Redirect to login page
//       navigate('/login');

//     } catch (error) {
//       console.error('Registration error:', error);
//       setErrors({ submit: 'Registration failed. Please try again.' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             Create Your Account
//           </h2>
//           <p className="text-gray-600">
//             Join AgriQCert and start digitizing your agricultural certifications
//           </p>
//         </div>

//         {/* Registration Form */}
//         <div className="bg-white rounded-lg shadow-xl p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             {/* Role Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Register As
//               </label>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setFormData(prev => ({ ...prev, role: 'exporter' }))}
//                   className={`p-4 border-2 rounded-lg transition-all ${
//                     formData.role === 'exporter'
//                       ? 'border-green-600 bg-green-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="text-center">
//                     <Building className="h-8 w-8 mx-auto mb-2 text-green-600" />
//                     <span className="font-semibold">Exporter</span>
//                   </div>
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => setFormData(prev => ({ ...prev, role: 'qa' }))}
//                   className={`p-4 border-2 rounded-lg transition-all ${
//                     formData.role === 'qa'
//                       ? 'border-green-600 bg-green-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="text-center">
//                     <User className="h-8 w-8 mx-auto mb-2 text-green-600" />
//                     <span className="font-semibold">QA Agency</span>
//                   </div>
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => setFormData(prev => ({ ...prev, role: 'verifier' }))}
//                   className={`p-4 border-2 rounded-lg transition-all ${
//                     formData.role === 'verifier'
//                       ? 'border-green-600 bg-green-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="text-center">
//                     <User className="h-8 w-8 mx-auto mb-2 text-green-600" />
//                     <span className="font-semibold">Verifier</span>
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Full Name */}
//             <div>
//               <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   id="fullName"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
//                     errors.fullName ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="John Doe"
//                 />
//               </div>
//               {errors.fullName && (
//                 <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
//                     errors.email ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="john@example.com"
//                 />
//               </div>
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             {/* Phone */}
//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
//                     errors.phone ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="+1 (555) 123-4567"
//                 />
//               </div>
//               {errors.phone && (
//                 <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
//               )}
//             </div>

//             {/* Organization */}
//             <div>
//               <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
//                 Organization Name
//               </label>
//               <div className="relative">
//                 <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   id="organization"
//                   name="organization"
//                   value={formData.organization}
//                   onChange={handleChange}
//                   className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
//                     errors.organization ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Your Company Name"
//                 />
//               </div>
//               {errors.organization && (
//                 <p className="mt-1 text-sm text-red-600">{errors.organization}</p>
//               )}
//             </div>

//             {/* License Number (Only for QA) */}
//             {formData.role === 'qa' && (
//               <div>
//                 <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
//                   QA License Number
//                 </label>
//                 <input
//                   type="text"
//                   id="licenseNumber"
//                   name="licenseNumber"
//                   value={formData.licenseNumber}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
//                     errors.licenseNumber ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="QA-12345"
//                 />
//                 {errors.licenseNumber && (
//                   <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
//                 )}
//               </div>
//             )}

//             {/* Address Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="New York"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
//                   Country
//                 </label>
//                 <input
//                   type="text"
//                   id="country"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="United States"
//                 />
//               </div>
//             </div>

//             {/* Address */}
//             <div>
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
//                 Address
//               </label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <textarea
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   rows="2"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="123 Main Street, Suite 100"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
//                     errors.password ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
//                     errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
//               )}
//             </div>

//             {/* Submit Error */}
//             {errors.submit && (
//               <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-sm text-red-600">{errors.submit}</p>
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors flex items-center justify-center ${
//                 isLoading
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-green-600 hover:bg-green-700'
//               }`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                   Creating Account...
//                 </>
//               ) : (
//                 <>
//                   Create Account
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Login Link */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="text-green-600 font-semibold hover:text-green-700">
//                 Login here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;














// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, Building, MapPin, ArrowRight, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    role: "exporter",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    organization: "",
    address: "",
    city: "",
    country: "",
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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.organization.trim()) {
      newErrors.organization = "Organization name is required";
    }

    if (formData.role === "qa" && !formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "License number is required for QA agencies";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // NEW handleSubmit: auto-login + toast + consistent user shape
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call (replace with axios.post for real backend)
      await new Promise(resolve => setTimeout(resolve, 900));

      // Build the app-wide user object (use `name` to match other parts)
      const userData = {
        name: formData.fullName || "User",
        email: formData.email,
        role: formData.role,    // exporter | qa | verifier
        token: "fake-jwt-token" // replace with real token from server later
      };

      // Save user to localStorage (auto-login for demo)
      localStorage.setItem("user", JSON.stringify(userData));

      // Toast success (react-hot-toast). If lib not installed, this fails silently in dev
      try {
        toast.success("Registration successful — welcome!");
      } catch {}

      // Redirect by role
      if (formData.role === "exporter") navigate("/exporter/dashboard");
      else if (formData.role === "qa") navigate("/qa/dashboard");
      else navigate("/verify");

    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "Registration failed. Please try again." });
      try { toast.error("Registration failed. Try again."); } catch {}
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">
            Join AgriQCert and start digitizing your agricultural certifications
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Register As</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: "exporter" }))}
                  className={`p-4 border-2 rounded-lg transition-all ${formData.role === "exporter" ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="text-center">
                    <Building className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <span className="font-semibold">Exporter</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: "qa" }))}
                  className={`p-4 border-2 rounded-lg transition-all ${formData.role === "qa" ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="text-center">
                    <User className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <span className="font-semibold">QA Agency</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: "verifier" }))}
                  className={`p-4 border-2 rounded-lg transition-all ${formData.role === "verifier" ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="text-center">
                    <User className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <span className="font-semibold">Verifier</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Organization */}
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.organization ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Your Company Name"
                />
              </div>
              {errors.organization && <p className="mt-1 text-sm text-red-600">{errors.organization}</p>}
            </div>

            {/* QA license (conditional) */}
            {formData.role === "qa" && (
              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">QA License Number</label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.licenseNumber ? "border-red-500" : "border-gray-300"}`}
                  placeholder="QA-12345"
                />
                {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
              </div>
            )}

            {/* Address fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="New York"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="United States"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="123 Main Street, Suite 100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.password ? "border-red-500" : "border-gray-300"}`}
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
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
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
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors flex items-center justify-center ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
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
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 font-semibold hover:text-green-700">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
