import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaStar, FaTag, FaExchangeAlt, FaShoppingCart, FaComments } from 'react-icons/fa';
import { products } from '../../utils/mockData';

const ProductCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFixed, setIsFixed] = useState(false);
  const [fixedStyle, setFixedStyle] = useState({});
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const placeholderRef = useRef(null);
  

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

  useEffect(() => {
    const headerEl = document.querySelector('header');
    const headerHeight = headerEl ? Math.ceil(headerEl.getBoundingClientRect().height) : 0;

    let ticking = false;

    const update = () => {
      if (!containerRef.current || !formRef.current) {
        ticking = false;
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const formRect = formRef.current.getBoundingClientRect();

      // should become fixed when the top of container has scrolled past the header
      // and should remain fixed until the container bottom is above header + form height
      const shouldFix = containerRect.top <= headerHeight && (containerRect.bottom >= headerHeight + formRect.height);

      if (shouldFix) {
        // compute left relative to viewport and width to match the container/form
        const left = Math.max(formRect.left, 0);
        setFixedStyle({ left: `${left}px`, width: `${formRect.width}px`, top: `${headerHeight}px` });
        setPlaceholderHeight(Math.ceil(formRect.height));
        setIsFixed(true);
      } else {
        setIsFixed(false);
        setFixedStyle({});
        setPlaceholderHeight(0);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    // initial check
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  

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
    <div ref={containerRef} className="px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Search Section */}
      <div className="mb-6">
        {/* placeholder to preserve layout when form becomes fixed */}
        {isFixed && <div ref={placeholderRef} style={{ height: placeholderHeight }} aria-hidden />}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`max-w-2xl mx-auto rounded-3xl transition-shadow duration-200 ${isFixed ? 'shadow-xl' : ''}`}
          style={isFixed ? { position: 'fixed', zIndex: 30, ...fixedStyle } : { position: 'relative' }}
        >
          <div className="flex items-stretch bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden transition-all duration-200 focus-within:bg-white focus-within:border-primary focus-within:shadow-lg">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for products, brands, or categories..."
                className="w-full h-full py-3 pl-12 pr-4 text-base outline-none bg-transparent text-gray-900 placeholder-gray-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="flex-shrink-0 px-3 sm:px-6 bg-primary text-white font-semibold hover:bg-primary-dark transition-colors text-sm sm:text-base rounded-r-3xl"
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group block"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative flex flex-col h-full">
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

                  {/* Condition (now includes % OFF when applicable) */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getConditionClass(product.condition)}`}>
                      {product.condition}
                    </span>
                    {product.originalPrice && (
                      <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-semibold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-3 flex-wrap">
                    <span className="text-lg sm:text-xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-gray-200 mt-auto">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Handle chat functionality
                      }}
                      className="flex-1 bg-primary text-white py-2 px-3 rounded-md text-xs font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-1"
                    >
                      <FaComments className="w-3 h-3" />
                      Chat
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Navigate to product details
                        window.location.href = `/products/${product.id}`;
                      }}
                      className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-md text-xs font-semibold hover:bg-gray-700 transition-colors"
                    >
                      Explore
                    </button>
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