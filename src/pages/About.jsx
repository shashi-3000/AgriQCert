import { Link } from 'react-router-dom';
import { 
  Package, Shield, Users, Globe, Award, ArrowRight, CheckCircle, 
  Leaf, QrCode, FileCheck, Zap, Lock, BarChart3, Building2, Truck
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Tamper-Proof',
      description: 'Blockchain-backed verifiable credentials ensure data integrity and authenticity that cannot be forged.'
    },
    {
      icon: Globe,
      title: 'Global Standards',
      description: 'Compliant with W3C and OpenID4VP international standards for seamless interoperability.'
    },
    {
      icon: Users,
      title: 'Multi-Stakeholder',
      description: 'Connects exporters, QA agencies, customs officials, and importers in one seamless ecosystem.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Certified QA agencies conduct thorough inspections meeting international requirements.'
    },
    {
      icon: Zap,
      title: 'Instant Verification',
      description: 'Verify any certificate in seconds using QR codes at customs and border checkpoints.'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Selective disclosure allows sharing only necessary information while protecting sensitive data.'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Certificates Issued', icon: FileCheck },
    { value: '50+', label: 'Countries Served', icon: Globe },
    { value: '500+', label: 'Active Exporters', icon: Truck },
    { value: '99.9%', label: 'Uptime Guarantee', icon: BarChart3 }
  ];

  const stakeholders = [
    {
      icon: Truck,
      title: 'Exporters',
      description: 'Submit batches, track inspections, and receive digital certificates with QR codes for seamless customs clearance.',
      color: 'emerald'
    },
    {
      icon: CheckCircle,
      title: 'QA Agencies',
      description: 'Conduct inspections, record results, and issue verifiable credentials backed by blockchain technology.',
      color: 'blue'
    },
    {
      icon: Building2,
      title: 'Customs Officials',
      description: 'Instantly verify certificate authenticity using QR codes, reducing fraud and processing time.',
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Importers',
      description: 'Trust the quality of imported goods with tamper-proof certificates and complete traceability.',
      color: 'orange'
    }
  ];

  const timeline = [
    {
      step: 1,
      title: 'Batch Submission',
      description: 'Exporters register and submit product batches with all required documentation and details.',
      icon: Package
    },
    {
      step: 2,
      title: 'Quality Inspection',
      description: 'Certified QA agencies conduct thorough inspections based on international standards.',
      icon: CheckCircle
    },
    {
      step: 3,
      title: 'Credential Issuance',
      description: 'Upon passing inspection, verifiable credentials with QR codes are automatically generated.',
      icon: FileCheck
    },
    {
      step: 4,
      title: 'Global Verification',
      description: 'Anyone can instantly verify certificates at customs, ports, or anywhere using QR scan.',
      icon: QrCode
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-800 to-emerald-950 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/src/assets/agri4.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/50 to-emerald-950/90" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-700/50 backdrop-blur px-4 py-2 rounded-full mb-6">
              <Leaf className="h-5 w-5 text-emerald-300" />
              <span className="text-emerald-200 text-sm font-medium">Transforming Agricultural Trade</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-emerald-400">AgriQCert</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto mb-8">
              Building trust in global agricultural trade through secure, verifiable digital credentials and blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-emerald-800 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/verify"
                className="px-8 py-3 bg-emerald-700 border-2 border-emerald-500 rounded-lg font-semibold hover:bg-emerald-600 transition-colors inline-flex items-center justify-center"
              >
                <QrCode className="mr-2 h-5 w-5" /> Verify Certificate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-emerald-100 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-7 w-7 text-emerald-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Our Mission</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
                Revolutionizing Agricultural Certification
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                AgriQCert is dedicated to transforming the agricultural import-export certification process by leveraging cutting-edge blockchain technology and W3C verifiable credentials.
              </p>
              <p className="text-gray-600 text-lg mb-8">
                We aim to eliminate fraud, reduce processing times, and build trust between all stakeholders in the global agricultural trade ecosystem.
              </p>
              
              <div className="space-y-4">
                {['Eliminate certificate fraud and forgery', 'Reduce customs processing time by 70%', 'Enable instant global verification', 'Ensure complete supply chain transparency'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-1 rounded-full">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-5 mt-8 rounded-r-lg">
                <p className="text-emerald-900 font-medium italic text-lg">
                  "Building trust in global agricultural trade through transparency, security, and innovation."
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-1">
                <div className="bg-white rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-emerald-50 rounded-2xl p-6 text-center">
                      <Package className="h-12 w-12 text-emerald-600 mx-auto mb-3" />
                      <p className="text-2xl font-bold text-gray-900">100%</p>
                      <p className="text-sm text-gray-600">Traceability</p>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-6 text-center">
                      <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                      <p className="text-2xl font-bold text-gray-900">256-bit</p>
                      <p className="text-sm text-gray-600">Encryption</p>
                    </div>
                    <div className="bg-purple-50 rounded-2xl p-6 text-center">
                      <Zap className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                      <p className="text-2xl font-bold text-gray-900">&lt;3s</p>
                      <p className="text-sm text-gray-600">Verification</p>
                    </div>
                    <div className="bg-orange-50 rounded-2xl p-6 text-center">
                      <Globe className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                      <p className="text-2xl font-bold text-gray-900">24/7</p>
                      <p className="text-sm text-gray-600">Availability</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Process</span>
            <h2 className="text-4xl font-bold text-white mt-2 mb-4">How AgriQCert Works</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              A seamless four-step process from batch submission to global verification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  {index < timeline.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-500/0" />
                  )}
                  <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/50 transition-colors">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/25">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="text-emerald-400 text-sm font-semibold mb-2">Step {item.step}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Ecosystem</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Who We Serve</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connecting all stakeholders in the agricultural trade ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stakeholders.map((stakeholder, index) => {
              const Icon = stakeholder.icon;
              const colorClasses = {
                emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200',
                blue: 'bg-blue-100 text-blue-600 border-blue-200',
                purple: 'bg-purple-100 text-purple-600 border-purple-200',
                orange: 'bg-orange-100 text-orange-600 border-orange-200'
              };
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${colorClasses[stakeholder.color]}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{stakeholder.title}</h3>
                  <p className="text-gray-600 text-lg">{stakeholder.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Why Choose AgriQCert</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced technology meets agricultural expertise for unmatched certification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group bg-gray-50 hover:bg-gradient-to-br hover:from-emerald-500 hover:to-teal-600 rounded-2xl p-8 transition-all duration-300">
                  <div className="bg-emerald-100 group-hover:bg-white/20 w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors">
                    <Icon className="h-7 w-7 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-emerald-100 transition-colors">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Built on Industry Standards
                </h2>
                <p className="text-emerald-100 text-lg mb-8">
                  AgriQCert leverages cutting-edge technologies and international standards to ensure maximum security, interoperability, and trust.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {['W3C Verifiable Credentials', 'OpenID4VP Protocol', 'Blockchain Security', 'REST APIs'].map((tech, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur rounded-lg px-4 py-3 text-center">
                      <span className="font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                  <Shield className="h-32 w-32 text-white mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Certification Process?</h2>
          <p className="text-xl text-emerald-200 mb-10">
            Join thousands of exporters and QA agencies already using AgriQCert
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register"
              className="bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center text-lg"
            >
              Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/verify"
              className="bg-emerald-700 border-2 border-emerald-500 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-600 transition-colors inline-flex items-center justify-center text-lg"
            >
              <QrCode className="mr-2 h-5 w-5" /> Verify a Certificate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;