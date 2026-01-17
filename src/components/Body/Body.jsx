import React from 'react'
import ProductCard from '../ProductCard/ProductCard';
import SellBuyExchange from '../SellBuyExchange/SellBuyExchange';
import "./Body.css";

const Body = () => {
  return (
    <main className="body-container">
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Buy, Sell & Exchange Electronics</h1>
          <p>Discover amazing deals on quality pre-owned devices</p>
        </div>
      </section>
      
      <section className="products-section">
        <ProductCard />
      </section>
      
      <section className="how-it-works">
        <SellBuyExchange />
      </section>
    </main>
  )
}

export default Body;