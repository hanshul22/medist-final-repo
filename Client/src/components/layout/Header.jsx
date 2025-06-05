import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, Search, FlaskConical } from 'lucide-react';
import logo from '../../assets/logo.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="India Healthy Logo" className="h-44" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/services" className="nav-link">Package</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/blogs" className="nav-link">Blog</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
          </nav>

          {/* Search and Contact */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search here"
                className="w-48 px-4 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">24x7 Support</span>
              <div className="flex items-center text-sm">
                <Phone size={16} className="text-primary mr-2" />
                <span className="text-gray-700">800-555-1234</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-3">
              <NavLink to="/" className="nav-link py-2">Home</NavLink>
              <NavLink to="/package" className="nav-link py-2">Package</NavLink>
              <NavLink to="/service" className="nav-link py-2">Package</NavLink>
              <NavLink to="/blog" className="nav-link py-2">Blog</NavLink>
              <NavLink to="/contact" className="nav-link py-2">Contact</NavLink>
              <div className="pt-2 border-t border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search here"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="flex flex-col py-2">
                <span className="text-xs text-gray-500">24x7 Support</span>
                <div className="flex items-center text-sm">
                  <Phone size={16} className="text-primary mr-2" />
                  <span className="text-gray-700">800-555-1234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;