import { useState, useRef } from "react";
import { products } from "../../utils/mockData";
import { Link } from "react-router-dom";
import { FiSearch, FiMapPin, FiStar, FiEye, FiHeart } from "react-icons/fi";
import { FaTag, FaShoppingCart, FaExchangeAlt } from "react-icons/fa";
import "./ProductCard.css";

const ProductCard = () => {
  const searchRef = useRef(null);
  const [productsList, setProductsList] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchRef.current.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === "") {
      setProductsList(products);
    } else {
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.model.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        (product.category === 'mobile' && (term.includes('phone') || term.includes('mobile'))) ||
        (product.category === 'laptop' && term.includes('laptop')) ||
        (product.category === 'tablet' && term.includes('tablet')) ||
        (product.category === 'other' && (term.includes('accessory') || term.includes('accessories')))
      );
      setProductsList(filtered);
    }
  };

  const handleInputChange = () => {
    const term = searchRef.current.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === "") {
      setProductsList(products);
    } else {
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.model.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        (product.category === 'mobile' && (term.includes('phone') || term.includes('mobile'))) ||
        (product.category === 'laptop' && term.includes('laptop')) ||
        (product.category === 'tablet' && term.includes('tablet')) ||
        (product.category === 'other' && (term.includes('accessory') || term.includes('accessories')))
      );
      setProductsList(filtered);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  const getListingIcon = (type) => {
    switch(type) {
      case 'sell': return <FaTag size={12} />;
      case 'buy': return <FaShoppingCart size={12} />;
      case 'exchange': return <FaExchangeAlt size={12} />;
      default: return <FaTag size={12} />;
    }
  };

  return (
    <div className="product-card-container">
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-bar">
            <FiSearch className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search products, brands, models..." 
              ref={searchRef}
              onChange={handleInputChange}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </div>
        </form>
      </div>
      
      <div className="products-section">
        <div className="section-header">
          <h2>Featured Products ({productsList.length})</h2>
          {searchTerm && (
            <p className="search-results">Showing results for "{searchTerm}"</p>
          )}
        </div>
        
        <div className="products-grid">
          {productsList.length > 0 ? (
            productsList.map((product) => {
              const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0;
              
              return (
                <Link to={`/products/${product.id}`} key={product.id} className="product-card-link">
                  <div className="product-card">
                    <div className={`product-badge ${product.listingType}`}>
                      {getListingIcon(product.listingType)}
                      {product.listingType === 'sell' ? 'For Sale' : 
                       product.listingType === 'buy' ? 'Wanted' : 'Exchange'}
                    </div>
                    
                    <div className="wishlist-btn">
                      <FiHeart size={16} />
                    </div>
                    
                    <div className="product-image">
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x250?text=No+Image';
                        }}
                      />
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-title">{product.title}</h3>
                      
                      <div className="product-specs">
                        <span className="spec-badge">{product.specifications.storage}</span>
                        <span className="spec-badge">{product.specifications.ram}</span>
                      </div>
                      
                      <span className={`product-condition condition-${product.condition}`}>
                        {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
                      </span>
                      
                      <div className="product-price">
                        <span className="current-price">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <>
                            <span className="original-price">{formatPrice(product.originalPrice)}</span>
                            <span className="discount">{discount}% OFF</span>
                          </>
                        )}
                      </div>
                      
                      <div className="seller-info">
                        <div className="seller-avatar">
                          {product.seller.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="seller-details">
                          <div className="seller-name">{product.seller.name}</div>
                          <div className="seller-rating">
                            <FiStar className="star" size={12} />
                            <span>{product.seller.rating} - {product.seller.location.split(',')[0]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="no-products">
              <p>No products found matching your search.</p>
              <button onClick={() => {
                searchRef.current.value = '';
                setSearchTerm('');
                setProductsList(products);
              }} className="reset-btn">
                Show All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
