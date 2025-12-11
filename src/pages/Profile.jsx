// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { 
  User, Building, Mail, Phone, MapPin, Shield, Calendar, Edit2, Save, X, 
  Loader2, RefreshCw, AlertCircle, LogOut, Key, CheckCircle
} from "lucide-react";
import { authService } from "../services";

const profileSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  companyName: yup.string().nullable(),
  phoneNumber: yup.string().nullable(),
  companyAddress: yup.string().nullable()
}).required();

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(profileSchema)
  });

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First check localStorage
      const storedUser = authService.getStoredUser();
      if (storedUser) {
        setUser(storedUser);
        reset({
          fullName: storedUser.fullName || '',
          companyName: storedUser.companyName || '',
          phoneNumber: storedUser.phoneNumber || '',
          companyAddress: storedUser.companyAddress || ''
        });
      }
      
      // Then try to get fresh data from API
      try {
        const freshUser = await authService.getCurrentUser();
        if (freshUser) {
          setUser(freshUser);
          reset({
            fullName: freshUser.fullName || '',
            companyName: freshUser.companyName || '',
            phoneNumber: freshUser.phoneNumber || '',
            companyAddress: freshUser.companyAddress || ''
          });
        }
      } catch (apiErr) {
        console.log('Could not fetch fresh user data:', apiErr);
        // Continue with stored user data
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      // Note: Profile update API endpoint would be needed
      // For now, update localStorage
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    reset({
      fullName: user?.fullName || '',
      companyName: user?.companyName || '',
      phoneNumber: user?.phoneNumber || '',
      companyAddress: user?.companyAddress || ''
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    authService.logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const getRoleDisplayName = (role) => {
    const roleMap = {
      'EXPORTER': 'Exporter',
      'QA_AGENCY': 'QA Agency',
      'CUSTOMS_OFFICIAL': 'Customs Official',
      'ADMIN': 'Administrator'
    };
    return roleMap[role] || role;
  };

  const getRoleBadgeColor = (role) => {
    const colorMap = {
      'EXPORTER': 'bg-blue-100 text-blue-800',
      'QA_AGENCY': 'bg-green-100 text-green-800',
      'CUSTOMS_OFFICIAL': 'bg-purple-100 text-purple-800',
      'ADMIN': 'bg-red-100 text-red-800'
    };
    return colorMap[role] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-green-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-800 mb-2">Failed to Load Profile</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={fetchUserProfile} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <RefreshCw className="h-4 w-4" /> Retry
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">Not Logged In</h2>
          <p className="text-yellow-600 mb-6">Please log in to view your profile.</p>
          <button 
            onClick={() => navigate('/login')} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>
        <button 
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Avatar Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-10 text-center">
              <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-green-600 text-3xl font-bold shadow-lg">
                {user.fullName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <h2 className="text-xl font-bold text-white mt-4">{user.fullName || 'User'}</h2>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getRoleBadgeColor(user.role)}`}>
                <Shield className="h-3 w-3 mr-1" />
                {getRoleDisplayName(user.role)}
              </span>
            </div>

            {/* Quick Info */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-sm">{user.email}</span>
              </div>
              {user.companyName && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Building className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">{user.companyName}</span>
                </div>
              )}
              {user.phoneNumber && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">{user.phoneNumber}</span>
                </div>
              )}
              {user.licenseNumber && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Key className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">License: {user.licenseNumber}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-sm">
                  Joined {user.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString() 
                    : 'Recently'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Profile Details</h3>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-green-600 border border-green-200 rounded-lg hover:bg-green-50"
                >
                  <Edit2 className="h-4 w-4" /> Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <X className="h-4 w-4" /> Cancel
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    {...register("fullName")}
                    disabled={!isEditing}
                    className={`block w-full pl-10 pr-4 py-2.5 border rounded-lg ${
                      errors.fullName ? 'border-red-500' : 'border-gray-200'
                    } ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    {...register("companyName")}
                    disabled={!isEditing}
                    className={`block w-full pl-10 pr-4 py-2.5 border rounded-lg border-gray-200 ${
                      !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    {...register("phoneNumber")}
                    disabled={!isEditing}
                    className={`block w-full pl-10 pr-4 py-2.5 border rounded-lg border-gray-200 ${
                      !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* Company Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    {...register("companyAddress")}
                    disabled={!isEditing}
                    rows="2"
                    className={`block w-full pl-10 pr-4 py-2.5 border rounded-lg border-gray-200 ${
                      !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    placeholder="Enter company address"
                  />
                </div>
              </div>

              {/* License Number (Read-only) */}
              {user.licenseNumber && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={user.licenseNumber}
                      disabled
                      className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">License number cannot be changed</p>
                </div>
              )}

              {/* Save Button */}
              {isEditing && (
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSaving || !isDirty}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Account Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Account Active</span>
              <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}