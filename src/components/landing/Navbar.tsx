import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-[#f8f3eb]/90 backdrop-blur-md border-b border-black/[0.06] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo (Left) */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative flex items-center justify-center p-2 bg-white rounded-2xl shadow-sm border border-stone-200/80 group-hover:border-[#1254E7]/30 group-hover:shadow-md group-hover:shadow-[#1254E7]/10 transition-all duration-200">
              <img 
                src="https://www.image2url.com/r2/default/images/1789100294147-a604f829-b27a-4b30-81d0-17b2fb789440.png" 
                alt="HireUP Logo" 
                className="h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              Hire<span className="text-[#1254E7]">UP</span>
            </span>
          </Link>

          {/* Right Section: Desktop Navigation & Actions */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Nav Items */}
            <nav className="flex items-center space-x-1 pr-4 border-r border-stone-300/70">
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 font-medium text-sm px-3.5 py-2 rounded-xl hover:bg-black/[0.04] transition-all duration-150"
              >
                How it works
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium text-sm px-3.5 py-2 rounded-xl hover:bg-black/[0.04] transition-all duration-150"
              >
                <span>Features</span>
                <span className="text-[10px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded-md bg-[#1254E7]/10 text-[#1254E7] border border-[#1254E7]/20">
                  New
                </span>
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-[#1254E7]/25 hover:shadow-xl hover:shadow-[#1254E7]/35 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span>Go to Dashboard</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-black/[0.04] transition-all duration-150"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/job"
                    className="inline-flex items-center gap-2 bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-[#1254E7]/25 hover:shadow-xl hover:shadow-[#1254E7]/35 transition-all duration-200 transform hover:-translate-y-0.5 group"
                  >
                    <span>Get Started</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
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
              className="p-2.5 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-black/[0.05] focus:outline-none transition-colors"
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
        <div className="md:hidden bg-[#f8f3eb]/95 backdrop-blur-xl border-t border-black/[0.06] border-b border-stone-200/70 px-5 pt-3 pb-6 space-y-2 shadow-xl">
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-gray-700 hover:bg-black/[0.05] font-semibold text-sm transition-colors"
          >
            <span>How it works</span>
          </a>
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-gray-700 hover:bg-black/[0.05] font-semibold text-sm transition-colors"
          >
            <span>Features</span>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#1254E7]/10 text-[#1254E7]">
              New
            </span>
          </a>

          <div className="pt-3 border-t border-black/[0.06] flex flex-col space-y-2.5">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold py-3 rounded-xl shadow-lg shadow-[#1254E7]/25 transition-all text-sm"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 text-gray-700 hover:bg-black/[0.05] font-semibold rounded-xl transition-colors text-sm"
                >
                  Sign In
                </Link>

                <Link
                  to="/job"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold py-3 rounded-xl shadow-lg shadow-[#1254E7]/25 transition-all text-sm"
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
