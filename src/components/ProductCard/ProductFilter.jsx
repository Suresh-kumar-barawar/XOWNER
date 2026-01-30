import React, { useState, useRef, useEffect } from 'react';
import { FaFilter, FaTimes, FaGripLines } from 'react-icons/fa';
import { categories, brands, conditions, listingTypes } from '../../utils/mockData';

const ProductFilter = ({ 
  filters, 
  onFilterChange, 
  showFilters, 
  onToggleFilters, 
  activeFiltersCount, 
  onClearFilters 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showFilters]);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 0) {
      setCurrentY(deltaY);
      if (canvasRef.current) {
        canvasRef.current.style.transform = `translateY(${deltaY}px)`;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (currentY > 100) {
      onToggleFilters();
    }
    if (canvasRef.current) {
      canvasRef.current.style.transform = 'translateY(0px)';
    }
    setCurrentY(0);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setCurrentY(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    if (deltaY > 0) {
      setCurrentY(deltaY);
      if (canvasRef.current) {
        canvasRef.current.style.transform = `translateY(${deltaY}px)`;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (currentY > 100) {
      onToggleFilters();
    }
    if (canvasRef.current) {
      canvasRef.current.style.transform = 'translateY(0px)';
    }
    setCurrentY(0);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startY]);

  if (!showFilters) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onToggleFilters}
      />
      
      {/* Off-canvas Filter Panel */}
      <div 
        ref={canvasRef}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 h-[70vh] flex flex-col transition-transform duration-300 ease-out"
        style={{ transform: showFilters ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {/* Drag Handle */}
        <div 
          className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FaFilter className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-gray-900">Filters</h3>
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-white text-sm px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <button
            onClick={onToggleFilters}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaTimes className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6 pb-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {[{ id: 'all', name: 'All Categories' }, ...categories].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => onFilterChange('category', cat.id)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      filters.category === cat.id
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Brand</label>
              <div className="grid grid-cols-2 gap-2">
                {[{ value: 'all', label: 'All Brands' }, ...brands.filter(brand => brand !== 'All Brands').map(brand => ({ value: brand, label: brand }))].map(brand => (
                  <button
                    key={brand.value}
                    onClick={() => onFilterChange('brand', brand.value)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      filters.brand === brand.value
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {brand.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Condition</label>
              <div className="grid grid-cols-2 gap-2">
                {[{ value: 'all', label: 'All Conditions' }, ...conditions].map(condition => (
                  <button
                    key={condition.value}
                    onClick={() => onFilterChange('condition', condition.value)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      filters.condition === condition.value
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {condition.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Listing Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Listing Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[{ value: 'all', label: 'All Types' }, ...listingTypes].map(type => (
                  <button
                    key={type.value}
                    onClick={() => onFilterChange('listingType', type.value)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      filters.listingType === type.value
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Price Range</label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => onFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                  className="w-full mb-3"
                />
                <div className="flex justify-between text-sm font-medium text-gray-700">
                  <span>₹{filters.priceRange[0].toLocaleString()}</span>
                  <span>₹{filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Sort By</label>
              <div className="space-y-2">
                {[
                  { value: 'newest', label: 'Newest First' },
                  { value: 'oldest', label: 'Oldest First' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'popular', label: 'Most Popular' }
                ].map(sort => (
                  <button
                    key={sort.value}
                    onClick={() => onFilterChange('sortBy', sort.value)}
                    className={`w-full p-3 rounded-lg border text-left text-sm font-medium transition-colors ${
                      filters.sortBy === sort.value
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 p-6 border-t border-gray-200 bg-white flex-shrink-0">
          <button
            onClick={onClearFilters}
            className="flex-1 py-3 px-4 bg-red-50 border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-100 hover:border-red-300 transition-colors flex items-center justify-center gap-2"
          >
            <FaTimes className="w-4 h-4" />
            Clear All
          </button>
          <button
            onClick={onToggleFilters}
            className="flex-1 py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;