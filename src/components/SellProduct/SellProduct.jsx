import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaPlus, FaTimes, FaCheck, FaExclamationTriangle, FaArrowLeft, FaMapMarkerAlt, FaRupeeSign, FaTag, FaExchangeAlt, FaShoppingCart, FaUpload } from 'react-icons/fa';
import { categories, brands, conditions, listingTypes } from '../../utils/mockData';
import './SellProduct.css';

const SellProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    brand: '',
    model: '',
    condition: '',
    price: '',
    originalPrice: '',
    listingType: 'sell',
    description: '',
    specifications: {
      storage: '',
      ram: '',
      display: '',
      processor: '',
      battery: '',
      os: ''
    },
    accessories: [],
    warranty: false,
    warrantyUntil: '',
    images: [],
    location: '',
    exchangePreferences: []
  });

  const [newAccessory, setNewAccessory] = useState('');
  const [newExchangePref, setNewExchangePref] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('spec_')) {
      const specName = name.replace('spec_', '');
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specName]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Product title is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.brand) newErrors.brand = 'Brand is required';
      if (!formData.condition) newErrors.condition = 'Condition is required';
    }
    
    if (step === 2) {
      if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
      if (formData.originalPrice && formData.originalPrice <= formData.price) {
        newErrors.originalPrice = 'Original price should be higher than selling price';
      }
    }
    
    if (step === 4) {
      if (!formData.location.trim()) newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addAccessory = () => {
    if (newAccessory.trim()) {
      setFormData(prev => ({
        ...prev,
        accessories: [...prev.accessories, newAccessory.trim()]
      }));
      setNewAccessory('');
    }
  };

  const removeAccessory = (index) => {
    setFormData(prev => ({
      ...prev,
      accessories: prev.accessories.filter((_, i) => i !== index)
    }));
  };

  const addExchangePreference = () => {
    if (newExchangePref.trim()) {
      setFormData(prev => ({
        ...prev,
        exchangePreferences: [...prev.exchangePreferences, newExchangePref.trim()]
      }));
      setNewExchangePref('');
    }
  };

  const removeExchangePreference = (index) => {
    setFormData(prev => ({
      ...prev,
      exchangePreferences: prev.exchangePreferences.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newProduct = {
        id: `${formData.category}_${Date.now()}`,
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        seller: {
          id: 'current_user',
          name: 'Current User',
          rating: 4.5,
          location: formData.location,
          joinedDate: new Date().toISOString()
        },
        postedDate: new Date().toISOString(),
        views: 0,
        interested: 0,
        status: 'available',
        images: formData.images.length > 0 ? formData.images : ['https://via.placeholder.com/400x300?text=No+Image']
      };

      console.log('New product created:', newProduct);
      alert('Product listed successfully!');
      navigate('/');
    } catch (error) {
      alert('Error listing product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2><FaTag className="step-icon" /> Basic Information</h2>
            
            <div className="form-group">
              <label htmlFor="title">Product Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., iPhone 13 Pro Max 128GB Space Gray"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={errors.category ? 'error' : ''}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="brand">Brand *</label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className={errors.brand ? 'error' : ''}
                >
                  <option value="">Select Brand</option>
                  {brands.filter(brand => brand !== 'All Brands').map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
                {errors.brand && <span className="error-message">{errors.brand}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g., iPhone 13 Pro Max"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="condition">Condition *</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className={errors.condition ? 'error' : ''}
                >
                  <option value="">Select Condition</option>
                  {conditions.map(cond => (
                    <option key={cond.value} value={cond.value}>
                      {cond.label} - {cond.description}
                    </option>
                  ))}
                </select>
                {errors.condition && <span className="error-message">{errors.condition}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Listing Type</label>
              <div className="listing-type-options">
                {listingTypes.map(type => (
                  <label key={type.value} className={`listing-option ${formData.listingType === type.value ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="listingType"
                      value={type.value}
                      checked={formData.listingType === type.value}
                      onChange={handleInputChange}
                    />
                    {type.value === 'sell' && <FaTag />}
                    {type.value === 'buy' && <FaShoppingCart />}
                    {type.value === 'exchange' && <FaExchangeAlt />}
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="step-content">
            <h2><FaRupeeSign className="step-icon" /> Pricing & Description</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Selling Price (₹) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="25000"
                  min="0"
                  className={errors.price ? 'error' : ''}
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="originalPrice">Original Price (₹)</label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="50000"
                  min="0"
                  className={errors.originalPrice ? 'error' : ''}
                />
                {errors.originalPrice && <span className="error-message">{errors.originalPrice}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Product Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product condition, usage, any issues, reason for selling, etc."
                rows="5"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="step-content">
            <h2><FaCamera className="step-icon" /> Images & Specifications</h2>
            
            <div className="image-upload-section">
              <label>Product Images (Max 5)</label>
              <div className="image-upload-area">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="image-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload" className="upload-button">
                  <FaUpload /> Upload Images
                </label>
              </div>
              
              {formData.images.length > 0 && (
                <div className="image-preview">
                  {formData.images.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image} alt={`Preview ${index + 1}`} />
                      <button type="button" onClick={() => removeImage(index)} className="remove-image">
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="specifications-section">
              <h3>Specifications</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="spec_storage">Storage</label>
                  <input
                    type="text"
                    id="spec_storage"
                    name="spec_storage"
                    value={formData.specifications.storage}
                    onChange={handleInputChange}
                    placeholder="128GB"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="spec_ram">RAM</label>
                  <input
                    type="text"
                    id="spec_ram"
                    name="spec_ram"
                    value={formData.specifications.ram}
                    onChange={handleInputChange}
                    placeholder="6GB"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="spec_display">Display</label>
                  <input
                    type="text"
                    id="spec_display"
                    name="spec_display"
                    value={formData.specifications.display}
                    onChange={handleInputChange}
                    placeholder="6.1 inch Super Retina XDR"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="spec_processor">Processor</label>
                  <input
                    type="text"
                    id="spec_processor"
                    name="spec_processor"
                    value={formData.specifications.processor}
                    onChange={handleInputChange}
                    placeholder="A15 Bionic"
                  />
                </div>
              </div>
            </div>

            <div className="accessories-section">
              <h3>Accessories</h3>
              <div className="accessories-input">
                <input
                  type="text"
                  value={newAccessory}
                  onChange={(e) => setNewAccessory(e.target.value)}
                  placeholder="Add accessory (e.g., Charger, Case)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAccessory())}
                />
                <button type="button" onClick={addAccessory}>
                  <FaPlus /> Add
                </button>
              </div>
              
              <div className="accessories-list">
                {formData.accessories.map((accessory, index) => (
                  <span key={index} className="accessory-tag">
                    {accessory}
                    <button type="button" onClick={() => removeAccessory(index)}>
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {formData.listingType === 'exchange' && (
              <div className="exchange-section">
                <h3>Exchange Preferences</h3>
                <div className="exchange-input">
                  <input
                    type="text"
                    value={newExchangePref}
                    onChange={(e) => setNewExchangePref(e.target.value)}
                    placeholder="What would you like in exchange?"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExchangePreference())}
                  />
                  <button type="button" onClick={addExchangePreference}>
                    <FaPlus /> Add
                  </button>
                </div>
                
                <div className="exchange-list">
                  {formData.exchangePreferences.map((pref, index) => (
                    <span key={index} className="exchange-tag">
                      {pref}
                      <button type="button" onClick={() => removeExchangePreference(index)}>
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 4:
        return (
          <div className="step-content">
            <h2><FaMapMarkerAlt className="step-icon" /> Additional Information</h2>
            
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State"
                className={errors.location ? 'error' : ''}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="warranty-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="warranty"
                  checked={formData.warranty}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Product has warranty
              </label>

              {formData.warranty && (
                <div className="form-group">
                  <label htmlFor="warrantyUntil">Warranty Valid Until</label>
                  <input
                    type="date"
                    id="warrantyUntil"
                    name="warrantyUntil"
                    value={formData.warrantyUntil}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            <div className="summary-section">
              <h3>Listing Summary</h3>
              <div className="summary-card">
                <div className="summary-item">
                  <strong>Product:</strong> {formData.title || 'Not specified'}
                </div>
                <div className="summary-item">
                  <strong>Price:</strong> ₹{formData.price || '0'}
                </div>
                <div className="summary-item">
                  <strong>Condition:</strong> {formData.condition || 'Not specified'}
                </div>
                <div className="summary-item">
                  <strong>Location:</strong> {formData.location || 'Not specified'}
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="sell-product-container">
      <div className="sell-product-header">
        <button onClick={() => navigate('/')} className="back-button">
          <FaArrowLeft /> Back to Home
        </button>
        <h1>List Your Product</h1>
        <p>Fill in the details to list your electronic device</p>
      </div>

      <div className="progress-bar">
        {[1, 2, 3, 4].map(step => (
          <div key={step} className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
            <div className="step-number">
              {currentStep > step ? <FaCheck /> : step}
            </div>
            <span className="step-label">
              {step === 1 && 'Basic Info'}
              {step === 2 && 'Pricing'}
              {step === 3 && 'Images & Specs'}
              {step === 4 && 'Final Details'}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="sell-product-form">
        {renderStepContent()}

        <div className="form-actions">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className="prev-btn">
              <FaArrowLeft /> Previous
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button type="button" onClick={nextStep} className="next-btn">
              Next <FaArrowLeft style={{ transform: 'rotate(180deg)' }} />
            </button>
          ) : (
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Listing Product...' : 'List Product'}
              {!isSubmitting && <FaCheck />}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SellProduct;