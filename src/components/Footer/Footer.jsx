import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapPin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-600 to-blue-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">XOWNER</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Your trusted marketplace for buying, selling, and exchanging quality electronic devices.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-blue-200 text-sm">Follow us:</span>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  aria-label="Facebook"
                  className="w-9 h-9 bg-white bg-opacity-10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FaFacebook />
                </a>
                <a 
                  href="#" 
                  aria-label="Twitter"
                  className="w-9 h-9 bg-white bg-opacity-10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FaTwitter />
                </a>
                <a 
                  href="#" 
                  aria-label="Instagram"
                  className="w-9 h-9 bg-white bg-opacity-10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="#" 
                  aria-label="LinkedIn"
                  className="w-9 h-9 bg-white bg-opacity-10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-blue-100 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-blue-100 hover:text-primary transition-colors">
                  Sell Product
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Categories</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-100 hover:text-primary transition-colors">
                  Mobile Phones
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-primary transition-colors">
                  Laptops
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-primary transition-colors">
                  Tablets
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-primary transition-colors">
                  Accessories
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaPhone className="text-white w-4 h-4" />
                <span className="text-blue-100">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-white w-4 h-4" />
                <span className="text-blue-100">support@xowner.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapPin className="text-white w-4 h-4" />
                <span className="text-blue-100">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white border-opacity-10 bg-black bg-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-blue-100 text-sm">© 2024 XOWNER. All rights reserved.</p>
            <p className="text-blue-200 text-sm italic">Making electronic device trading simple & secure</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer