import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Package, FileCheck, ScanLine, ChevronDown, Home, Info, Shield } from 'lucide-react';
import authService from '../../services/authService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in (from localStorage)
  useEffect(() => {
    const userData = authService.getStoredUser();
    setUser(userData);
  }, [location]);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Get role display name
  const getRoleDisplayName = (role) => {
    const roleMap = {
      'EXPORTER': '📦 Exporter',
      'QA_AGENCY': '✓ QA Agency',
      'CUSTOMS_OFFICIAL': '🔍 Customs Official',
      'ADMIN': '⚙️ Admin'
    };
    return roleMap[role?.toUpperCase()] || role;
  };

  // Get role badge color
  const getRoleBadgeClass = (role) => {
    const colorMap = {
      'EXPORTER': 'bg-blue-100 text-blue-800',
      'QA_AGENCY': 'bg-purple-100 text-purple-800',
      'CUSTOMS_OFFICIAL': 'bg-emerald-100 text-emerald-800',
      'ADMIN': 'bg-red-100 text-red-800'
    };
    return colorMap[role?.toUpperCase()] || 'bg-gray-100 text-gray-800';
  };

  // Navigation based on authentication and role
  const getNavLinks = () => {
    if (!user) {
      // Guest navigation with icons
      return [
        { name: 'Home', path: '/', icon: Home },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Verify Certificate', path: '/verify', icon: Shield }
      ];
    }

    // Logged in navigation based on role (using uppercase role names)
    const roleNavigation = {
      EXPORTER: [
        { name: 'Dashboard', path: '/exporter/dashboard', icon: Package },
        { name: 'Submit Batch', path: '/exporter/submit-batch', icon: FileCheck },
        { name: 'My Batches', path: '/exporter/batches', icon: Package }
      ],
      QA_AGENCY: [
        { name: 'Dashboard', path: '/qa/dashboard', icon: FileCheck },
        { name: 'Pending Inspections', path: '/qa/pending-inspections', icon: ScanLine },
        { name: 'History', path: '/qa/history', icon: Package }
      ],
      CUSTOMS_OFFICIAL: [
        { name: 'Verify Portal', path: '/verify', icon: Shield },
        { name: 'Scan QR', path: '/verify/scan', icon: ScanLine }
      ],
      ADMIN: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: Package },
        { name: 'All Batches', path: '/admin/batches', icon: Package },
        { name: 'Verify', path: '/verify', icon: Shield }
      ]
    };

    return roleNavigation[user.role?.toUpperCase()] || [];
  };

  const navLinks = getNavLinks();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo - Left */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <div className="bg-emerald-800 p-2 rounded-lg">
              <Package className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl">AgriQCert</span>
          </Link>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActivePath(link.path)
                      ? 'bg-emerald-800 shadow-lg font-semibold'
                      : 'hover:bg-emerald-700/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons or User Menu - Right */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-emerald-700/50 transition-all"
                >
                  <div className="bg-emerald-900 p-1.5 rounded-full">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{user.name || user.email?.split('@')[0]}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0" 
                      onClick={() => setIsDropdownOpen(false)}
                    ></div>
                    
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 text-gray-700 border border-gray-100">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.fullName || user.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">{user.email}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${getRoleBadgeClass(user.role)}`}>
                          {getRoleDisplayName(user.role)}
                        </span>
                      </div>
                      <Link
                        to="/profile"
                        className=" px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 text-gray-600" />
                        <span>My Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center space-x-2 text-red-600 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-5 py-2 hover:bg-emerald-700/50 rounded-lg transition-all font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-white text-emerald-900 rounded-lg font-semibold hover:bg-emerald-50 transition-all shadow-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-emerald-700/50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-emerald-900 border-t border-emerald-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActivePath(link.path)
                      ? 'bg-emerald-600 font-semibold'
                      : 'hover:bg-emerald-700/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {user ? (
              <>
                <div className="px-3 py-3 border-t border-emerald-700 mt-2 pt-3">
                  <p className="text-sm font-semibold">{user.fullName || user.name || user.email?.split('@')[0]}</p>
                  <p className="text-xs text-emerald-300">{user.email}</p>
                  <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeClass(user.role)}`}>
                    {getRoleDisplayName(user.role)}
                  </span>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-emerald-700/50 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-emerald-700/50 transition-colors text-red-300"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="space-y-2 border-t border-emerald-700 mt-2 pt-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-700/50 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 bg-white text-emerald-900 rounded-lg font-semibold hover:bg-emerald-50 transition-colors text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
