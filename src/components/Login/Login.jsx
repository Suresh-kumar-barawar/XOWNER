import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaArrowLeft, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import './Login.css';

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
    <div className="login-container">
      <div className="login-card">
        <button onClick={() => navigate('/')} className="back-button">
          <FaArrowLeft /> Back to Home
        </button>
        
        <div className="login-header">
          <div className="logo">XOWNER</div>
          <h1>{isLogin ? 'Welcome Back!' : 'Join XOWNER'}</h1>
          <p>{isLogin ? 'Sign in to continue your journey' : 'Create account to start trading electronics'}</p>
        </div>

        <div className="social-login">
          <button type="button" className="social-btn google" onClick={() => handleSocialLogin('Google')}>
            <FaGoogle /> Continue with Google
          </button>
          <button type="button" className="social-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
            <FaFacebook /> Continue with Facebook
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">
                <FaUser className="label-icon" /> Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && (
                <span className="error-message">
                  <FaExclamationTriangle /> {errors.name}
                </span>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="label-icon" /> Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className="error-message">
                <FaExclamationTriangle /> {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="label-icon" /> Password *
            </label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">
                <FaExclamationTriangle /> {errors.password}
              </span>
            )}
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="phone">
                  <FaPhone className="label-icon" /> Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit phone number"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && (
                  <span className="error-message">
                    <FaExclamationTriangle /> {errors.phone}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="location">
                  <FaMapMarkerAlt className="label-icon" /> Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State (Optional)"
                />
              </div>
            </>
          )}

          {isLogin && (
            <div className="forgot-password">
              <button type="button" className="forgot-btn">
                Forgot Password?
              </button>
            </div>
          )}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <span className="loading">Processing...</span>
            ) : (
              <>
                {isLogin ? <FaLock /> : <FaCheck />}
                {isLogin ? 'Sign In' : 'Create Account'}
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" className="toggle-btn" onClick={toggleMode}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="demo-credentials">
            <h4><FaUser /> Demo Account</h4>
            <div className="demo-info">
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