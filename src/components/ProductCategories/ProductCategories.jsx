import { useState } from "react";
import { categories, brands } from "../../utils/mockData";
import "./ProductCategories.css";

const ProductCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  
  return (
    <section className="product-categories-container">
      <div className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-count">{category.count} items</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="brands-section">
        <h3 className="brands-title">Popular Brands</h3>
        <div className="brands-container">
          {brands.map((brand, index) => (
            <button 
              key={index} 
              className={`brand-tag ${selectedBrand === brand ? 'selected' : ''}`}
              onClick={() => setSelectedBrand(brand === selectedBrand ? null : brand)}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
