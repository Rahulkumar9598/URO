import React, { useState, useEffect } from 'react';
import { 
  FaShoppingCart, 
  FaUser, 
  FaHeart, 
  FaSearch, 
  FaBars,
  FaTimes,
  FaFilter,
  FaStar,
  FaStarHalfAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaCartPlus,
  FaShoePrints
} from 'react-icons/fa';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaPinterestP 
} from 'react-icons/fa';

const FootwearPage = () => {
  // State Management
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Sport Pro Running Shoes",
      description: "Lightweight running shoes with cushion technology for maximum comfort.",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.5,
      reviewCount: 128,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["red", "blue", "black"],
      sizes: [7, 8, 9, 10],
      category: "sports",
      trending: true,
      inStock: true,
      liked: false
    },
    {
      id: 2,
      name: "Urban Casual Sneakers",
      description: "Stylish sneakers perfect for everyday wear with comfort fit.",
      price: 64.99,
      originalPrice: null,
      rating: 4.0,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["white", "black", "gray"],
      sizes: [6, 7, 8, 9],
      category: "casual",
      trending: false,
      inStock: true,
      liked: false
    },
    {
      id: 3,
      name: "Kids Sports Shoes",
      description: "Durable and comfortable sports shoes for active kids.",
      price: 49.99,
      originalPrice: 59.99,
      rating: 5.0,
      reviewCount: 56,
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["blue", "red", "green"],
      sizes: [3, 4, 5, 6],
      category: "kids",
      bestSeller: true,
      inStock: true,
      liked: true
    },
    {
      id: 4,
      name: "Classic Formal Shoes",
      description: "Elegant formal shoes for business and special occasions.",
      price: 89.99,
      originalPrice: null,
      rating: 4.5,
      reviewCount: 42,
      image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["black", "brown"],
      sizes: [7, 8, 9, 10, 11],
      category: "formal",
      trending: false,
      inStock: true,
      liked: false
    },
    {
      id: 5,
      name: "Comfort Beach Sandals",
      description: "Lightweight sandals perfect for beach and casual outings.",
      price: 34.99,
      originalPrice: 44.99,
      rating: 4.0,
      reviewCount: 73,
      image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["blue", "brown", "black"],
      sizes: [6, 7, 8, 9],
      category: "casual",
      newArrival: true,
      inStock: true,
      liked: false
    },
    {
      id: 6,
      name: "Premium Hiking Boots",
      description: "Waterproof hiking boots with ankle support for outdoor adventures.",
      price: 129.99,
      originalPrice: null,
      rating: 5.0,
      reviewCount: 31,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      colors: ["brown", "green", "gray"],
      sizes: [8, 9, 10, 11],
      category: "sports",
      trending: false,
      inStock: true,
      liked: false
    }
  ]);

  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(3);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [priceRange, setPriceRange] = useState(100);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedTrend, setSelectedTrend] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [activeCategory, setActiveCategory] = useState('All Products');

  // Colors available for filtering
  const colors = [
    { name: "Red", value: "red", class: "bg-red-500" },
    { name: "Blue", value: "blue", class: "bg-blue-500" },
    { name: "Black", value: "black", class: "bg-black" },
    { name: "White", value: "white", class: "bg-white border" },
    { name: "Green", value: "green", class: "bg-green-500" },
    { name: "Pink", value: "pink", class: "bg-pink-400" }
  ];

  const sizes = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const categories = ["All Products", "Running Shoes", "Casual Sneakers", "Sandals", "Formal Shoes", "Kids Footwear"];

  // Add to cart function
  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartCount(cartCount + 1);
    
    // Update the button state temporarily
    const updatedProducts = products.map(p => 
      p.id === product.id ? { ...p, addedToCart: true } : p
    );
    setProducts(updatedProducts);
    
    // Reset button state after 2 seconds
    setTimeout(() => {
      const resetProducts = products.map(p => 
        p.id === product.id ? { ...p, addedToCart: false } : p
      );
      setProducts(resetProducts);
    }, 2000);
  };

  // Toggle like status
  const toggleLike = (productId) => {
    const updatedProducts = products.map(product => 
      product.id === productId ? { ...product, liked: !product.liked } : product
    );
    setProducts(updatedProducts);
  };

  // Color selection
  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // Size selection
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };

  // Filter products based on criteria
  const filteredProducts = products.filter(product => {
    // Price filter
    if (product.price > priceRange) return false;
    
    // Color filter
    if (selectedColors.length > 0 && !selectedColors.some(color => product.colors.includes(color))) return false;
    
    // Size filter
    if (selectedSizes.length > 0 && !selectedSizes.some(size => product.sizes.includes(size))) return false;
    
    // Rating filter
    if (selectedRating > 0 && product.rating < selectedRating) return false;
    
    // Trend filter
    if (selectedTrend === 'trending' && !product.trending) return false;
    if (selectedTrend === 'bestSeller' && !product.bestSeller) return false;
    if (selectedTrend === 'newArrival' && !product.newArrival) return false;
    
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Category filter
    if (activeCategory !== 'All Products') {
      const categoryMap = {
        'Running Shoes': 'sports',
        'Casual Sneakers': 'casual',
        'Sandals': 'casual',
        'Formal Shoes': 'formal',
        'Kids Footwear': 'kids'
      };
      if (product.category !== categoryMap[activeCategory]) return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 mt-30">
      {/* Header */}
      {/* <header className="bg-red-400 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className="md:hidden text-white text-xl">
                <FaBars />
              </button>
              <h1 className="text-2xl font-bold flex items-center">
                <FaShoePrints className="mr-2" />
                Footwear Store
              </h1>
            </div>
            
   
            <div className="hidden md:flex flex-grow max-w-2xl mx-6">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Search shoes by name, brand, color..." 
                  className="w-full px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-white rounded-r-lg text-gray-600 hover:text-gray-800">
                  <FaSearch />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:block">
                <button className="text-white hover:text-gray-200">
                  <FaHeart className="text-xl" />
                </button>
              </div>
              
              <div className="relative">
                <button 
                  className="text-white hover:text-gray-200 relative"
                  onClick={() => setShowCartSidebar(true)}
                >
                  <FaShoppingCart className="text-xl" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                </button>
              </div>
              
              <button className="bg-white text-red-400 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 flex items-center">
                <FaUser className="mr-2" />
                Account
              </button>
            </div>
          </div>
      
          <div className="mt-4 md:hidden">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search shoes..." 
                className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-0 top-0 h-full px-4 text-gray-600">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block bg-red-500">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex space-x-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`font-medium hover:text-gray-200 ${activeCategory === category ? 'text-gray-200 underline' : 'text-white'}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="text-white font-medium flex items-center">
                <FaPhoneAlt className="mr-2" />
                Customer Support: 1-800-FOOTWEAR
              </div>
            </div>
          </div>
        </div>
      </header> */}
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-red-400 border-b pb-2">Filters</h2>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">$10</span>
                  <span className="text-sm text-gray-600">$200</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="200" 
                  value={priceRange} 
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer bg-red-400"
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                />
                <div className="mt-2 text-center">
                  <span className="text-sm font-medium">Up to: ${priceRange}</span>
                </div>
              </div>
              
              {/* Color Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      className={`w-8 h-8 rounded-full border-2 ${color.class} ${selectedColors.includes(color.value) ? 'border-red-400' : 'border-gray-300'}`}
                      onClick={() => toggleColor(color.value)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Rating</h3>
                <div className="space-y-2">
                  {[4.5, 4, 3].map((rating) => (
                    <label key={rating} className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="mr-2 rounded text-red-500 focus:ring-red-400"
                      />
                      <div className="flex items-center">
                        {renderStars(rating)}
                        <span className="text-gray-600 ml-2">& above</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Trend Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Trend</h3>
                <div className="space-y-2">
                  {['trending', 'bestSeller', 'newArrival'].map((trend) => (
                    <label key={trend} className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="trend"
                        checked={selectedTrend === trend}
                        onChange={() => setSelectedTrend(trend)}
                        className="mr-2 rounded text-red-500 focus:ring-red-400"
                      />
                      <span className="capitalize">{trend.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 rounded-md ${selectedSizes.includes(size) ? 'bg-red-400 text-white' : 'border hover:bg-red-50 hover:border-red-400'}`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                className="w-full bg-red-400 text-white py-3 rounded-lg font-semibold hover:bg-red-500 transition-colors"
                onClick={() => {
                  setSelectedColors([]);
                  setSelectedSizes([]);
                  setSelectedRating(0);
                  setSelectedTrend('');
                  setPriceRange(100);
                  setSearchQuery('');
                }}
              >
                Clear All Filters
              </button>
            </div>
          </aside>
          
          {/* Products Section */}
          <section className="md:w-3/4">
            {/* Page Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Footwear Collection</h1>
                  <p className="text-gray-600 mt-2">Discover the perfect shoes for every occasion</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-2">Sort by:</span>
                    <select 
                      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="popularity">Popularity</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="rating">Customer Rating</option>
                    </select>
                  </div>
                  
                  <button 
                    className="md:hidden bg-red-400 text-white px-4 py-2 rounded-lg font-semibold flex items-center"
                    onClick={() => setShowMobileFilters(true)}
                  >
                    <FaFilter className="mr-2" />
                    Filters
                  </button>
                </div>
              </div>
              
              {/* Trend Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === category ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-56 object-cover"
                    />
                    <button 
                      className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:text-red-500"
                      onClick={() => toggleLike(product.id)}
                    >
                      <FaHeart className={`${product.liked ? 'text-red-500' : ''}`} />
                    </button>
                    
                    {product.trending && (
                      <span className="absolute top-3 left-3 bg-red-400 text-white text-xs font-bold px-2 py-1 rounded">
                        TRENDING
                      </span>
                    )}
                    {product.bestSeller && (
                      <span className="absolute top-3 left-3 bg-red-400 text-white text-xs font-bold px-2 py-1 rounded">
                        BEST SELLER
                      </span>
                    )}
                    {product.newArrival && (
                      <span className="absolute top-3 left-3 bg-red-400 text-white text-xs font-bold px-2 py-1 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-gray-600 text-sm ml-2">({product.rating})</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      
                      <button 
                        className={`px-4 py-2 rounded-lg font-semibold flex items-center transition-colors ${product.addedToCart ? 'bg-green-500 text-white' : 'bg-red-400 text-white hover:bg-red-500'}`}
                        onClick={() => addToCart(product)}
                        disabled={product.addedToCart}
                      >
                        {product.addedToCart ? (
                          <>
                            <FaCheck className="mr-2" />
                            Added
                          </>
                        ) : (
                          <>
                            <FaCartPlus className="mr-2" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                    
                    {/* Color and Size Preview */}
                    <div className="flex items-center mt-4 space-x-4">
                      <div className="flex space-x-1">
                        {product.colors.slice(0, 3).map((color, index) => (
                          <div 
                            key={index}
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        Sizes: {product.sizes.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-10 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600">
                  <FaChevronLeft />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-400 text-white">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600">3</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600">4</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600">5</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600">
                  <FaChevronRight />
                </button>
              </nav>
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer */}
    
      
      {/* Mobile Filter Panel */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:hidden">
          <div className="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-red-400">Filters</h3>
              <button 
                className="text-2xl text-gray-500"
                onClick={() => setShowMobileFilters(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            {/* Mobile Filters Content */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
                <input 
                  type="range" 
                  min="10" 
                  max="200" 
                  value={priceRange} 
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer bg-red-400"
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                />
                <div className="mt-2 text-center">
                  <span className="text-sm font-medium">Up to: ${priceRange}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      className={`w-8 h-8 rounded-full border-2 ${color.class} ${selectedColors.includes(color.value) ? 'border-red-400' : 'border-gray-300'}`}
                      onClick={() => toggleColor(color.value)}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.slice(0, 5).map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 rounded-md ${selectedSizes.includes(size) ? 'bg-red-400 text-white' : 'border hover:bg-red-50 hover:border-red-400'}`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                className="flex-1 bg-red-400 text-white py-3 rounded-lg font-semibold hover:bg-red-500"
                onClick={() => setShowMobileFilters(false)}
              >
                Apply Filters
              </button>
              <button 
                className="flex-1 border border-red-400 text-red-400 py-3 rounded-lg font-semibold hover:bg-red-50"
                onClick={() => {
                  setSelectedColors([]);
                  setSelectedSizes([]);
                  setPriceRange(100);
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Cart Sidebar */}
      {showCartSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50  flex justify-end">
          <div className="bg-white w-full md:w-96 h-full overflow-y-auto">
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-red-400">Your Cart</h3>
                <button 
                  className="text-2xl text-gray-500"
                  onClick={() => setShowCartSidebar(false)}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-10">
                    <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="border-b py-4">
                      <div className="flex">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="font-bold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600">Size: 8 | Color: Red</p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center">
                              <button className="w-6 h-6 border rounded-full flex items-center justify-center">-</button>
                              <span className="mx-3">1</span>
                              <button className="w-6 h-6 border rounded-full flex items-center justify-center">+</button>
                            </div>
                            <span className="font-bold">${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-bold">$5.99</span>
                </div>
                <div className="flex justify-between text-xl font-bold mb-6">
                  <span>Total</span>
                  <span className="text-red-400">${(cartTotal + 5.99).toFixed(2)}</span>
                </div>
                
                <button className="w-full bg-red-400 text-white py-3 rounded-lg font-bold hover:bg-red-500 mb-3">
                  Proceed to Checkout
                </button>
                <button 
                  className="w-full border border-red-400 text-red-400 py-3 rounded-lg font-bold hover:bg-red-50"
                  onClick={() => setShowCartSidebar(false)}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FootwearPage;