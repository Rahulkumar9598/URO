import React, { useState, useEffect } from 'react'
import data from '../assets/girlFashion.json'
import { 
  FaHeart, 
  FaShoppingCart, 
  FaSearch, 
  FaFilter,
  FaStar,
  FaTshirt,
  FaTag,
  FaTimes,
  FaSortAmountDown,
  FaSortAmountUp,
  FaFire,
  FaCrown,
  FaGem,
  FaRocket,
  FaBolt,
  FaPalette,
  FaMagic
} from 'react-icons/fa'
import { 
  BsFillGridFill, 
  BsList, 
  BsClock,
  BsLightningCharge,
  BsArrowRight
} from 'react-icons/bs'
import { GiDress, GiShoppingBag } from 'react-icons/gi'
import { motion, AnimatePresence } from 'framer-motion'

const GirlFashion = () => {
    // State Management
    const [products, setProducts] = useState(data)
    const [filteredProducts, setFilteredProducts] = useState(data)
    const [cart, setCart] = useState({})
    const [likes, setLikes] = useState({})
    const [searchTerm, setSearchTerm] = useState('')
    const [priceRange, setPriceRange] = useState([0, 10000])
    const [selectedColors, setSelectedColors] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedSizes, setSelectedSizes] = useState([])
    const [sortBy, setSortBy] = useState('trending')
    const [showFilters, setShowFilters] = useState(false)
    const [viewMode, setViewMode] = useState('grid')
    const [activeTrend, setActiveTrend] = useState('all')
    const [isScrolled, setIsScrolled] = useState(false)
    
    // Available filters from data
    const allColors = [...new Set(data.map(item => item.color).filter(Boolean))]
    const allCategories = [...new Set(data.map(item => item.category).filter(Boolean))]
    const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    
    // Trending categories
    const trends = [
        { id: 'summer', label: '🌞 Summer Vibes', icon: <FaFire /> },
        { id: 'party', label: '🎉 Party Wear', icon: <FaCrown /> },
        { id: 'casual', label: '👚 Casual', icon: <FaTshirt /> },
        { id: 'premium', label: '💎 Premium', icon: <FaGem /> },
        { id: 'new', label: '✨ New Arrivals', icon: <FaRocket /> },
        { id: 'sale', label: '🔥 Hot Sale', icon: <FaBolt /> }
    ]

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Load from localStorage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('girlCart')) || {}
        const savedLikes = JSON.parse(localStorage.getItem('girlLikes')) || {}
        setCart(savedCart)
        setLikes(savedLikes)
    }, [])

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('girlCart', JSON.stringify(cart))
        localStorage.setItem('girlLikes', JSON.stringify(likes))
    }, [cart, likes])

    // Handle filters
    useEffect(() => {
        let filtered = [...products]
        
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        
        filtered = filtered.filter(item => 
            item.price >= priceRange[0] && item.price <= priceRange[1]
        )
        
        if (selectedColors.length > 0) {
            filtered = filtered.filter(item => 
                selectedColors.includes(item.color?.toLowerCase())
            )
        }
        
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(item => 
                selectedCategories.includes(item.category?.toLowerCase())
            )
        }
        
        // Trend filters
        if (activeTrend !== 'all') {
            switch(activeTrend) {
                case 'sale':
                    filtered = filtered.filter(item => item.discount_percent > 20)
                    break
                case 'new':
                    filtered = filtered.filter(item => item.isNew)
                    break
                case 'premium':
                    filtered = filtered.filter(item => item.price > 2000)
                    break
                case 'party':
                    filtered = filtered.filter(item => item.category?.toLowerCase().includes('party') || item.name?.toLowerCase().includes('party'))
                    break
                case 'summer':
                    filtered = filtered.filter(item => 
                        ['yellow', 'orange', 'pink', 'lightblue', 'white'].includes(item.color?.toLowerCase()) ||
                        item.category?.toLowerCase().includes('summer')
                    )
                    break
            }
        }
        
        switch(sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price)
                break
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price)
                break
            case 'discount':
                filtered.sort((a, b) => (b.discount_percent || 0) - (a.discount_percent || 0))
                break
            case 'trending':
                filtered.sort((a, b) => (b.trendingScore || Math.random()) - (a.trendingScore || Math.random()))
                break
            default:
                break
        }
        
        setFilteredProducts(filtered)
    }, [searchTerm, priceRange, selectedColors, selectedCategories, selectedSizes, sortBy, activeTrend, products])

    // Handlers
    const handleLike = (productId) => {
        setLikes(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }))
    }

    const handleAddToCart = (productId) => {
        setCart(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1
        }))
        
        // Animation feedback
        const button = document.getElementById(`cart-btn-${productId}`)
        if (button) {
            button.classList.add('scale-110')
            setTimeout(() => button.classList.remove('scale-110'), 300)
        }
    }

    const handleIncreaseQuantity = (productId) => {
        setCart(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1
        }))
    }

    const handleDecreaseQuantity = (productId) => {
        if (cart[productId] > 1) {
            setCart(prev => ({
                ...prev,
                [productId]: prev[productId] - 1
            }))
        } else {
            const { [productId]: removed, ...rest } = cart
            setCart(rest)
        }
    }

    const handleClearFilters = () => {
        setSearchTerm('')
        setPriceRange([0, 10000])
        setSelectedColors([])
        setSelectedCategories([])
        setSelectedSizes([])
        setActiveTrend('all')
        setSortBy('trending')
    }

    // Helper functions
    const formatPrice = (price) => {
        return `₹${price?.toLocaleString('en-IN') || '0'}`
    }

    const calculateDiscountPrice = (price, discount) => {
        if (!discount) return price
        return price - (price * discount / 100)
    }

    const getCartCount = () => {
        return Object.values(cart).reduce((a, b) => a + b, 0)
    }

    const getLikedCount = () => {
        return Object.values(likes).filter(Boolean).length
    }

    const getRandomGradient = () => {
        const gradients = [
            'from-pink-400 to-red-500',
            'from-purple-400 to-pink-500',
            'from-blue-400 to-cyan-500',
            'from-green-400 to-teal-500',
            'from-yellow-400 to-orange-500',
            'from-red-400 to-orange-500'
        ]
        return gradients[Math.floor(Math.random() * gradients.length)]
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-orange-50">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-pink-200 to-transparent opacity-10"
                        animate={{
                            x: [Math.random() * 100, Math.random() * 100 + 100],
                            y: [Math.random() * 100, Math.random() * 100 + 100],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                ))}
            </div>

            {/* Hero Header */}
            <div className={`relative transition-all duration-300 ${isScrolled ? 'pt-16' : 'pt-20'}`}>
                <div className="relative overflow-hidden">
                    {/* Animated Header */}
                    <motion.div 
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className={`relative bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 transform ${isScrolled ? 'scale-95 rounded-b-3xl shadow-2xl' : 'rounded-b-4xl'}`}
                    >
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                        <div className="container mx-auto px-4 py-8 md:py-12 relative">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                                <div className="text-center lg:text-left">
                                    <motion.h1 
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight"
                                    >
                                         GIRL'S  <span className="text-yellow-300">   FASHION</span>
                                    </motion.h1>
                                    <p className="text-xl md:text-2xl text-white/90 mb-6 font-light">
                                        Where Style Meets Confidence ✨
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group bg-white text-red-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-red-600 transition-all duration-300 shadow-2xl"
                                    >
                                        SHOP NOW <BsArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
                                    </motion.button>
                                </div>
                                
                                <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="hidden lg:block"
                                >
                                    <GiDress className="text-white/20 w-64 h-64" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Bar */}
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="container mx-auto px-4 -mt-6 relative "
                    >
                        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-3xl font-black text-red-500">{data.length}+</div>
                                <div className="text-gray-600 text-sm">Trendy Styles</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-black text-pink-500">{getLikedCount()}</div>
                                <div className="text-gray-600 text-sm">Favorites</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-black text-orange-500">{getCartCount()}</div>
                                <div className="text-gray-600 text-sm">In Cart</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-black text-purple-500">70%</div>
                                <div className="text-gray-600 text-sm">On Sale</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 relative ">
                {/* Trending Categories */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-black text-gray-900">
                            <FaFire className="inline-block mr-3 text-red-500" />
                            Trending Now
                        </h2>
                        <BsClock className="text-gray-400 animate-pulse" />
                    </div>
                    
                    <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide">
                        {trends.map((trend) => (
                            <motion.button
                                key={trend.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveTrend(trend.id)}
                                className={`flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all duration-300 ${activeTrend === trend.id 
                                    ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-2xl' 
                                    : 'bg-white text-gray-700 hover:bg-pink-50 shadow-lg'
                                }`}
                            >
                                {trend.icon}
                                {trend.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Search and Filters Bar */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                >
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-4 md:p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            {/* Magical Search */}
                            <div className="relative flex-1 w-full">
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-2xl blur opacity-30"></div>
                                <div className="relative flex items-center">
                                    <FaMagic className="absolute left-4 text-pink-500" />
                                    <input
                                        type="text"
                                        placeholder="✨ Search magic fashion..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-12 py-4 bg-white/90 backdrop-blur-sm border-0 rounded-2xl focus:ring-4 focus:ring-pink-300 focus:outline-none text-lg placeholder-gray-400"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm('')}
                                            className="absolute right-4 text-gray-400 hover:text-red-500"
                                        >
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex items-center gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center gap-2 px-5 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-2xl transition-all"
                                >
                                    <FaFilter />
                                    {showFilters ? 'Hide' : 'Show'} Filters
                                </motion.button>

                                <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-lg text-red-500' : 'hover:text-red-400'}`}
                                    >
                                        <BsFillGridFill />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-lg text-red-500' : 'hover:text-red-400'}`}
                                    >
                                        <BsList />
                                    </button>
                                </div>

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white/90 backdrop-blur-sm border-0 rounded-2xl px-4 py-4 focus:ring-4 focus:ring-red-300 focus:outline-none font-medium"
                                >
                                    <option value="trending">🔥 Trending</option>
                                    <option value="price-low">💰 Price: Low to High</option>
                                    <option value="price-high">💰 Price: High to Low</option>
                                    <option value="discount">🏷️ Best Discount</option>
                                    <option value="new">✨ New Arrivals</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Filters */}
                        <AnimatePresence>
                            {(selectedColors.length > 0 || selectedCategories.length > 0 || searchTerm) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="mt-4 flex flex-wrap gap-2 overflow-hidden"
                                >
                                    {searchTerm && (
                                        <motion.span 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="bg-gradient-to-r from-pink-100 to-red-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow"
                                        >
                                            🔍 {searchTerm}
                                            <button onClick={() => setSearchTerm('')}><FaTimes /></button>
                                        </motion.span>
                                    )}
                                    {selectedColors.map(color => (
                                        <motion.span 
                                            key={color}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow"
                                        >
                                            <FaPalette /> {color}
                                            <button onClick={() => setSelectedColors(prev => prev.filter(c => c !== color))}>
                                                <FaTimes />
                                            </button>
                                        </motion.span>
                                    ))}
                                    {selectedCategories.map(category => (
                                        <motion.span 
                                            key={category}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow"
                                        >
                                            <GiDress /> {category}
                                            <button onClick={() => setSelectedCategories(prev => prev.filter(c => c !== category))}>
                                                <FaTimes />
                                            </button>
                                        </motion.span>
                                    ))}
                                    <button
                                        onClick={handleClearFilters}
                                        className="text-red-600 hover:text-red-800 text-sm font-bold px-4 py-2 hover:scale-105 transition-transform"
                                    >
                                        ✨ Clear All
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Filters Sidebar */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ x: -300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            className="fixed md:relative inset-y-0 left-0   w-full md:w-64 lg:w-72 bg-white/90 backdrop-blur-lg shadow-2xl md:shadow-xl rounded-2xl md:rounded-3xl overflow-hidden"
                        >
                            <div className="p-6 h-full overflow-y-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-black text-gray-900">🎨 Filters</h3>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="md:hidden text-red-500 hover:scale-110 transition-transform"
                                    >
                                        <FaTimes size={20} />
                                    </button>
                                </div>

                                {/* Colors */}
                                <div className="mb-8">
                                    <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                        <FaPalette className="text-pink-500" /> Colors
                                    </h4>
                                    <div className="grid grid-cols-5 gap-3">
                                        {allColors.map((color, idx) => (
                                            <motion.button
                                                key={idx}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setSelectedColors(prev =>
                                                    prev.includes(color.toLowerCase())
                                                        ? prev.filter(c => c !== color.toLowerCase())
                                                        : [...prev, color.toLowerCase()]
                                                )}
                                                className={`w-10 h-10 rounded-full border-4 ${selectedColors.includes(color.toLowerCase()) 
                                                    ? 'border-red-400 shadow-lg scale-110' 
                                                    : 'border-white shadow'
                                                }`}
                                                style={{ backgroundColor: color.toLowerCase() }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="mb-8">
                                    <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                        <GiDress className="text-red-500" /> Categories
                                    </h4>
                                    <div className="space-y-2">
                                        {allCategories.map((category, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedCategories(prev =>
                                                    prev.includes(category.toLowerCase())
                                                        ? prev.filter(c => c !== category.toLowerCase())
                                                        : [...prev, category.toLowerCase()]
                                                )}
                                                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${selectedCategories.includes(category.toLowerCase()) 
                                                    ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg' 
                                                    : 'bg-gray-50 hover:bg-pink-50 hover:shadow'
                                                }`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span>{category}</span>
                                                    <span className="text-sm opacity-70">
                                                        {data.filter(item => item.category === category).length}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Products Grid */}
                <div className={`${showFilters ? 'md:pl-8' : ''}`}>
                    {/* Results Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900">
                                ✨ Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                                    {filteredProducts.length}
                                </span> Styles
                            </h2>
                            <p className="text-gray-600">Handpicked fashion for the modern girl</p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-pink-600 bg-pink-50 px-4 py-2 rounded-full">
                                <FaHeart />
                                <span className="font-bold">{getLikedCount()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full">
                                <GiShoppingBag />
                                <span className="font-bold">{getCartCount()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    {filteredProducts.length === 0 ? (
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center py-16"
                        >
                            <div className="text-gray-300 mb-6">
                                <GiDress className="w-32 h-32 mx-auto opacity-20" />
                            </div>
                            <h3 className="text-3xl font-black text-gray-700 mb-4">No styles found</h3>
                            <p className="text-gray-500 mb-8 text-lg">Try different filters or search terms</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleClearFilters}
                                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
                            >
                                ✨ Reset All Filters
                            </motion.button>
                        </motion.div>
                    ) : (
                        <div className={viewMode === 'grid' 
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                            : 'space-y-6'
                        }>
                            <AnimatePresence>
                                {filteredProducts.map((product, index) => {
                                    const productId = product.id || index
                                    const isLiked = likes[productId] || false
                                    const quantity = cart[productId] || 0
                                    const discountPrice = calculateDiscountPrice(product.price, product.discount_percent)
                                    const isNew = product.isNew || Math.random() > 0.7
                                    
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                                            animate={{ scale: 1, opacity: 1, y: 0 }}
                                            exit={{ scale: 0.8, opacity: 0, y: -20 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ y: -10 }}
                                            className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 ${viewMode === 'list' ? 'flex' : ''}`}
                                        >
                                            {/* Product Image */}
                                            <div className={`
                                                relative overflow-hidden
                                                ${viewMode === 'list' ? 'w-1/3' : 'h-72'}
                                            `}>
                                                {/* Image Container */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-red-100 opacity-30"></div>
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                
                                                {/* Badges */}
                                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                                    {product.discount_percent > 20 && (
                                                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                            🔥 {product.discount_percent}% OFF
                                                        </span>
                                                    )}
                                                    {isNew && (
                                                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                            ✨ NEW
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                {/* Quick Actions */}
                                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleLike(productId)}
                                                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl"
                                                    >
                                                        <FaHeart 
                                                            size={20} 
                                                            className={`transition-all duration-300 ${isLiked 
                                                                ? 'text-red-500 fill-red-500 scale-110' 
                                                                : 'text-gray-400 hover:text-red-400'
                                                            }`}
                                                        />
                                                    </motion.button>
                                                    {quantity > 0 && (
                                                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                                            {quantity} in cart
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className={`p-6 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                                                        {product.name || `Fashion Style ${index + 1}`}
                                                    </h3>
                                                    {viewMode === 'list' && (
                                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                            {product.description || "Elegant and stylish fashion piece"}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Price */}
                                                <div className="mb-6">
                                                    {product.discount_percent > 0 ? (
                                                        <div>
                                                            <div className="flex items-center gap-3 mb-1">
                                                                <span className="text-2xl font-black text-gray-900">
                                                                    {formatPrice(discountPrice)}
                                                                </span>
                                                                <span className="text-lg text-gray-500 line-through">
                                                                    {formatPrice(product.price)}
                                                                </span>
                                                            </div>
                                                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-pink-50 px-3 py-1 rounded-full">
                                                                <FaTag className="text-red-500" />
                                                                <span className="text-sm font-bold text-red-600">
                                                                    Save {formatPrice(product.price - discountPrice)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-2xl font-black text-gray-900">
                                                            {formatPrice(product.price)}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Cart Button */}
                                                <div className="flex items-center gap-3">
                                                    {quantity === 0 ? (
                                                        <motion.button
                                                            id={`cart-btn-${productId}`}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleAddToCart(productId)}
                                                            className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                                                        >
                                                            <FaShoppingCart />
                                                            ADD TO CART
                                                        </motion.button>
                                                    ) : (
                                                        <div className="flex-1 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white rounded-xl p-2 shadow-inner">
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => handleDecreaseQuantity(productId)}
                                                                className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 w-10 h-10 rounded-lg shadow hover:shadow-lg transition-all"
                                                            >
                                                                -
                                                            </motion.button>
                                                            <div className="flex flex-col items-center">
                                                                <span className="text-lg font-black text-gray-900">
                                                                    {quantity} Added
                                                                </span>
                                                                <span className="text-sm text-green-600 font-bold">
                                                                    {formatPrice(discountPrice * quantity)} Total
                                                                </span>
                                                            </div>
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => handleIncreaseQuantity(productId)}
                                                                className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 w-10 h-10 rounded-lg shadow hover:shadow-lg transition-all"
                                                            >
                                                                +
                                                            </motion.button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Cart Button */}
            <AnimatePresence>
                {getCartCount() > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-8 right-8 "
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => alert("Proceed to checkout")}
                            className="relative bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white p-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <GiShoppingBag size={24} />
                                <div className="text-left">
                                    <div className="font-bold text-lg">{getCartCount()} Items</div>
                                    <div className="text-sm opacity-90">View Cart</div>
                                </div>
                            </div>
                            <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-black shadow-lg">
                                {getCartCount()}
                            </div>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll to Top */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-24 right-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl  hover:scale-110 transition-transform"
                    >
                        <BsLightningCharge size={20} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Loading Animation for Empty State */}
            {filteredProducts.length === 0 && (
                <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-red-50 to-orange-50 flex items-center justify-center z-50">
                    <div className="text-center">
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-32 h-32 border-4 border-transparent border-t-red-400 border-r-pink-400 rounded-full mx-auto mb-8"
                            />
                            <h2 className="text-4xl font-black text-gray-900 mb-4">
                                Finding Styles...
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Curating the perfect fashion for you ✨
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GirlFashion