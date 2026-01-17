import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPhone, FaHeart, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaEye, FaUsers, FaArrowLeft, FaTag, FaExchangeAlt, FaShoppingCart } from 'react-icons/fa';
import { products } from '../../utils/mockData';
import './ProductDetailsNew.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/" className="back-home-btn">Back to Home</Link>
      </div>
    );
  }
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const handleContactSeller = () => {
    alert(`Contact ${product.seller.name} at their location: ${product.seller.location}`);
  };
  
  const handleInterested = () => {
    alert('Interest registered! The seller will be notified.');
  };
  
  return (
    <div className="product-details-container">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          <FaArrowLeft /> Back to Home
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.title}</span>
      </div>
      
      <div className="product-details-content">
        <div className="product-images">
          <div className="main-image">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x400?text=No+Image';
              }}
            />
            <div className="listing-badge">
              <span className={`badge ${product.listingType}`}>
                {product.listingType === 'sell' && <FaTag />}
                {product.listingType === 'buy' && <FaShoppingCart />}
                {product.listingType === 'exchange' && <FaExchangeAlt />}
                {product.listingType.toUpperCase()}
              </span>
            </div>
          </div>
          
          {product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className={currentImageIndex === index ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(index)}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x80?text=No+Image';
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="details-product-info">
          <h1 className="details-product-title">{product.title}</h1>
          <div className="details-product-meta">
            <span className="details-brand">{product.brand}</span>
            <span className="details-condition">{product.condition}</span>
            <span className={`details-status ${product.status}`}>{product.status}</span>
          </div>
          
          <div className="details-price-section">
            <div className="details-current-price">{formatPrice(product.price)}</div>
            {product.originalPrice && (
              <div className="details-price-comparison">
                <span className="details-original-price">{formatPrice(product.originalPrice)}</span>
                <span className="details-savings">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>
            )}
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          {product.exchangePreferences && (
            <div className="exchange-preferences">
              <h3>Exchange Preferences</h3>
              <div className="preferences-list">
                {product.exchangePreferences.map((pref, index) => (
                  <span key={index} className="preference-tag">{pref}</span>
                ))}
              </div>
            </div>
          )}
          
          <div className="specifications">
            <h3>Specifications</h3>
            <div className="specs-grid">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="accessories">
            <h3>Included Accessories</h3>
            <div className="accessories-list">
              {product.accessories.map((accessory, index) => (
                <span key={index} className="accessory-tag">✓ {accessory}</span>
              ))}
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="contact-btn" onClick={handleContactSeller}>
              <FaPhone /> Contact Seller
            </button>
            <button className="interested-btn" onClick={handleInterested}>
              <FaHeart /> I'm Interested
            </button>
          </div>
        </div>
      </div>
      
      <div className="bottom-section">
        <div className="details-seller-info">
          <h3>Seller Information</h3>
          <div className="details-seller-card">
            <div className="seller-avatar">
              <img src={`https://ui-avatars.com/api/?name=${product.seller.name}&background=007bff&color=fff&size=60`} alt={product.seller.name} />
            </div>
            <div className="details-seller-details">
              <h4>{product.seller.name}</h4>
              <div className="details-seller-rating">
                <FaStar className="star-icon" /> {product.seller.rating}/5
              </div>
              <div className="details-seller-location">
                <FaMapMarkerAlt /> {product.seller.location}
              </div>
              <div className="details-seller-joined">
                <FaCalendarAlt /> Joined {new Date(product.seller.joinedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        
        <div className="product-stats">
          <h3>Product Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <FaEye className="stat-icon" />
              <span className="stat-value">{product.views}</span>
              <span className="stat-label">Views</span>
            </div>
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <span className="stat-value">{product.interested}</span>
              <span className="stat-label">Interested</span>
            </div>
            <div className="stat-item">
              <FaCalendarAlt className="stat-icon" />
              <span className="stat-value">{new Date(product.postedDate).toLocaleDateString()}</span>
              <span className="stat-label">Posted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;