import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ProductReviews from '../components/ProductReviews'

const mockColors = ['#6B4F2B', '#E5E5E5', '#1E293B', '#2563EB']
const mockSizes = [6, 8, 10, 14, 18, 20]

const ProductDetailPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [related, setRelated] = useState([])
    const [mainImg, setMainImg] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
            setProduct(res.data)
            setMainImg(res.data.image)
            // Fetch related
            const rel = await axios.get(`https://fakestoreapi.com/products/category/${encodeURIComponent(res.data.category)}`)
            setRelated(rel.data.filter(p => p.id !== res.data.id))
            setLoading(false)
        }
        fetchProduct()
    }, [id])

    if (loading || !product) return <div className="text-center py-20">Loading...</div>

    return (
        <div className="mx-auto px-2 sm:px-4 md:px-8 lg:px-32 mt-6 sm:mt-10">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center text-xs sm:text-sm mb-4 gap-1">
                <Link to="/" className="text-blue-500 font-semibold hover:underline">Home</Link>
                <span className="text-gray-400 mx-1">&gt;</span>
                <Link to={`/?category=${encodeURIComponent(product.category)}`} className="text-blue-500 font-semibold hover:underline">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link>
                <span className="text-gray-400 mx-1">&gt;</span>
                <span className="text-gray-400 font-medium line-clamp-1">{product.title}</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Left: Images */}
                <div className="flex flex-col gap-3 w-full md:w-1/2">
                    <div className="relative bg-white rounded-xl shadow p-2 sm:p-4 flex items-center justify-center min-h-[220px] sm:min-h-[350px]">
                        <img src={mainImg} alt={product.title} className="h-44 sm:h-72 object-contain" />
                        <button className="cursor-pointer absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow z-10">
                            <FavoriteBorderOutlinedIcon style={{ color: '#888' }} />
                        </button>
                    </div>
                    <div className="flex gap-2 justify-center">
                        {[product.image, ...mockColors.map((c, i) => product.image)].slice(0, 4).map((img, i) => (
                            <div key={i} className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg border-2 ${mainImg === img ? 'border-blue-400' : 'border-gray-200'} flex items-center justify-center bg-gray-50 cursor-pointer`} onClick={() => setMainImg(img)}>
                                <img src={img} alt="thumb" className="h-8 sm:h-12 object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Right: Info */}
                <div className="flex-1 flex flex-col gap-3 sm:gap-4">
                    <div className="text-xs text-gray-400 font-semibold">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                    <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{product.title}</div>
                    <div className="flex items-center gap-2 sm:gap-3 mb-1">
                        <span className="text-gray-400 line-through text-base sm:text-lg">₹{(product.price * 1.2).toFixed(2)}</span>
                        <span className="text-base sm:text-xl font-bold bg-yellow-100 px-2 py-1 rounded">₹{product.price}</span>
                        <span className="text-gray-500 text-xs sm:text-base">4.5 ★</span>
                    </div>
                    <div className="text-xs sm:text-base text-gray-700 mb-2"><span className="font-semibold">Description:</span> {product.description}</div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-semibold">Color:</span>
                        {mockColors.map((color, i) => (
                            <span key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300" style={{ background: color, display: 'inline-block' }}></span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-semibold">Size:</span>
                        {mockSizes.map(size => (
                            <button key={size} className="cursor-pointer w-7 h-7 sm:w-8 sm:h-8 border rounded bg-white font-semibold text-gray-700 hover:bg-blue-50 text-xs sm:text-base">{size}</button>
                        ))}
                        <span className="text-blue-600 text-xs cursor-pointer ml-2">View Size Chart</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
                        <button className="cursor-pointer bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold hover:bg-gray-800 text-sm sm:text-base">Add To Cart</button>
                        <button className="cursor-pointer border border-black px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold hover:bg-gray-100 text-sm sm:text-base">Checkout Now</button>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">Delivery T&C</div>
                </div>
            </div>
            {/* Related Products */}
            <div className="mt-8 sm:mt-12">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                    <div className="text-base sm:text-lg font-semibold">Related Product</div>
                    <span className="text-blue-600 text-xs sm:text-sm cursor-pointer">View All</span>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {related.map(rp => (
                        <div key={rp.id} className="bg-white rounded-xl shadow p-2 sm:p-3 flex flex-col items-center cursor-pointer" onClick={() => navigate(`/product/${rp.id}`)}>
                            <img src={rp.image} alt={rp.title} className="h-16 sm:h-24 object-contain mb-2" />
                            <div className="font-semibold text-center text-gray-800 text-xs sm:text-sm line-clamp-1">{rp.title}</div>
                            <div className="text-gray-500 text-xs text-center mb-1 line-clamp-2">{rp.description}</div>
                            <div className="font-bold text-sm sm:text-base text-gray-800">₹ {rp.price}</div>
                            <div className="flex items-center gap-1 mb-1">
                                <span className="text-yellow-500">{'★'.repeat(Math.round(rp.rating?.rate || 0))}</span>
                                <span className="text-gray-400">({rp.rating?.count || 0})</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ProductReviews />
        </div>
    )
}

export default ProductDetailPage 