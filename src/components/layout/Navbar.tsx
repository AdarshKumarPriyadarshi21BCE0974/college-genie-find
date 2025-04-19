
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "../ui/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBachelorPopup, setShowBachelorPopup] = useState(false);
  const location = useLocation();

  // Listen for custom event from the CollegeFinder component
  useEffect(() => {
    const handleShowBachelorPopup = () => {
      setShowBachelorPopup(true);
    };

    document.addEventListener('showBachelorPopup', handleShowBachelorPopup);
    return () => {
      document.removeEventListener('showBachelorPopup', handleShowBachelorPopup);
    };
  }, []);

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <div className="flex items-center gap-2">
                  <img 
                    src={`${window.location.origin}/lovable-uploads/87a18f30-77c1-4a0f-8d46-b0d162d0a383.png`}
                    alt="College Genie Logo" 
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="bg-orange-500 rounded-full px-4 py-1">
                    <h1 className="text-xl font-bold text-white">College Genie</h1>
                  </div>
                </div>
              </Link>
            </div>
            
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

      <Dialog open={showBachelorPopup} onOpenChange={setShowBachelorPopup}>
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showBachelorPopup ? '' : 'hidden'}`}>
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto relative">
            <button 
              onClick={() => setShowBachelorPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-center mb-4">Coming Soon</h2>
            <p className="text-gray-600 text-center">Bachelor's degree recommendations will be available soon!</p>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Navbar;
