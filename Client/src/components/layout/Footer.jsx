import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, FlaskConical, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '../../assets/logo.png';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-neutral-200">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center ">
              <div className="bg-white/20 w-auto h-20 flex items-center justify-center mb-10 backdrop-blur-md rounded-xl  drop-shadow-lg inline-block">
                <img src={logo} alt="India Healthy Logo" className="h-44 drop-shadow-md" />
              </div>

            </Link>
            <p className="mb-4 text-sm">
              Providing accurate, reliable, and timely laboratory testing services for over 20 years.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-primary" />
                <span>123 Medical Way<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary" />
                <a href="tel:+18005551234" className="hover:text-primary transition-colors">800-555-1234</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary" />
                <a href="mailto:info@medilab.com" className="hover:text-primary transition-colors">info@medilab.com</a>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-0.5 text-primary" />
                <span>Mon-Fri: 7am-7pm<br />Sat: 8am-2pm<br />Sun: Closed</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-primary transition-colors">Patient Resources</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/portal" className="hover:text-primary transition-colors">Patient Portal</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="mb-4 text-sm">
              Subscribe to our newsletter for health tips and service updates.
            </p>
            <form className="space-y-2">
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-md text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-700 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-400 text-center md:text-left">
              &copy; {currentYear} MediLab. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-neutral-400">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">HIPAA Notice</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;