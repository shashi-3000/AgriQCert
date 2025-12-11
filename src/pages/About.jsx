import { Package, Shield, Users, Globe, Target, Award } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'Blockchain-backed verifiable credentials ensure data integrity and authenticity.'
    },
    {
      icon: Globe,
      title: 'Global Standards',
      description: 'Compliant with W3C and OpenID4VP international standards for interoperability.'
    },
    {
      icon: Users,
      title: 'Multi-Stakeholder',
      description: 'Connects exporters, QA agencies, and importers in one seamless ecosystem.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Certified QA agencies conduct thorough inspections meeting international requirements.'
    }
  ];

  const team = [
    { name: 'John Doe', role: 'CEO & Founder', image: 'https://via.placeholder.com/150' },
    { name: 'Jane Smith', role: 'CTO', image: 'https://via.placeholder.com/150' },
    { name: 'Mike Johnson', role: 'Head of Operations', image: 'https://via.placeholder.com/150' },
    { name: 'Sarah Williams', role: 'Quality Director', image: 'https://via.placeholder.com/150' }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About AgriQCert</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Revolutionizing agricultural trade certification with secure, verifiable digital credentials
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                AgriQCert is dedicated to transforming the agricultural import-export certification process by leveraging cutting-edge blockchain technology and verifiable credentials.
              </p>
              <p className="text-gray-600 mb-4">
                We aim to eliminate fraud, reduce processing times, and build trust between exporters, quality assurance agencies, and importers worldwide.
              </p>
              <div className="bg-green-50 border-l-4 border-green-600 p-4 mt-6">
                <p className="text-green-900 font-semibold">
                  "Building trust in global agricultural trade through transparency and technology."
                </p>
              </div>
            </div>
            <div className="bg-green-100 rounded-lg p-8">
              <Package className="h-32 w-32 text-green-600 mx-auto mb-6" />
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 mb-2">10,000+</p>
                <p className="text-gray-600">Certificates Issued</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">50+</p>
                  <p className="text-sm text-gray-600">Countries</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">500+</p>
                  <p className="text-sm text-gray-600">Exporters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">
              Advanced technology meets agricultural expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How AgriQCert Works</h2>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Submit Batch</h3>
                <p className="text-gray-600">
                  Exporters upload product details, documentation, and request quality inspection from certified agencies.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Inspection</h3>
                <p className="text-gray-600">
                  Certified QA agencies conduct thorough inspections and record results in the blockchain-secured system.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Digital Certificate</h3>
                <p className="text-gray-600">
                  Verifiable credentials are issued with QR codes, enabling instant verification at customs worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">
              Meet the experts behind AgriQCert
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join the future of agricultural trade certification
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             {/* Corrected: Added opening <a> tags */}
            <a 
              href="/register"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Up Now
            </a>
            
            <a 
              href="/verify"
              className="bg-green-700 border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
            >
              Verify Certificate
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;