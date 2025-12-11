import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Package,
  Shield,
  CheckCircle,
  QrCode,
  ArrowRight,
  Users,
  FileCheck,
  Globe,
  Leaf,
  Sparkles,
  Award,
  Zap,
  TrendingUp,
  Lock,
  Star,
  LayoutDashboard,
} from "lucide-react";
import authService from "../services/authService";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = authService.getStoredUser();
    setUser(storedUser);
    setIsLoading(false);

    console.log(
      "[Home] Auth check:",
      storedUser
        ? `Logged in as ${storedUser.email} (${storedUser.role})`
        : "Not logged in"
    );
  }, []);

  // Get dashboard path based on role
  const getDashboardPath = (role) => {
    const dashboardPaths = {
      EXPORTER: "/exporter/dashboard",
      QA_AGENCY: "/qa/dashboard",
      CUSTOMS_OFFICIAL: "/verify",
      ADMIN: "/admin/dashboard",
    };
    return dashboardPaths[role?.toUpperCase()] || "/";
  };

  // Handle "Go to Dashboard" click
  const handleDashboardClick = () => {
    if (user) {
      const path = getDashboardPath(user.role);
      console.log("[Home] Navigating to dashboard:", path);
      navigate(path);
    }
  };
  return (
    <div className="bg-slate-950">
      {/* Hero Section - Massive Impact */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/src/assets/agri4.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-emerald-950/90 to-slate-950/95"></div>

          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl"></div>

          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Main Content */}
            <div className="text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-8 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-300 text-sm font-medium">
                  Blockchain-Powered Certification
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Digital Trust for</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Global Agriculture
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-xl">
                Issue, verify, and manage quality certificates with cutting-edge
                blockchain technology and W3C standards.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                {user ? (
                  // Logged-in user buttons
                  <>
                    <button
                      onClick={handleDashboardClick}
                      className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
                    >
                      <LayoutDashboard className="mr-2 h-5 w-5" />
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <Link
                      to="/verify"
                      className="group px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center backdrop-blur-sm"
                    >
                      <QrCode className="mr-2 h-5 w-5" />
                      Verify Certificate
                    </Link>
                  </>
                ) : (
                  // Guest user buttons
                  <>
                    <Link
                      to="/register"
                      className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/verify"
                      className="group px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center backdrop-blur-sm"
                    >
                      <QrCode className="mr-2 h-5 w-5" />
                      Verify Certificate
                    </Link>
                  </>
                )}
              </div>

              {/* Welcome message for logged-in users */}
              {user && (
                <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl backdrop-blur-sm">
                  <p className="text-emerald-300 text-sm">
                    👋 Welcome back,{" "}
                    <span className="font-semibold text-white">
                      {user.fullName || user.email?.split("@")[0]}
                    </span>
                    !
                    <span className="ml-2 px-2 py-0.5 bg-emerald-500/30 rounded-full text-xs">
                      {user.role?.replace("_", " ")}
                    </span>
                  </p>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm">W3C Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm">Tamper-Proof</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm">Global Standard</span>
                </div>
              </div>
            </div>

            {/* Right - Stats Cards */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Main Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl">
                      <Leaf className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl">
                        AgriQCert
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Certification Platform
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-1">
                        10K+
                      </div>
                      <div className="text-slate-400 text-sm">
                        Certificates Issued
                      </div>
                    </div>
                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-bold text-teal-400 mb-1">
                        50+
                      </div>
                      <div className="text-slate-400 text-sm">Countries</div>
                    </div>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-1">
                        99.9%
                      </div>
                      <div className="text-slate-400 text-sm">Uptime</div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-bold text-green-400 mb-1">
                        &lt;2s
                      </div>
                      <div className="text-slate-400 text-sm">Verification</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full border-2 border-slate-800 flex items-center justify-center text-white text-xs font-bold">
                        A
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full border-2 border-slate-800 flex items-center justify-center text-white text-xs font-bold">
                        B
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-slate-800 flex items-center justify-center text-white text-xs font-bold">
                        C
                      </div>
                      <div className="w-8 h-8 bg-slate-700 rounded-full border-2 border-slate-800 flex items-center justify-center text-white text-xs">
                        +5K
                      </div>
                    </div>
                    <span className="text-slate-400">Trusted by thousands</span>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-bounce">
                  <Star className="h-4 w-4" />
                  #1 Rated
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section - Glass Cards */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">
                Powerful Features
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                AgriQCert
              </span>
              ?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Streamline your agricultural quality certification with
              cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:border-emerald-500/30 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Secure & Tamper-Proof
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Blockchain-backed verifiable credentials that cannot be
                  forged, altered, or duplicated. Your certificates are
                  cryptographically secured.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:border-teal-500/30 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Instant Verification
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Verify certificates in seconds using QR codes at customs and
                  borders. No waiting, no paperwork, just instant trust.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:border-cyan-500/30 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Global Standards
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Fully compliant with W3C Verifiable Credentials and OpenID4VP
                  international standards for maximum interoperability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline Style */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-teal-950/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-6">
              <TrendingUp className="h-4 w-4 text-teal-400" />
              <span className="text-teal-300 text-sm font-medium">
                Simple Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Three simple steps to digitize your quality certification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 text-center hover:border-emerald-500/30 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto text-3xl font-bold text-white shadow-lg shadow-emerald-500/30">
                    1
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Submit Batch
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Exporters upload product information and request quality
                  inspection through our intuitive dashboard.
                </p>
              </div>
              {/* Connector Line (hidden on mobile) */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"></div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 text-center hover:border-teal-500/30 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto text-3xl font-bold text-white shadow-lg shadow-teal-500/30">
                    2
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Quality Inspection
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Certified QA agencies conduct thorough inspections and record
                  detailed results digitally.
                </p>
              </div>
              {/* Connector Line (hidden on mobile) */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-teal-500 to-transparent"></div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 text-center hover:border-cyan-500/30 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto text-3xl font-bold text-white shadow-lg shadow-cyan-500/30">
                    3
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Get Certificate
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Receive verifiable digital certificate with QR code for
                  instant global verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section - Modern Cards */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950"></div>
        <div className="absolute top-1/2 left-0 w-1/2 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-1/2 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <Users className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">
                For Everyone
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Who Uses{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AgriQCert
              </span>
              ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Exporters */}
            <div className="group">
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 border border-emerald-500/20 rounded-3xl p-8 text-center hover:border-emerald-500/40 transition-all duration-300 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
                    <Package className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Exporters
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    Submit batches, track inspections, and receive verifiable
                    digital certificates for your products.
                  </p>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors group/link"
                  >
                    Register as Exporter
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* QA Agencies */}
            <div className="group">
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-900/50 to-blue-950/50 border border-blue-500/20 rounded-3xl p-8 text-center hover:border-blue-500/40 transition-all duration-300 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                    <FileCheck className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    QA Agencies
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    Conduct inspections and issue verifiable quality
                    certificates with our streamlined workflow.
                  </p>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors group/link"
                  >
                    Register as QA Agency
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Importers */}
            <div className="group">
              <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/50 to-purple-950/50 border border-purple-500/20 rounded-3xl p-8 text-center hover:border-purple-500/40 transition-all duration-300 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Importers & Customs
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    Instantly verify certificates using QR codes. No
                    registration needed for verification.
                  </p>
                  <Link
                    to="/verify"
                    className="inline-flex items-center gap-2 text-purple-400 font-semibold hover:text-purple-300 transition-colors group/link"
                  >
                    Verify Certificate
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Stunning Finish */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/src/assets/agri1.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-emerald-950/90 to-slate-950/95"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-8 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-white/80 text-sm font-medium">
              Join the Future of Certification
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Transform
            </span>{" "}
            Your Certification Process?
          </h2>

          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of exporters and QA agencies already using AgriQCert
            for secure, verifiable certifications.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="group px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="px-10 py-5 bg-white/10 border border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>

          {/* Bottom Trust Bar */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-slate-500 text-sm mb-4">
              Trusted by leading organizations worldwide
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-500" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-500" />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-emerald-500" />
                <span>50+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
