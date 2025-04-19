
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">College Genie</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/features" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">
              Features
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link to="/team" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">
              Team
            </Link>
            <Link 
              to="/college-finder" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              College Finder
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/team"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
            <Link 
              to="/college-finder"
              className="block px-3 py-2 text-base font-medium bg-orange-500 text-white hover:bg-orange-600"
              onClick={() => setIsMenuOpen(false)}
            >
              College Finder
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
