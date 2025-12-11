import { Package, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Foot = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-green-500" />
              <span className="font-bold text-xl text-white">AgriQCert</span>
            </div>
            <p className="text-sm">
              Digital certification system for agricultural imports and exports. 
              Ensuring quality and trust through verifiable credentials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-green-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-green-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-green-500 transition-colors">
                  Verify Certificate
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-green-500 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/exporter/dashboard" className="hover:text-green-500 transition-colors">
                  For Exporters
                </Link>
              </li>
              <li>
                <Link to="/qa/dashboard" className="hover:text-green-500 transition-colors">
                  For QA Agencies
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-green-500 transition-colors">
                  For Importers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-500" />
                <span>info@agriqcert.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span>123 Agri Street, City</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-green-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {currentYear} AgriQCert. All rights reserved.</p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <Link to="/privacy" className="hover:text-green-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-green-500 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Foot;