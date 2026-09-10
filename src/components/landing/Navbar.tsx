import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#1254E7] flex items-center justify-center text-white font-bold text-xl shadow-md shadow-[#1254E7]/30">
              H
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              Hire<span className="text-[#1254E7]">UP</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-[#1254E7] font-medium transition-colors duration-200"
            >
              How it works
            </a>
            <a
              href="#features"
              className="text-gray-600 hover:text-[#1254E7] font-medium transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-[#1254E7] font-medium transition-colors duration-200"
            >
              Pricing
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#login"
              className="text-gray-700 hover:text-[#1254E7] font-medium px-4 py-2 transition-colors duration-200"
            >
              Sign In
            </a>
            <Link
              to="/job"
              className="bg-[#1254E7] hover:bg-[#0f46c2] text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-[#1254E7]/25 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-700 hover:text-[#1254E7] focus:outline-none p-2 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#1254E7] font-medium transition-colors"
          >
            How it works
          </a>
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#1254E7] font-medium transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#1254E7] font-medium transition-colors"
          >
            Pricing
          </a>
          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
            <a
              href="#login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors"
            >
              Sign In
            </a>
            <Link
              to="/job"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-[#1254E7] hover:bg-[#0f46c2] text-white font-medium py-2.5 rounded-xl shadow-md shadow-[#1254E7]/25 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
