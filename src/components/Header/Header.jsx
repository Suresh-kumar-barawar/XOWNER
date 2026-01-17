import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMapPin, FiUser, FiMenu, FiX } from "react-icons/fi";
import { FaTag } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import useOnlineStatus from "../../utils/useOnlineStatus";
import useGeolocation from "../../utils/useGeolocation";

const Header = () => {
  const isUserOnline = useOnlineStatus();
  const { location, loading } = useGeolocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-items">
        <div className="header-left">
          <span className="location-indicator">
            <FiMapPin size={14} />
            {loading ? 'Loading...' : `${location.city}${location.state ? ', ' + location.state : ''}`}
          </span>
        </div>
        
        <div className="header-center">
          <h1 className="logo">
            <Link to="/">XOWNER</Link>
          </h1>
        </div>
        
        <div className="header-right">
          <div className="desktop-nav">
            <Link to="/sell" className="nav-btn sell-btn">
              <FaTag size={14} />
              Sell
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/login" className="nav-btn login-btn">
              <FiUser size={14} />
              Login
            </Link>
            {isLoggedIn && (
              <div className="online-status">
                <FaCircle className={`status-dot ${isUserOnline ? 'online' : 'offline'}`} size={8} />
              </div>
            )}
          </div>
          
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/sell" className="mobile-nav-btn sell-btn" onClick={toggleMenu}>
            <FaTag size={14} />
            Sell
          </Link>
          <Link to="/about" className="mobile-nav-link" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/login" className="mobile-nav-btn login-btn" onClick={toggleMenu}>
            <FiUser size={14} />
            Login
          </Link>
          {isLoggedIn && (
            <div className="mobile-online-status">
              <FaCircle className={`status-dot ${isUserOnline ? 'online' : 'offline'}`} size={8} />
              <span>{isUserOnline ? 'Online' : 'Offline'}</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
