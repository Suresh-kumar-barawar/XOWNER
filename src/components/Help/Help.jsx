import React, { useState, useEffect } from 'react';
import { FiHelpCircle } from 'react-icons/fi';

const Help = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div
        className={`text-center transform transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
            <FiHelpCircle className="relative w-24 h-24 text-primary" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Help Center Coming Soon
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Our help and support center is under construction. We'll be here to assist you soon!
        </p>

        <div className="flex gap-2 justify-center mb-8">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        <p className="text-gray-500">Check back soon!</p>
      </div>
    </div>
  );
};

export default Help;
