import React from 'react'
import { FaTag, FaShoppingCart, FaExchangeAlt, FaArrowRight } from 'react-icons/fa'

const SellBuyExchange = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-xl text-gray-600">Choose your path and follow the simple process</p>
      </div>
      
      {/* Sell Process */}
      <div className="mb-16">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4 bg-green-500 text-white px-6 py-3 rounded-full">
            <FaTag className="text-xl" />
            <span className="text-xl font-bold">SELL YOUR DEVICE</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <h4 className="font-semibold text-gray-900 mb-2">Create Listing</h4>
            <p className="text-sm text-gray-600">Upload photos & details</p>
          </div>
          
          <FaArrowRight className="text-green-500 text-2xl hidden md:block" />
          <div className="w-px h-8 bg-green-500 md:hidden" />
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <h4 className="font-semibold text-gray-900 mb-2">Get Offers</h4>
            <p className="text-sm text-gray-600">Buyers contact you</p>
          </div>
          
          <FaArrowRight className="text-green-500 text-2xl hidden md:block" />
          <div className="w-px h-8 bg-green-500 md:hidden" />
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <h4 className="font-semibold text-gray-900 mb-2">Complete Sale</h4>
            <p className="text-sm text-gray-600">Meet & get paid</p>
          </div>
        </div>
      </div>
      
      {/* Buy Process */}
      <div className="mb-16">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4 bg-blue-500 text-white px-6 py-3 rounded-full">
            <FaShoppingCart className="text-xl" />
            <span className="text-xl font-bold">BUY A DEVICE</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <h4 className="font-semibold text-gray-900 mb-2">Browse & Search</h4>
            <p className="text-sm text-gray-600">Find your perfect device</p>
          </div>
          
          <FaArrowRight className="text-blue-500 text-2xl hidden md:block" />
          <div className="w-px h-8 bg-blue-500 md:hidden" />
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <h4 className="font-semibold text-gray-900 mb-2">Contact Seller</h4>
            <p className="text-sm text-gray-600">Ask questions & negotiate</p>
          </div>
          
          <FaArrowRight className="text-blue-500 text-2xl hidden md:block" />
          <div className="w-px h-8 bg-blue-500 md:hidden" />
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <h4 className="font-semibold text-gray-900 mb-2">Make Purchase</h4>
            <p className="text-sm text-gray-600">Inspect & buy safely</p>
          </div>
        </div>
      </div>
      
      {/* Exchange Process */}
      <div>
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4 bg-yellow-500 text-white px-6 py-3 rounded-full">
            <FaExchangeAlt className="text-xl" />
            <span className="text-xl font-bold">EXCHANGE DEVICES</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <h4 className="font-semibold text-gray-900 mb-2">List for Exchange</h4>
            <p className="text-sm text-gray-600">Post what you want to swap</p>
          </div>
          
          <FaArrowRight className="text-yellow-500 text-2xl hidden md:block" />
          <div className="w-px h-8 bg-yellow-500 md:hidden" />
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <h4 className="font-semibold text-gray-900 mb-2">Find Match</h4>
            <p className="text-sm text-gray-600">Connect with other users</p>
          </div>
          
          <FaArrowRight className="text-yellow-500 text-2xl hidden md:block" />
          <div className="w-px h-8 bg-yellow-500 md:hidden" />
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <h4 className="font-semibold text-gray-900 mb-2">Swap Devices</h4>
            <p className="text-sm text-gray-600">Meet & exchange safely</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellBuyExchange