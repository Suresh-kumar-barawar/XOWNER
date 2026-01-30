// mockData.js - Mock data for XOWNER e-commerce platform

// Utility function to get condition-based styling
export const getConditionStyle = (condition) => {
  const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
  
  switch (condition) {
    case 'excellent':
      return `${baseClasses} bg-green-100 text-green-800`;
    case 'good':
      return `${baseClasses} bg-blue-100 text-blue-800`;
    case 'average':
      return `${baseClasses} bg-orange-100 text-orange-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};

export const products = [
  // MOBILE PHONES
  {
    id: "mob_001",
    title: "iPhone 13 Pro Max",
    category: "mobile",
    brand: "Apple",
    model: "iPhone 13 Pro Max",
    condition: "excellent", // excellent, good, fair
    price: 65000,
    originalPrice: 129900,
    listingType: "sell", // sell, buy, exchange
    description:
      "128GB, Sierra Blue, excellent condition with minimal scratches. Battery health 92%. Comes with original box and charger.",
    specifications: {
      storage: "128GB",
      ram: "6GB",
      display: "6.7 inch Super Retina XDR",
      processor: "A15 Bionic",
      camera: "12MP Triple Camera",
      battery: "4352 mAh",
      os: "iOS 17",
    },
    images: [
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400",
      "https://images.unsplash.com/photo-1632633728024-e1fd4bef561a?w=400",
    ],
    seller: {
      id: "user_101",
      name: "Rajesh Kumar",
      rating: 4.8,
      location: "Mumbai, Maharashtra",
      joinedDate: "2023-05-12",
    },
    postedDate: "2024-12-28",
    views: 245,
    interested: 12,
    status: "available", // available, sold, reserved
    warranty: false,
    accessories: ["Original Box", "Charger", "Case"],
  },
  {
    id: "mob_002",
    title: "Samsung Galaxy S23 Ultra",
    category: "mobile",
    brand: "Samsung",
    model: "Galaxy S23 Ultra",
    condition: "good",
    price: 85000,
    originalPrice: 124999,
    listingType: "exchange",
    description:
      "256GB Phantom Black. Minor scratches on back. Looking to exchange for iPhone 14 Pro or above. Battery health excellent.",
    specifications: {
      storage: "256GB",
      ram: "12GB",
      display: "6.8 inch Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 2",
      camera: "200MP Quad Camera",
      battery: "5000 mAh",
      os: "Android 14",
    },
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
    ],
    seller: {
      id: "user_102",
      name: "Priya Sharma",
      rating: 4.5,
      location: "Delhi, NCR",
      joinedDate: "2023-08-20",
    },
    exchangePreferences: ["iPhone 14 Pro", "iPhone 15", "Nothing Phone 2"],
    postedDate: "2025-01-02",
    views: 189,
    interested: 8,
    status: "available",
    warranty: true,
    warrantyUntil: "2025-06-15",
    accessories: ["Charger", "USB Cable", "S Pen"],
  },
  {
    id: "mob_003",
    title: "OnePlus 11 5G",
    category: "mobile",
    brand: "OnePlus",
    model: "OnePlus 11",
    condition: "excellent",
    price: 42000,
    originalPrice: 56999,
    listingType: "sell",
    description:
      "16GB RAM, 256GB Storage, Eternal Green. Like new condition, barely used for 3 months. All accessories included.",
    specifications: {
      storage: "256GB",
      ram: "16GB",
      display: "6.7 inch AMOLED",
      processor: "Snapdragon 8 Gen 2",
      camera: "50MP Triple Camera",
      battery: "5000 mAh",
      os: "OxygenOS 13",
    },
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    ],
    seller: {
      id: "user_103",
      name: "Amit Patel",
      rating: 4.9,
      location: "Bangalore, Karnataka",
      joinedDate: "2022-11-05",
    },
    postedDate: "2024-12-30",
    views: 156,
    interested: 15,
    status: "available",
    warranty: true,
    warrantyUntil: "2025-09-20",
    accessories: [
      "Original Box",
      "Charger",
      "USB Cable",
      "Case",
      "Screen Guard",
    ],
  },

  // TABLETS
  {
    id: "tab_001",
    title: "iPad Pro 11-inch (2023)",
    category: "tablet",
    brand: "Apple",
    model: "iPad Pro 11",
    condition: "excellent",
    price: 68000,
    originalPrice: 81900,
    listingType: "sell",
    description:
      "128GB WiFi model, Space Gray. Mint condition with Magic Keyboard and Apple Pencil included. Perfect for productivity.",
    specifications: {
      storage: "128GB",
      ram: "8GB",
      display: "11 inch Liquid Retina",
      processor: "M2 Chip",
      connectivity: "WiFi",
      battery: "All day battery life",
      os: "iPadOS 17",
    },
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      "https://images.unsplash.com/photo-1585790050230-5dd28404f905?w=400",
    ],
    seller: {
      id: "user_104",
      name: "Sneha Reddy",
      rating: 4.7,
      location: "Hyderabad, Telangana",
      joinedDate: "2023-03-18",
    },
    postedDate: "2025-01-01",
    views: 98,
    interested: 6,
    status: "available",
    warranty: true,
    warrantyUntil: "2025-08-10",
    accessories: [
      "Magic Keyboard",
      "Apple Pencil 2nd Gen",
      "Original Charger",
      "Box",
    ],
  },
  {
    id: "tab_002",
    title: "Samsung Galaxy Tab S9",
    category: "tablet",
    brand: "Samsung",
    model: "Galaxy Tab S9",
    condition: "good",
    price: 38000,
    originalPrice: 52999,
    listingType: "exchange",
    description:
      "256GB WiFi model with S Pen. Minor scratches on screen. Looking to exchange for iPad Air or similar.",
    specifications: {
      storage: "256GB",
      ram: "8GB",
      display: "11 inch AMOLED",
      processor: "Snapdragon 8 Gen 2",
      connectivity: "WiFi",
      battery: "8400 mAh",
      os: "Android 13",
    },
    images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400"],
    seller: {
      id: "user_105",
      name: "Vikram Singh",
      rating: 4.6,
      location: "Pune, Maharashtra",
      joinedDate: "2023-07-22",
    },
    exchangePreferences: ["iPad Air", "iPad 10th Gen", "Surface Go"],
    postedDate: "2024-12-27",
    views: 72,
    interested: 4,
    status: "available",
    warranty: false,
    accessories: ["S Pen", "Book Cover", "Charger"],
  },

  // LAPTOPS
  {
    id: "lap_001",
    title: "MacBook Air M2 (2023)",
    category: "laptop",
    brand: "Apple",
    model: "MacBook Air M2",
    condition: "excellent",
    price: 95000,
    originalPrice: 119900,
    listingType: "sell",
    description:
      "13-inch, 256GB SSD, 8GB RAM, Midnight color. Like new, used only for 4 months. Perfect for students and professionals.",
    specifications: {
      storage: "256GB SSD",
      ram: "8GB",
      display: "13.6 inch Liquid Retina",
      processor: "Apple M2",
      graphics: "8-core GPU",
      battery: "Up to 18 hours",
      os: "macOS Sonoma",
    },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    ],
    seller: {
      id: "user_106",
      name: "Ananya Iyer",
      rating: 4.9,
      location: "Chennai, Tamil Nadu",
      joinedDate: "2022-12-10",
    },
    postedDate: "2024-12-29",
    views: 312,
    interested: 18,
    status: "available",
    warranty: true,
    warrantyUntil: "2025-10-15",
    accessories: ["Original Box", "USB-C Charger", "Cable", "Laptop Sleeve"],
  },
  {
    id: "lap_002",
    title: "Dell XPS 15 (2023)",
    category: "laptop",
    brand: "Dell",
    model: "XPS 15 9530",
    condition: "good",
    price: 125000,
    originalPrice: 184990,
    listingType: "sell",
    description:
      "Intel i7-13700H, 16GB RAM, 512GB SSD, NVIDIA RTX 4050. Excellent for gaming and content creation. Minor wear on palmrest.",
    specifications: {
      storage: "512GB SSD",
      ram: "16GB DDR5",
      display: "15.6 inch FHD+ Touch",
      processor: "Intel i7-13700H",
      graphics: "NVIDIA RTX 4050",
      battery: "86Wh",
      os: "Windows 11 Pro",
    },
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
    ],
    seller: {
      id: "user_107",
      name: "Rahul Mehta",
      rating: 4.5,
      location: "Ahmedabad, Gujarat",
      joinedDate: "2023-04-15",
    },
    postedDate: "2025-01-03",
    views: 201,
    interested: 9,
    status: "available",
    warranty: true,
    warrantyUntil: "2025-11-20",
    accessories: ["Charger", "Original Box", "Laptop Bag"],
  },
  {
    id: "lap_003",
    title: "Lenovo ThinkPad X1 Carbon Gen 11",
    category: "laptop",
    brand: "Lenovo",
    model: "ThinkPad X1 Carbon",
    condition: "excellent",
    price: 110000,
    originalPrice: 156990,
    listingType: "exchange",
    description:
      "Intel i7-1355U, 16GB RAM, 512GB SSD. Business class laptop in pristine condition. Looking to exchange for MacBook Pro 14.",
    specifications: {
      storage: "512GB SSD",
      ram: "16GB LPDDR5",
      display: "14 inch WUXGA IPS",
      processor: "Intel i7-1355U",
      graphics: "Intel Iris Xe",
      battery: "57Wh",
      os: "Windows 11 Pro",
    },
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
    ],
    seller: {
      id: "user_108",
      name: "Kavita Desai",
      rating: 4.8,
      location: "Kolkata, West Bengal",
      joinedDate: "2023-01-28",
    },
    exchangePreferences: [
      "MacBook Pro 14",
      "MacBook Pro 16",
      "Surface Laptop Studio",
    ],
    postedDate: "2024-12-31",
    views: 167,
    interested: 11,
    status: "available",
    warranty: true,
    warrantyUntil: "2026-03-15",
    accessories: ["Charger", "Docking Station", "Laptop Bag"],
  },

  // OTHER ELECTRONICS
  {
    id: "oth_001",
    title: "Apple Watch Series 8 (45mm)",
    category: "other",
    subcategory: "smartwatch",
    brand: "Apple",
    model: "Watch Series 8",
    condition: "excellent",
    price: 32000,
    originalPrice: 45900,
    listingType: "sell",
    description:
      "GPS + Cellular, Midnight Aluminum Case with Sport Band. Barely used, like new condition with all accessories.",
    specifications: {
      display: "45mm Always-On Retina",
      connectivity: "GPS + Cellular",
      sensors: "Blood Oxygen, ECG, Temperature",
      battery: "Up to 18 hours",
      waterproof: "50m water resistant",
    },
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400",
    ],
    seller: {
      id: "user_109",
      name: "Arjun Kapoor",
      rating: 4.7,
      location: "Jaipur, Rajasthan",
      joinedDate: "2023-06-08",
    },
    postedDate: "2024-12-26",
    views: 134,
    interested: 7,
    status: "available",
    warranty: true,
    warrantyUntil: "2025-07-10",
    accessories: ["Charging Cable", "Original Box", "Extra Sport Band"],
  },
  {
    id: "oth_002",
    title: "Sony WH-1000XM5 Headphones",
    category: "other",
    subcategory: "audio",
    brand: "Sony",
    model: "WH-1000XM5",
    condition: "good",
    price: 22000,
    originalPrice: 34990,
    listingType: "sell",
    description:
      "Black color, premium noise cancelling headphones. Minor wear on ear cups. Works perfectly with all features intact.",
    specifications: {
      type: "Over-ear, Wireless",
      noiseCancelling: "Industry-leading ANC",
      battery: "Up to 30 hours",
      connectivity: "Bluetooth 5.2",
      weight: "250g",
    },
    images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400"],
    seller: {
      id: "user_110",
      name: "Meera Nair",
      rating: 4.6,
      location: "Kochi, Kerala",
      joinedDate: "2023-09-14",
    },
    postedDate: "2025-01-02",
    views: 89,
    interested: 5,
    status: "available",
    warranty: false,
    accessories: ["Carrying Case", "Charging Cable", "Audio Cable"],
  },
  {
    id: "oth_003",
    title: 'Samsung 27" 4K Monitor',
    category: "other",
    subcategory: "monitor",
    brand: "Samsung",
    model: "LU28E590DS",
    condition: "excellent",
    price: 18000,
    originalPrice: 28500,
    listingType: "sell",
    description:
      "3840x2160 resolution, perfect for productivity and content creation. No dead pixels, excellent condition.",
    specifications: {
      size: "27 inch",
      resolution: "4K UHD (3840x2160)",
      panelType: "TN",
      refreshRate: "60Hz",
      connectivity: "HDMI, DisplayPort",
    },
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    ],
    seller: {
      id: "user_111",
      name: "Sanjay Gupta",
      rating: 4.8,
      location: "Noida, Uttar Pradesh",
      joinedDate: "2022-10-30",
    },
    postedDate: "2024-12-28",
    views: 145,
    interested: 8,
    status: "available",
    warranty: false,
    accessories: ["Power Cable", "HDMI Cable", "Stand"],
  },
];

// Category data for filtering
export const categories = [
  {
    id: "mobile",
    name: "Mobile Phones",
    icon: "📱",
    count: products.filter((p) => p.category === "mobile").length,
  },
  {
    id: "tablet",
    name: "Tablets",
    icon: "📲",
    count: products.filter((p) => p.category === "tablet").length,
  },
  {
    id: "laptop",
    name: "Laptops",
    icon: "💻",
    count: products.filter((p) => p.category === "laptop").length,
  },
  {
    id: "other",
    name: "Accessories",
    icon: "🎧",
    count: products.filter((p) => p.category === "other").length,
  },
];

// Popular brands
export const brands = [
    "All Brands",
  "Apple",
  "Samsung",
  "OnePlus",
  "Dell",
  "Lenovo",
  "HP",
  "Asus",
  "Sony",
  "Google",
  "Nothing",
];

// Condition options
export const conditions = [
  {
    value: "excellent",
    label: "Excellent",
    description: "Like new, minimal signs of use",
  },
  {
    value: "good",
    label: "Good",
    description: "Normal wear, fully functional",
  },
  { value: "fair", label: "Fair", description: "Visible wear, works properly" },
];

// Listing types
export const listingTypes = [
  { value: "sell", label: "Sell", icon: "💰" },
  { value: "exchange", label: "Exchange", icon: "🔄" },
];

export default products;
