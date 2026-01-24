import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaArrowLeft, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    location: ''
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Full name is required';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isLogin) {
        // Demo login check
        if (formData.email === 'demo@xowner.com' && formData.password === 'demo123') {
          alert('Login successful! Welcome to XOWNER');
          navigate('/');
        } else {
          alert('Login successful!');
          navigate('/');
        }
      } else {
        alert('Registration successful! Please login with your credentials.');
        setIsLogin(true);
        setFormData({ email: formData.email, password: '', name: '', phone: '', location: '' });
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login will be implemented soon!`);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', name: '', phone: '', location: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        <button onClick={() => navigate('/')} className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
          <FaArrowLeft /> Back
        </button>
        
        <div className="text-center mb-8 mt-8">
          <div className="text-3xl font-bold text-primary mb-4">XOWNER</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{isLogin ? 'Welcome Back!' : 'Join XOWNER'}</h1>
          <p className="text-gray-600">{isLogin ? 'Sign in to continue your journey' : 'Create account to start trading electronics'}</p>
        </div>

        <div className="space-y-3 mb-6">
          <button type="button" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors" onClick={() => handleSocialLogin('Google')}>
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>
          <button type="button" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors" onClick={() => handleSocialLogin('Facebook')}>
            <FaFacebook className="text-blue-600" /> Continue with Facebook
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FaUser className="text-gray-400" /> Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <span className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <FaExclamationTriangle /> {errors.name}
                </span>
              )}
            </div>
          )}

          <div>
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FaEnvelope className="text-gray-400" /> Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <span className="flex items-center gap-1 text-red-500 text-sm mt-1">
                <FaExclamationTriangle /> {errors.email}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FaLock className="text-gray-400" /> Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className="flex items-center gap-1 text-red-500 text-sm mt-1">
                <FaExclamationTriangle /> {errors.password}
              </span>
            )}
          </div>

          {!isLogin && (
            <>
              <div>
                <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FaPhone className="text-gray-400" /> Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit phone number"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <span className="flex items-center gap-1 text-red-500 text-sm mt-1">
                    <FaExclamationTriangle /> {errors.phone}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="location" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FaMapMarkerAlt className="text-gray-400" /> Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State (Optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                />
              </div>
            </>
          )}

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-sm text-primary hover:text-primary-dark transition-colors">
                Forgot Password?
              </button>
            </div>
          )}

          <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
            {isLoading ? (
              <span>Processing...</span>
            ) : (
              <>
                {isLogin ? <FaLock /> : <FaCheck />}
                {isLogin ? 'Sign In' : 'Create Account'}
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" className="text-primary hover:text-primary-dark font-semibold transition-colors" onClick={toggleMode}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-2">
              <FaUser className="text-primary" /> Demo Account
            </h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Email:</strong> demo@xowner.com</p>
              <p><strong>Password:</strong> demo123</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;