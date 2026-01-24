import React from 'react'
import ProductCard from '../ProductCard/ProductCard';
import SellBuyExchange from '../SellBuyExchange/SellBuyExchange';

const Body = () => {
  return (
    <main className="flex-1">
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Buy, Sell & Exchange Electronics</h1>
          <p className="text-xl text-blue-100">Discover amazing deals on quality pre-owned devices</p>
        </div>
      </section>
      
      <section className="py-6 bg-gray-50">
        <ProductCard />
      </section>
      
      <section className="py-12">
        <SellBuyExchange />
      </section>
    </main>
  )
}

export default Body;