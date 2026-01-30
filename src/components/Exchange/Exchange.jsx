import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { products } from '../../utils/mockData';

const Exchange = () => {
  // Filter products to show only those available for exchange
  const exchangeProducts = products.filter(product => product.listingType === 'exchange');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Exchange Products</h1>
          <p className="text-xl text-yellow-100">Find devices available for exchange and swap your gadgets</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Available for Exchange
          </h2>
          <p className="text-gray-600">Browse products that users want to exchange for other devices</p>
        </div>
        
        <ProductCard initialProducts={exchangeProducts} referrer="exchange" />
      </div>
    </div>
  );
};

export default Exchange;