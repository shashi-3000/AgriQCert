import { Link } from 'react-router-dom';
import { Package, Shield, CheckCircle, QrCode, ArrowRight, Users, FileCheck, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-r from-emerald-800 to-emerald-950 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/src/assets/agri4.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-950/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              Digital Certification for 
            </h1>
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              <div className='text-slate-100'>Agricultural Trade</div>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-200">
              Secure, Verifiable, and Transparent Quality Certificates
            </p>
            <div className='p-5'></div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-emerald-800 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/verify"
                className="px-8 py-3 bg-emerald-800 border-2 border-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center justify-center"
              >
                Verify Certificate
                <QrCode className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='bg-gradient-to-tr from-pink-100 via-yellow-100 to-emerald-500'>

        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose AgriQCert?
                </h2>
                <p className="text-xl text-gray-600">
                Streamline your agricultural quality certification process
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-emerald-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Tamper-Proof</h3>
                <p className="text-gray-600">
                    Blockchain-backed verifiable credentials that cannot be forged or altered
                </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-emerald-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Verification</h3>
                <p className="text-gray-600">
                    Verify certificates in seconds using QR codes at customs and borders
                </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-emerald-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Global Standards</h3>
                <p className="text-gray-600">
                    Compliant with W3C and OpenID4VP international standards
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* How It Works Section with Background */}
        <section className="  py-16 overflow-hidden ">
            {/* Background Image with Light Overlay */}
            

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 ">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
                </h2>
                <p className="text-xl text-gray-600">
                Simple three-step process for quality certification
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-lg">
                <div className="bg-emerald-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    1
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Product Details</h3>
                <p className="text-gray-600">
                    Exporters upload product information and request quality inspection
                </p>
                </div>

                {/* Step 2 */}
                <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-lg">
                <div className="bg-emerald-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    2
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Inspection</h3>
                <p className="text-gray-600">
                    Certified QA agencies conduct inspections and record results
                </p>
                </div>

                {/* Step 3 */}
                <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-lg">
                <div className="bg-emerald-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    3
                </div>
                <h3 className="text-xl font-semibold mb-2">Digital Certificate</h3>
                <p className="text-gray-600">
                    Receive verifiable digital certificate with QR code for instant verification
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* User Roles Section */}
        <section className="py-16 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Who Uses AgriQCert?
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Exporters */}
                <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                <Package className="h-16 w-16 text-emerald-800 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3">Exporters</h3>
                <p className="text-gray-600 mb-4">
                    Submit batches, track inspections, and receive digital certificates
                </p>
                <Link
                    to="/register"
                    className="text-emerald-800 font-semibold hover:text-emerald-900 inline-flex items-center"
                >
                    Register as Exporter
                    <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
                </div>

                {/* QA Agencies */}
                <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                <FileCheck className="h-16 w-16 text-emerald-800 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3">QA Agencies</h3>
                <p className="text-gray-600 mb-4">
                    Conduct inspections and issue verifiable quality certificates
                </p>
                <Link
                    to="/register"
                    className="text-emerald-800 font-semibold hover:text-emerald-900 inline-flex items-center"
                >
                    Register as QA Agency
                    <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
                </div>

                {/* Importers */}
                <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                <Users className="h-16 w-16 text-emerald-800 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3">Importers & Customs</h3>
                <p className="text-gray-600 mb-4">
                    Instantly verify certificates using QR codes
                </p>
                <Link
                    to="/verify"
                    className="text-emerald-800 font-semibold hover:text-emerald-900 inline-flex items-center"
                >
                    Verify Certificate
                    <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
                </div>
            </div>
            </div>
        </section>

      </section>

      {/* CTA Section with Background */}
      <section className="relative bg-emerald-800 text-white py-16 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/src/assets/agri1.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-slate-950/85"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-6xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join thousands of exporters and QA agencies using AgriQCert
          </p>
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-emerald-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Create Your Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
