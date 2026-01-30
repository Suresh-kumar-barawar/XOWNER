import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMapPin, FiUser, FiMenu, FiX } from "react-icons/fi";
import { FaTag } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import useOnlineStatus from "../../utils/useOnlineStatus";
import useGeolocation from "../../utils/useGeolocation";
import LocationModal from "../LocationModal/LocationModal";

const Header = () => {
  const isUserOnline = useOnlineStatus();
  const { location, loading, setLocation } = useGeolocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Section - Location */}
            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center space-x-2 text-sm text-gray-600 w-20 sm:w-32 md:w-48 hover:text-blue-600 transition-colors"
            >
              <FiMapPin size={14} className="text-primary flex-shrink-0" />
              <span className="truncate">
                {loading ? 'Loading...' : `${location.city}${location.state ? ', ' + location.state : ''}`}
              </span>
            </button>
            
            {/* Center - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-2xl font-bold text-primary">
                <Link to="/" className="hover:text-primary-dark transition-colors">XOWNER</Link>
              </h1>
            </div>
            
            {/* Right Section - Desktop Navigation / Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                {/* <Link 
                  to="/sell" 
                  className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <FaTag size={14} />
                  <span>Sell</span>
                </Link> */}
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-primary transition-colors no-underline"
                >
                  About
                </Link>
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <FiUser size={14} />
                  <span>Login</span>
                </Link>
                {isLoggedIn && (
                  <div className="flex items-center">
                    <FaCircle 
                      className={`${isUserOnline ? 'text-green-500' : 'text-red-500'}`} 
                      size={8} 
                    />
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMenu}
          ></div>
          
          {/* Menu Panel */}
          <div className="fixed top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation */}
              {/* <Link 
                to="/sell" 
                className="flex items-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark transition-colors w-full justify-center"
                onClick={toggleMenu}
              >
                <FaTag size={14} />
                <span>Sell</span>
              </Link> */}
              
              <Link 
                to="/about" 
                className="block text-gray-700 hover:text-primary transition-colors text-center py-2 no-underline"
                onClick={toggleMenu}
              >
                About
              </Link>
              
              <Link 
                to="/login" 
                className="flex items-center space-x-2 border border-primary text-primary px-4 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors w-full justify-center"
                onClick={toggleMenu}
              >
                <FiUser size={14} />
                <span>Login</span>
              </Link>
              
              {isLoggedIn && (
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 pt-4 border-t border-gray-200">
                  <FaCircle 
                    className={`${isUserOnline ? 'text-green-500' : 'text-red-500'}`} 
                    size={8} 
                  />
                  <span>{isUserOnline ? 'Online' : 'Offline'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16"></div>
      
      {/* Location Modal */}
      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={location}
        onLocationChange={setLocation}
      />
    </>
  );
};

export default Header;