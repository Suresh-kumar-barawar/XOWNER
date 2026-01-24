import React from 'react'
import { FaTag, FaShoppingCart, FaExchangeAlt } from 'react-icons/fa'

const SellBuyExchange = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-lg text-gray-600">Simple steps to buy, sell, or exchange your electronics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTag className="text-2xl text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Sell</h3>
          <p className="text-gray-600 leading-relaxed">
            List your old electronics and get the best price from verified buyers
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingCart className="text-2xl text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Buy</h3>
          <p className="text-gray-600 leading-relaxed">
            Browse quality pre-owned electronics at amazing prices
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExchangeAlt className="text-2xl text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Exchange</h3>
          <p className="text-gray-600 leading-relaxed">
            Swap your device for another one without any hassle
          </p>
        </div>
      </div>
    </div>
  )
}

export default SellBuyExchange