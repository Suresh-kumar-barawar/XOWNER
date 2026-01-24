import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPhone, FaHeart, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaEye, FaUsers, FaArrowLeft, FaTag, FaExchangeAlt, FaShoppingCart } from 'react-icons/fa';
import { products } from '../../utils/mockData';

const ProductDetails = () => {
  const { productId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <FaArrowLeft /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.title}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-md">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x400?text=No+Image';
                }}
              />
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold uppercase ${
                  product.listingType === 'sell' ? 'bg-green-500 text-white' :
                  product.listingType === 'exchange' ? 'bg-yellow-500 text-white' :
                  'bg-primary text-white'
                }`}>
                  {product.listingType === 'sell' && <FaTag />}
                  {product.listingType === 'buy' && <FaShoppingCart />}
                  {product.listingType === 'exchange' && <FaExchangeAlt />}
                  {product.listingType}
                </span>
              </div>
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 transition-colors ${
                      currentImageIndex === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x80?text=No+Image';
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{product.brand}</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">{product.condition}</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">{product.status}</span>
              </div>
            </div>
            
            <div className="border-t border-b border-gray-200 py-6">
              <div className="text-4xl font-bold text-primary mb-2">{formatPrice(product.price)}</div>
              {product.originalPrice && (
                <div className="flex items-center gap-3">
                  <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
            
            {product.exchangePreferences && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Exchange Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {product.exchangePreferences.map((pref, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">{pref}</span>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  value && (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Included Accessories</h3>
              <div className="flex flex-wrap gap-2">
                {product.accessories.map((accessory, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                    ✓ {accessory}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4 pt-6">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors" onClick={handleContactSeller}>
                <FaPhone /> Contact Seller
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors" onClick={handleInterested}>
                <FaHeart /> I'm Interested
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Seller Information</h3>
            <div className="flex items-start gap-4">
              <img 
                src={`https://ui-avatars.com/api/?name=${product.seller.name}&background=007bff&color=fff&size=60`} 
                alt={product.seller.name}
                className="w-15 h-15 rounded-full"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.seller.name}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" /> {product.seller.rating}/5 Rating
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400" /> {product.seller.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" /> Joined {new Date(product.seller.joinedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <FaEye className="text-2xl text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{product.views}</div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
              <div className="text-center">
                <FaUsers className="text-2xl text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{product.interested}</div>
                <div className="text-sm text-gray-600">Interested</div>
              </div>
              <div className="text-center">
                <FaCalendarAlt className="text-2xl text-primary mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">{new Date(product.postedDate).toLocaleDateString()}</div>
                <div className="text-sm text-gray-600">Posted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;