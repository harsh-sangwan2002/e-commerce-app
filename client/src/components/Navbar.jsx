import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../redux/userSlice'
import SearchIcon from '@mui/icons-material/Search'

const Navbar = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const dropdownTimeout = useRef(null)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    // Update search state from URL on mount or URL change
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        setSearch(params.get('search') || '')
    }, [location.search])

    // Debounced navigation on search change
    useEffect(() => {
        // Only trigger navigation if on home page or search page
        if (location.pathname === '/') {
            const timeout = setTimeout(() => {
                if (search.trim()) {
                    navigate(`/?search=${encodeURIComponent(search.trim())}`)
                } else {
                    navigate('/')
                }
            }, 300)
            return () => clearTimeout(timeout)
        }
        // Do not navigate if not on home page
    }, [search, navigate, location.pathname])

    const handleLogout = () => {
        dispatch(logout())
        setDropdownOpen(false)
    }

    // Dropdown hover handlers for both login/register and user/logout
    const handleDropdownEnter = () => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
        setDropdownOpen(true)
    }
    const handleDropdownLeave = () => {
        dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 2000)
    }

    return (
        <nav className="navbar fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-4 md:px-30 h-20">
            <div className="flex items-center gap-0">
                <Link to="/">
                    <img src="/logo.png" alt="" className='w-15 h-15 rounded-4xl' />
                </Link>
                <div className="relative ml-4 md:ml-8 w-48 md:w-80 flex items-center">
                    <span className="absolute left-3 text-gray-400">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        placeholder="Search Here..."
                        className="search-bar outline-none border border-gray-500 rounded-lg px-4 py-1 pl-10 w-full"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <span className="absolute right-2 text-gray-400">
                        <SearchIcon />
                    </span>
                </div>
            </div>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 relative">
                {user ? (
                    <div
                        className="relative"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button
                            className="nav-link flex items-center gap-1 font-semibold focus:outline-none cursor-pointer"
                        >
                            {user.name}
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                        <div className={`absolute right-0 left-0 mt-2 w-32 bg-white border rounded shadow z-10 transition-all duration-200 ${dropdownOpen ? '' : 'opacity-0 pointer-events-none'}`}>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={handleLogout}
                            >Logout</button>
                        </div>
                    </div>
                ) : (
                    <div
                        className="relative"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button
                            className="nav-link flex items-center gap-1 focus:outline-none cursor-pointer"
                        >
                            Login
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                        <div className={`absolute right-0 left-0 mt-2 w-32 bg-white border rounded shadow z-10 transition-all duration-200 ${dropdownOpen ? '' : 'opacity-0 pointer-events-none'}`}>
                            <Link
                                to="/login"
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => setDropdownOpen(false)}
                            >Login</Link>
                            <Link
                                to="/register"
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => setDropdownOpen(false)}
                            >Register</Link>
                        </div>
                    </div>
                )}
                <span className="nav-link">Become a Seller</span>
                <span className="nav-link">More</span>
                <span className="nav-link">Cart</span>
            </div>
            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
                <button onClick={() => setMobileMenuOpen(v => !v)} className="p-2 focus:outline-none">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="#333" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
                {mobileMenuOpen && (
                    <div className="absolute top-20 right-4 w-48 bg-white border rounded shadow z-50 flex flex-col gap-2 p-4">
                        {user ? (
                            <>
                                <button
                                    className="text-left px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold flex items-center gap-1"
                                    onClick={handleLogout}
                                >
                                    {user.name} <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </button>
                                <button
                                    className="text-left px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold flex items-center gap-1"
                                    onClick={handleLogout}
                                >Logout</button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setMobileMenuOpen(false)}
                                >Login</Link>
                                <Link
                                    to="/register"
                                    className="block text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setMobileMenuOpen(false)}
                                >Register</Link>
                            </>
                        )}
                        <span className="nav-link">Become a Seller</span>
                        <span className="nav-link">More</span>
                        <span className="nav-link">Cart</span>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar 