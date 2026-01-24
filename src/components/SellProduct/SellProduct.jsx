import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaPlus, FaTimes, FaCheck, FaExclamationTriangle, FaArrowLeft, FaMapMarkerAlt, FaRupeeSign, FaTag, FaExchangeAlt, FaShoppingCart, FaUpload } from 'react-icons/fa';
import { categories, brands, conditions, listingTypes } from '../../utils/mockData';

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
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-gray-900 mb-8">
              <FaTag className="text-primary text-2xl" /> Basic Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">Product Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., iPhone 13 Pro Max 128GB Space Gray"
                  className={`w-full px-4 py-4 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-3 ${
                    errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-primary focus:ring-blue-100'
                  }`}
                />
                {errors.title && <span className="flex items-center gap-1 text-red-500 text-xs mt-1"><FaExclamationTriangle />{errors.title}</span>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-3 ${
                      errors.category ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-primary focus:ring-blue-100'
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category && <span className="flex items-center gap-1 text-red-500 text-xs mt-1"><FaExclamationTriangle />{errors.category}</span>}
                </div>
                
                <div>
                  <label htmlFor="brand" className="block text-sm font-semibold text-gray-900 mb-2">Brand *</label>
                  <select
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-3 ${
                      errors.brand ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-primary focus:ring-blue-100'
                    }`}
                  >
                    <option value="">Select Brand</option>
                    {brands.filter(brand => brand !== 'All Brands').map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  {errors.brand && <span className="flex items-center gap-1 text-red-500 text-xs mt-1"><FaExclamationTriangle />{errors.brand}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="model" className="block text-sm font-semibold text-gray-900 mb-2">Model</label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="e.g., iPhone 13 Pro Max"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-primary focus:ring-3 focus:ring-blue-100"
                  />
                </div>
                
                <div>
                  <label htmlFor="condition" className="block text-sm font-semibold text-gray-900 mb-2">Condition *</label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-3 ${
                      errors.condition ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-primary focus:ring-blue-100'
                    }`}
                  >
                    <option value="">Select Condition</option>
                    {conditions.map(cond => (
                      <option key={cond.value} value={cond.value}>
                        {cond.label} - {cond.description}
                      </option>
                    ))}
                  </select>
                  {errors.condition && <span className="flex items-center gap-1 text-red-500 text-xs mt-1"><FaExclamationTriangle />{errors.condition}</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Listing Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {listingTypes.map(type => (
                    <label key={type.value} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.listingType === type.value ? 'border-primary bg-blue-50 text-primary' : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                    }`}>
                      <input
                        type="radio"
                        name="listingType"
                        value={type.value}
                        checked={formData.listingType === type.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="text-xl">
                        {type.value === 'sell' && <FaTag />}
                        {type.value === 'buy' && <FaShoppingCart />}
                        {type.value === 'exchange' && <FaExchangeAlt />}
                      </div>
                      <span className="font-medium">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-gray-900 mb-8">
              <FaRupeeSign className="text-primary text-2xl" /> Pricing & Description
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-900 mb-2">Selling Price (₹) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="25000"
                    min="0"
                    className={`w-full px-4 py-4 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-3 ${
                      errors.price ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-primary focus:ring-blue-100'
                    }`}
                  />
                  {errors.price && <span className="flex items-center gap-1 text-red-500 text-xs mt-1"><FaExclamationTriangle />{errors.price}</span>}
                </div>
                
                <div>
                  <label htmlFor="originalPrice" className="block text-sm font-semibold text-gray-900 mb-2">Original Price (₹)</label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="50000"
                    min="0"
                    className={`w-full px-4 py-4 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-3 ${
                      errors.originalPrice ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-primary focus:ring-blue-100'
                    }`}
                  />
                  {errors.originalPrice && <span className="flex items-center gap-1 text-red-500 text-xs mt-1"><FaExclamationTriangle />{errors.originalPrice}</span>}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">Product Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your product condition, usage, any issues, reason for selling, etc."
                  rows="5"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-primary focus:ring-3 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-gray-900 mb-8">
              <FaCamera className="text-primary text-2xl" /> Images & Specifications
            </h2>
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">Product Images (Max 5)</label>
                <div className="mb-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="image-upload"
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl cursor-pointer font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                    <FaUpload /> Upload Images
                  </label>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative rounded-xl overflow-hidden shadow-md">
                        <img src={image} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 hover:scale-110 transition-all duration-300">
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-5">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="spec_storage" className="block text-sm font-semibold text-gray-900 mb-2">Storage</label>
                    <input
                      type="text"
                      id="spec_storage"
                      name="spec_storage"
                      value={formData.specifications.storage}
                      onChange={handleInputChange}
                      placeholder="128GB"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-primary focus:ring-3 focus:ring-blue-100"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="spec_ram" className="block text-sm font-semibold text-gray-900 mb-2">RAM</label>
                    <input
                      type="text"
                      id="spec_ram"
                      name="spec_ram"
                      value={formData.specifications.ram}
                      onChange={handleInputChange}
                      placeholder="6GB"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-primary focus:ring-3 focus:ring-blue-100"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="spec_display" className="block text-sm font-semibold text-gray-900 mb-2">Display</label>
                    <input
                      type="text"
                      id="spec_display"
                      name="spec_display"
                      value={formData.specifications.display}
                      onChange={handleInputChange}
                      placeholder="6.1 inch Super Retina XDR"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-primary focus:ring-3 focus:ring-blue-100"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="spec_processor" className="block text-sm font-semibold text-gray-900 mb-2">Processor</label>
                    <input
                      type="text"
                      id="spec_processor"
                      name="spec_processor"
                      value={formData.specifications.processor}
                      onChange={handleInputChange}
                      placeholder="A15 Bionic"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-primary focus:ring-3 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-5">Accessories</h3>
                <div className="flex flex-col md:flex-row gap-4 mb-5">
                  <input
                    type="text"
                    value={newAccessory}
                    onChange={(e) => setNewAccessory(e.target.value)}
                    placeholder="Add accessory (e.g., Charger, Case)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAccessory())}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-primary"
                  />
                  <button type="button" onClick={addAccessory} className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 hover:-translate-y-0.5 transition-all duration-300">
                    <FaPlus /> Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.accessories.map((accessory, index) => (
                    <span key={index} className="inline-flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                      {accessory}
                      <button type="button" onClick={() => removeAccessory(index)} className="text-red-500 hover:text-white hover:bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold transition-all duration-300">
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {formData.listingType === 'exchange' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-5">Exchange Preferences</h3>
                  <div className="flex flex-col md:flex-row gap-4 mb-5">
                    <input
                      type="text"
                      value={newExchangePref}
                      onChange={(e) => setNewExchangePref(e.target.value)}
                      placeholder="What would you like in exchange?"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExchangePreference())}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-primary"
                    />
                    <button type="button" onClick={addExchangePreference} className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 hover:-translate-y-0.5 transition-all duration-300">
                      <FaPlus /> Add
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.exchangePreferences.map((pref, index) => (
                      <span key={index} className="inline-flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                        {pref}
                        <button type="button" onClick={() => removeExchangePreference(index)} className="text-red-500 hover:text-white hover:bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold transition-all duration-300">
                          <FaTimes />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold text-gray-900 mb-8">
              <FaMapMarkerAlt className="text-primary text-2xl" /> Additional Information
            </h2>
            
            <div className="space-y-8">
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-900 mb-2">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                  className={`w-full px-4 py-4 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-3 ${
                    errors.location ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-primary focus:ring-blue-100'
                  }`}
                />
                {errors.location && <span className="flex items-center gap-1 text-red-500 text-xs mt-1"><FaExclamationTriangle />{errors.location}</span>}
              </div>

              <div className="space-y-5">
                <label className="flex items-center gap-3 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    name="warranty"
                    checked={formData.warranty}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary border-2 border-primary rounded focus:ring-primary"
                  />
                  <span className="text-gray-900">Product has warranty</span>
                </label>

                {formData.warranty && (
                  <div>
                    <label htmlFor="warrantyUntil" className="block text-sm font-semibold text-gray-900 mb-2">Warranty Valid Until</label>
                    <input
                      type="date"
                      id="warrantyUntil"
                      name="warrantyUntil"
                      value={formData.warrantyUntil}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-primary focus:ring-3 focus:ring-blue-100"
                    />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-5">Listing Summary</h3>
                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-primary">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 text-sm">
                      <span className="font-semibold text-gray-700">Product:</span>
                      <span className="text-gray-900">{formData.title || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 text-sm">
                      <span className="font-semibold text-gray-700">Price:</span>
                      <span className="text-gray-900 font-semibold">₹{formData.price || '0'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 text-sm">
                      <span className="font-semibold text-gray-700">Condition:</span>
                      <span className="text-gray-900">{formData.condition || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-sm">
                      <span className="font-semibold text-gray-700">Location:</span>
                      <span className="text-gray-900">{formData.location || 'Not specified'}</span>
                    </div>
                  </div>
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
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg mb-8 p-6 md:p-10">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-4 md:mb-6">
            <FaArrowLeft /> Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">List Your Product</h1>
          <p className="text-gray-600 text-lg">Fill in the details to list your electronic device</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-8">
          <div className="flex justify-between items-center relative">
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex flex-col items-center relative z-10" style={{ width: '25%' }}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep > step ? 'bg-green-500 text-white' : 
                  currentStep === step ? 'bg-primary text-white' : 
                  'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <FaCheck /> : step}
                </div>
                <span className={`mt-2 text-xs font-medium text-center ${
                  currentStep >= step ? 'text-primary font-semibold' : 'text-gray-500'
                }`}>
                  {step === 1 && 'Basic Info'}
                  {step === 2 && 'Pricing'}
                  {step === 3 && 'Images & Specs'}
                  {step === 4 && 'Final Details'}
                </span>
                {index < 3 && (
                  <div className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 ${
                    currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-10">
            {renderStepContent()}
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 p-6 md:p-10 bg-gray-50 border-t border-gray-200">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-300">
                <FaArrowLeft /> Previous
              </button>
            )}
            
            <div className={currentStep === 1 ? 'ml-auto' : 'md:ml-auto'}>
              {currentStep < totalSteps ? (
                <button type="button" onClick={nextStep} className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 w-full md:w-auto">
                  Next <FaArrowLeft style={{ transform: 'rotate(180deg)' }} />
                </button>
              ) : (
                <button type="submit" className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? 'Listing Product...' : 'List Product'}
                  {!isSubmitting && <FaCheck />}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellProduct;