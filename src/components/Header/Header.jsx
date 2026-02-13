import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMapPin, FiUser, FiMenu, FiX, FiLogOut, FiSettings, FiHeart } from "react-icons/fi";
import { FaTag, FaCircle } from "react-icons/fa";
import useOnlineStatus from "../../utils/useOnlineStatus";
import useGeolocation from "../../utils/useGeolocation";
import LocationModal from "../LocationModal/LocationModal";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn, isLoading } = useAuth();
  const isUserOnline = useOnlineStatus();
  const { location, loading, setLocation } = useGeolocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-profile-dropdown]')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-primary transition-colors no-underline"
              >
                About
              </Link>
              
              {!isLoggedIn ? (
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <FiUser size={14} />
                  <span>Login</span>
                </Link>
              ) : (
                <div className="relative" data-profile-dropdown>
                  <button 
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.fullName || user.name || 'User'}&background=007bff&color=fff&size=32`}
                      alt={user.fullName || user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-left hidden sm:block">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.fullName || user.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                      {/* User Info */}
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${user.fullName || user.name || 'User'}&background=007bff&color=fff&size=48`}
                            alt={user.fullName || user.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {user.fullName || user.name || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            {user.phone && (
                              <p className="text-xs text-gray-500 truncate">{user.phone}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm no-underline"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <FiUser size={16} />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm no-underline"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <FiHeart size={16} />
                          <span>Wishlist</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm no-underline"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <FiSettings size={16} />
                          <span>Settings</span>
                        </Link>
                      </div>

                      {/* Logout Button */}
                      <div className="border-t border-gray-200 p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors rounded-lg text-sm font-medium"
                        >
                          <FiLogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
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
              {/* User Info Section (Mobile) */}
              {isLoggedIn && user && (
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.fullName || user.name || 'User'}&background=007bff&color=fff&size=48`}
                      alt={user.fullName || user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.fullName || user.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Mobile Navigation */}
              <Link 
                to="/about" 
                className="block text-gray-700 hover:text-primary transition-colors text-center py-2 no-underline"
                onClick={toggleMenu}
              >
                About
              </Link>
              
              {!isLoggedIn ? (
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 border border-primary text-primary px-4 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors w-full justify-center"
                  onClick={toggleMenu}
                >
                  <FiUser size={14} />
                  <span>Login</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors w-full justify-center rounded-lg text-sm"
                    onClick={toggleMenu}
                  >
                    <FiUser size={16} />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors w-full justify-center rounded-lg text-sm"
                    onClick={toggleMenu}
                  >
                    <FiHeart size={16} />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors w-full justify-center rounded-lg text-sm"
                    onClick={toggleMenu}
                  >
                    <FiSettings size={16} />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full justify-center rounded-lg text-sm font-medium"
                  >
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              )}
              
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