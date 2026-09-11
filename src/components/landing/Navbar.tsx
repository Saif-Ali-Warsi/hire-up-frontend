import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-[#f8f3eb]/95 backdrop-blur-xl border-b border-amber-950/10 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo (Left) */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative flex items-center justify-center p-1.5 bg-white rounded-2xl shadow-md shadow-blue-500/10 border border-gray-100 group-hover:scale-105 transition-transform duration-200">
              <img 
                src="https://www.image2url.com/r2/default/images/1789100294147-a604f829-b27a-4b30-81d0-17b2fb789440.png" 
                alt="HireUP Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              Hire<span className="text-[#1254E7]">UP</span>
            </span>
          </Link>

          {/* Right Section: Navigation Links & Actions grouped together */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Nav Items beside action buttons */}
            <nav className="flex items-center space-x-6 pr-2 border-r border-gray-200/80">
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-[#1254E7] font-semibold text-sm transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1254E7] hover:after:w-full after:transition-all"
              >
                How it works
              </a>
              <a
                href="#features"
                className="text-gray-600 hover:text-[#1254E7] font-semibold text-sm transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1254E7] hover:after:w-full after:transition-all"
              >
                Features
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-xl shadow-[#1254E7]/25 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-[#1254E7] font-semibold text-sm px-4 py-2.5 transition-colors duration-200"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/job"
                    className="bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-xl shadow-[#1254E7]/25 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2.5 rounded-2xl text-gray-700 hover:text-[#1254E7] hover:bg-black/5 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#f8f3eb] border-b border-gray-200/80 px-5 pt-4 pb-6 space-y-3 shadow-2xl animate-fadeIn">
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-black/5 hover:text-[#1254E7] font-semibold transition-colors text-sm"
          >
            How it works
          </a>
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-black/5 hover:text-[#1254E7] font-semibold transition-colors text-sm"
          >
            Features
          </a>

          <div className="pt-4 border-t border-gray-200/80 flex flex-col space-y-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-[#1254E7]/25 transition-all text-sm"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3.5 text-gray-700 hover:bg-black/5 font-semibold rounded-2xl transition-colors text-sm"
                >
                  Sign In
                </Link>

                <Link
                  to="/job"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-[#1254E7]/25 transition-all text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;