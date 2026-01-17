import React from 'react'
import './SellBuyExchange.css';

const SellBuyExchange = () => {
  return (
    <div className="sell-buy-exchange-container">
      <div>
        <h2>How It Works</h2>
      </div>
      <div className='SellBuyExchange-cards-container'>
        <div className='SellBuyExchange-card'>
            <span className="emoji" aria-label="Money icon">💰</span>
            <h2>Sell</h2>
            <p>List your old electronics and get the best price from verified buyers</p>
        </div>
        <div className='SellBuyExchange-card'>
            <span className="emoji" aria-label="Shopping cart icon">🛒</span>
            <h2>Buy</h2>
            <p>Browse quality pre-owned electronics at amazing prices</p>
        </div>
        <div className='SellBuyExchange-card'>
            <span className="emoji" aria-label="Exchange icon">🔄</span>
            <h2>Exchange</h2>
            <p>Swap your device for another one without any hassle</p>
        </div>
      </div>
    </div>
  )
}

export default SellBuyExchange
