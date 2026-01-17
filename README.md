# XOWNER - Electronic Devices Marketplace

A modern React-based marketplace for buying, selling, and exchanging electronic devices like smartphones, laptops, tablets, and accessories.

## 🚀 Features

### Core Functionality
- **Product Browsing**: View featured products with detailed information
- **Advanced Search**: Real-time search with filtering by categories, brands, and models
- **Product Categories**: Mobile Phones, Laptops, Tablets, and Accessories
- **Product Details**: Comprehensive product pages with specifications and seller info
- **Multi-step Listing**: Professional product listing with image upload
- **Exchange System**: Trade devices with other users

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean interface with React Icons and smooth animations
- **Multi-step Forms**: Guided selling process with validation
- **Real-time Status**: Online/offline status indicator
- **Interactive Elements**: Hover effects and smooth transitions

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router DOM
- **Build Tool**: Vite
- **Styling**: CSS3 with modern features (Grid, Flexbox, Gradients)
- **Icons**: React Icons (Font Awesome)
- **State Management**: React Hooks (useState, useEffect)
- **Responsive**: Mobile-first design approach

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd XOWNER
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage

### For Buyers
- Browse products on homepage
- Use search to find specific items
- Filter by categories or brands
- View detailed product information
- Contact sellers directly

### For Sellers
- Click "Sell" in header
- Complete 4-step listing process:
  1. Basic Information
  2. Pricing & Description
  3. Images & Specifications
  4. Final Details
- Upload up to 5 product images
- Set location and contact preferences

### Demo Account
- **Email**: demo@xowner.com
- **Password**: demo123

## 📁 Project Structure

```
XOWNER/
├── src/
│   ├── components/
│   │   ├── About/           # About page
│   │   ├── Body/            # Homepage body
│   │   ├── Footer/          # Footer component
│   │   ├── Header/          # Navigation header
│   │   ├── Login/           # Authentication
│   │   ├── ProductCard/     # Product grid & search
│   │   ├── ProductDetails/  # Product detail page
│   │   ├── SellProduct/     # Multi-step selling form
│   │   └── SellBuyExchange/ # How it works section
│   ├── utils/
│   │   ├── mockData.jsx     # Sample data
│   │   ├── useOnlineStatus.jsx # Online status hook
│   │   └── useGeolocation.jsx  # Location detection
│   ├── App.jsx              # Main app component
│   ├── main.jsx            # Entry point
│   └── style.css           # Global styles
├── package.json
├── .gitignore
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: #007bff (Blue)
- **Success**: #28a745 (Green)
- **Warning**: #ffc107 (Yellow)
- **Danger**: #dc3545 (Red)
- **Background**: #f8f9fa (Light Gray)

### Typography
- **Font Family**: System fonts for optimal performance
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with good line height

## 📱 Responsive Design

- **Desktop**: Full-featured experience with grid layouts
- **Tablet**: Adapted layouts with touch-friendly interfaces
- **Mobile**: Optimized for small screens with hamburger navigation

## 🔧 Key Components

### ProductCard
- Product grid with search functionality
- Real-time filtering and sorting
- Responsive card layout with hover effects

### ProductDetails
- Comprehensive product information
- Image gallery with thumbnails
- Seller information and contact options

### SellProduct
- 4-step guided selling process
- Image upload with preview
- Form validation and error handling

### Header
- Responsive navigation with mobile menu
- Geolocation integration
- Online status indicator

## 🚀 Performance Features

- Lazy loading of images
- Efficient re-rendering with proper React keys
- Memory leak prevention in event listeners
- Optimized bundle size with Vite
- Mobile-first responsive design

## 🔒 Security Features

- Input validation on all forms
- XSS protection through React's built-in escaping
- Safe image handling with error fallbacks
- Secure routing with error boundaries

## 🐛 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- Modern ES6+ JavaScript
- Functional components with hooks
- CSS modules for component styling
- Consistent naming conventions

## 🔮 Future Enhancements

- User authentication with JWT
- Real-time chat between users
- Payment gateway integration
- Push notifications
- Advanced filtering options
- Wishlist functionality
- Rating and review system
- Admin dashboard

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Project Type**: Electronic Devices Marketplace
- **Framework**: React with Vite
- **Design**: Modern, responsive, mobile-first

## 📞 Support

For support or questions:
- Create an issue in the repository
- Email: support@xowner.com

---

**XOWNER** - Making electronic device trading simple, secure, and efficient! 🚀