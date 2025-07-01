import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useLocation, Link, useNavigate } from 'react-router-dom'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const ProductListPage = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)
    const [selectedRating, setSelectedRating] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [categorySearch, setCategorySearch] = useState('');
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [priceOpen, setPriceOpen] = useState(false);
    const [ratingOpen, setRatingOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState('Popular');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const [showSidebar, setShowSidebar] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [prodRes, catRes] = await Promise.all([
                    axios.get('https://fakestoreapi.com/products'),
                    axios.get('https://fakestoreapi.com/products/categories')
                ])
                setProducts(prodRes.data)
                setFilteredProducts(prodRes.data)
                setCategories(catRes.data)
                // Set price range
                const prices = prodRes.data.map(p => p.price)
                const min = Math.floor(Math.min(...prices))
                const max = Math.ceil(Math.max(...prices))
                setMinPrice(min)
                setMaxPrice(max)
                setPriceRange([min, max])
            } catch (err) {
                setError('Failed to fetch products')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        let filtered = products
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category))
        }
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
        if (selectedRating > 0) {
            filtered = filtered.filter(p => Math.floor(p.rating?.rate || 0) >= selectedRating)
        }
        if (searchQuery) {
            filtered = filtered.filter(p => p.title.toLowerCase().includes(searchQuery))
        }
        setFilteredProducts(filtered)
        setCurrentPage(1)
    }, [selectedCategories, priceRange, selectedRating, products, searchQuery])

    // Price histogram data
    const priceBuckets = Array(10).fill(0)
    const bucketSize = (maxPrice - minPrice) / 10
    products.forEach(p => {
        const idx = Math.min(
            priceBuckets.length - 1,
            Math.floor((p.price - minPrice) / bucketSize)
        )
        priceBuckets[idx]++
    })
    const priceLabels = priceBuckets.map((_, i) =>
        `₹${Math.round(minPrice + i * bucketSize)}-₹${Math.round(minPrice + (i + 1) * bucketSize)}`
    )
    const priceChartData = {
        labels: priceLabels,
        datasets: [
            {
                label: 'Products',
                data: priceBuckets,
                backgroundColor: '#60a5fa',
            },
        ],
    }

    // For category counts
    const categoryCounts = categories.reduce((acc, cat) => {
        acc[cat] = products.filter(p => p.category === cat).length;
        return acc;
    }, {});

    // For filtered category list
    const filteredCategories = categories.filter(cat =>
        cat.toLowerCase().includes(categorySearch.toLowerCase())
    );

    // For rating filter
    const ratingOptions = [5, 4, 3, 2, 1];

    // Sorting logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Name: A-Z') return a.title.localeCompare(b.title);
        if (sortBy === 'Name: Z-A') return b.title.localeCompare(a.title);
        return 0; // Popular (default)
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const paginatedProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    // Helper to render stars (full, half, empty)
    function renderStars(rating) {
        const stars = []
        const fullStars = Math.floor(rating)
        const halfStar = rating - fullStars >= 0.5
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<svg key={i} width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#FFC107" /></svg>)
            } else if (i === fullStars && halfStar) {
                stars.push(<svg key={i} width="18" height="18" fill="none" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stopColor="#FFC107" /><stop offset="50%" stopColor="#E0E0E0" /></linearGradient></defs><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#half)" /></svg>)
            } else {
                stars.push(<svg key={i} width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#E0E0E0" /></svg>)
            }
        }
        return stars
    }

    const handleCategoryClick = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat)
                ? prev.filter(c => c !== cat)
                : [...prev, cat]
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen px-2 sm:px-4 md:px-8 lg:px-32 py-4">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm mb-4 gap-1">
                <Link to="/" className="text-blue-500 font-semibold hover:underline">Home</Link>
                <span className="text-gray-400 mx-1">&gt;</span>
                <span className="text-gray-400 font-medium">Clothes</span>
            </div>
            {/* Filter toggle for mobile */}
            <div className="lg:hidden flex justify-end mb-2">
                <button className="px-4 py-2 bg-white border rounded shadow text-sm font-semibold" onClick={() => setShowSidebar(v => !v)}>
                    {showSidebar ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <aside className={`bg-white rounded-2xl shadow p-4 h-fit flex flex-col gap-4 w-full lg:w-72 mb-4 lg:mb-0 ${showSidebar ? '' : 'hidden'} lg:block`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-lg">Filter</div>
                        <div className="text-gray-400 font-medium cursor-pointer">Advanced</div>
                    </div>
                    {/* Category */}
                    <div className="bg-white rounded-xl p-4 shadow-sm mb-2">
                        <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={() => setCategoryOpen(v => !v)}>
                            <div className="font-medium">Category</div>
                            {categoryOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                        </div>
                        {categoryOpen && <>
                            <input
                                className="w-full border-none bg-gray-100 rounded px-3 py-1 mb-2 text-sm focus:outline-none"
                                placeholder="Search brand..."
                                value={categorySearch}
                                onChange={e => setCategorySearch(e.target.value)}
                            />
                            <div className="flex flex-col gap-1 text-base">
                                <div
                                    className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${selectedCategories.length === 0 ? 'bg-blue-50 font-semibold text-blue-600' : 'hover:bg-gray-100'}`}
                                    onClick={() => setSelectedCategories([])}
                                >
                                    <span>All</span>
                                    {selectedCategories.length === 0 && <CheckIcon fontSize="small" className="text-blue-600" />}
                                </div>
                                {filteredCategories.map(cat => (
                                    <div
                                        key={cat}
                                        className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${selectedCategories.includes(cat) ? 'bg-blue-50 font-semibold text-blue-600' : 'hover:bg-gray-100'}`}
                                        onClick={() => handleCategoryClick(cat)}
                                    >
                                        <span>{cat.charAt(0).toUpperCase() + cat.slice(1)} <span className="text-gray-400 text-sm">{categoryCounts[cat]}</span></span>
                                        {selectedCategories.includes(cat) && <CheckIcon fontSize="small" className="text-blue-600" />}
                                    </div>
                                ))}
                            </div>
                        </>}
                    </div>
                    {/* Price */}
                    <div className="bg-white rounded-xl p-4 shadow-sm mb-2">
                        <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={() => setPriceOpen(v => !v)}>
                            <div className="font-medium">Price</div>
                            {priceOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                        </div>
                        {priceOpen && <>
                            <Bar data={priceChartData} options={{ plugins: { legend: { display: false } }, scales: { x: { ticks: { font: { size: 10 } } } } }} height={80} />
                            <div className="flex items-center justify-between mt-2">
                                <input
                                    type="range"
                                    min={minPrice}
                                    max={maxPrice}
                                    value={priceRange[0]}
                                    onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                                    className="w-2/5 accent-blue-500"
                                />
                                <input
                                    type="range"
                                    min={minPrice}
                                    max={maxPrice}
                                    value={priceRange[1]}
                                    onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className="w-2/5 accent-blue-500"
                                />
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <div className="bg-gray-100 rounded px-3 py-1 text-sm font-semibold">{priceRange[0].toLocaleString()} INR</div>
                                <div className="bg-gray-100 rounded px-3 py-1 text-sm font-semibold">{priceRange[1].toLocaleString()} INR</div>
                            </div>
                        </>}
                    </div>
                    {/* Rating */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={() => setRatingOpen(v => !v)}>
                            <div className="font-medium">Rating</div>
                            {ratingOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                        </div>
                        {ratingOpen && <div className="flex flex-col gap-2">
                            {ratingOptions.map(rating => (
                                <div
                                    key={rating}
                                    className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${selectedRating === rating ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                                    onClick={() => setSelectedRating(rating)}
                                >
                                    <span className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} width="18" height="18" fill="none" viewBox="0 0 24 24">
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={i < rating ? '#FFC107' : '#E0E0E0'} />
                                            </svg>
                                        ))}
                                    </span>
                                </div>
                            ))}
                        </div>}
                    </div>
                </aside>
                {/* Main Content */}
                <main className="flex-1">
                    {/* Top Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
                        <div className="flex items-center gap-2 mb-2 sm:mb-0">
                            <button className="p-2 border rounded bg-white mr-1"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" stroke="#888" strokeWidth="2" /><rect x="14" y="3" width="7" height="7" stroke="#888" strokeWidth="2" /><rect x="14" y="14" width="7" height="7" stroke="#888" strokeWidth="2" /><rect x="3" y="14" width="7" height="7" stroke="#888" strokeWidth="2" /></svg></button>
                            <button className="p-2 border rounded bg-white"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" stroke="#888" strokeWidth="2" /></svg></button>
                        </div>
                        {/* Custom Sort Dropdown */}
                        <div className="relative">
                            <button className="flex z-20 items-center gap-2 border rounded px-3 py-1 bg-white font-semibold text-sm shadow-sm" onClick={() => setSortOpen(v => !v)}>
                                Sort by: {sortBy}
                                {sortOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </button>
                            {sortOpen && (
                                <div className="z-20 absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10 flex flex-col">
                                    {['Popular', 'Price: Low to High', 'Price: High to Low', 'Name: A-Z', 'Name: Z-A'].map(option => (
                                        <button
                                            key={option}
                                            className={`text-left px-4 py-2 hover:bg-gray-100 ${sortBy === option ? 'font-bold text-blue-600' : ''}`}
                                            onClick={() => { setSortBy(option); setSortOpen(false); setCurrentPage(1); }}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Product Grid */}
                    {loading ? (
                        <div className="text-center py-10">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-10">{error}</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {paginatedProducts.map(product => (
                                <div
                                    key={product.id}
                                    className="inter-font bg-white rounded-2xl shadow p-4 flex flex-col items-start gap-2 relative border border-gray-200 cursor-pointer"
                                    style={{ minHeight: 370 }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    {/* Like button */}
                                    <button className="cursor-pointer absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md z-10" onClick={e => e.stopPropagation()}>
                                        <FavoriteBorderOutlinedIcon style={{ color: '#888' }} />
                                    </button>
                                    {/* Image in bordered square */}
                                    <div className="w-full h-50 flex items-center justify-center bg-gray-100 rounded-lg mb-3 mt-2">
                                        <img src={product.image} alt={product.title} className="h-28 object-contain" />
                                    </div>
                                    <div className="text-left mb-1 line-clamp-1 text-gray-500 w-full text-xl">{product.title}</div>
                                    <div className="text-gray-500 text-sm text-left mb-2 line-clamp-2 w-full">{product.description}</div>
                                    <div className="font-semibold text-lg text-left mb-1 text-gray-800 w-full">₹ {product.price}</div>
                                    <div className="flex items-center text-left gap-1 mb-1 w-full">
                                        {renderStars(product.rating?.rate || 0)}
                                        <span className="text-gray-400 text-left text-base ml-1">({product.rating?.count || 0})</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Pagination */}
                    <div className="flex justify-center mt-8 gap-2">
                        <button
                            className="cursor-pointer px-3 py-1 border rounded bg-white"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        >&lt;</button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`px-3 py-1 cursor-pointer border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >{i + 1}</button>
                        ))}
                        <button
                            className="px-3 py-1 cursor-pointer border rounded bg-white"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        >&gt;</button>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ProductListPage 