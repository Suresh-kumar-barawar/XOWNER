import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaStar, FaTag, FaExchangeAlt, FaShoppingCart } from 'react-icons/fa';
import { products } from '../../utils/mockData';

const ProductCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(value.toLowerCase()) ||
        product.brand.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const resetSearch = () => {
    setSearchTerm('');
    setFilteredProducts(products);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getConditionClass = (condition) => {
    switch (condition.toLowerCase()) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBadgeIcon = (listingType) => {
    switch (listingType) {
      case 'sell':
        return <FaTag className="w-3 h-3" />;
      case 'buy':
        return <FaShoppingCart className="w-3 h-3" />;
      case 'exchange':
        return <FaExchangeAlt className="w-3 h-3" />;
      default:
        return <FaTag className="w-3 h-3" />;
    }
  };

  const getBadgeClass = (listingType) => {
    switch (listingType) {
      case 'sell':
        return 'bg-primary text-white';
      case 'buy':
        return 'bg-primary text-white';
      case 'exchange':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-primary text-white';
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Search Section */}
      <div className="mb-6">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex items-stretch bg-white border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-primary transition-colors">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for products, brands, or categories..."
                className="w-full h-full py-3 pl-12 pr-4 text-base outline-none bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="flex-shrink-0 px-3 sm:px-6 bg-primary text-white font-semibold hover:bg-primary-dark transition-colors text-sm sm:text-base rounded-r-md"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Section Header */}
      {/* <div className="mb-5">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">Featured Products</h2>
      </div> */}

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group block"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer relative flex flex-col h-full">
                {/* Product Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <div className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase ${getBadgeClass(product.listingType)}`}>
                    {product.listingType === 'sell' ? 'Sell' : product.listingType === 'exchange' ? 'Exchange' : 'Buy'}
                  </div>
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-3 left-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform text-gray-600 hover:text-red-500">
                  <FaHeart className="w-3 h-3" />
                </button>

                {/* Product Image */}
                <div className="w-full h-40 sm:h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover bg-gray-100"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <h3 className="text-sm sm:text-base font-semibold mb-2 text-gray-900 line-clamp-2">
                    {product.title}
                  </h3>

                  {/* Specs */}
                  <div className="flex gap-1.5 mb-2 flex-wrap">
                    {product.specifications.storage && (
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                        {product.specifications.storage}
                      </span>
                    )}
                    {product.specifications.ram && (
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                        {product.specifications.ram}
                      </span>
                    )}
                  </div>

                  {/* Condition */}
                  <div className="mb-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getConditionClass(product.condition)}`}>
                      {product.condition}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-3 flex-wrap">
                    <span className="text-lg sm:text-xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-semibold">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200 mt-auto">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-semibold text-xs">
                      {product.seller.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs text-gray-900 truncate">
                        {product.seller.name}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <FaStar className="text-yellow-400 w-2.5 h-2.5" />
                        <span>{product.seller.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            <p className="text-lg mb-4">No products found matching your search.</p>
            <button
              onClick={resetSearch}
              className="px-5 py-2.5 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;