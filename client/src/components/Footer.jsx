import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white text-[#222] text-sm pt-10 pb-4 px-6 md:px-16 border-t border-[#eee]">
            <div className="mx-auto px-20">
                <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-0">
                    {/* Left: Logo, Newsletter, Socials */}
                    <div className="flex-1 min-w-[220px] flex flex-col gap-6">
                        <div>
                            <div className="font-bold tracking-widest text-lg">Amazon</div>
                            <div className="text-xs tracking-[0.2em] text-gray-500">& PARTNERS</div>
                        </div>
                        <form className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="Get latest offers to your inbox"
                                style={{ width: '20rem' }}
                                className="px-5 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black w-full text-xs bg-white"
                            />
                            <button type="submit" className="bg-black text-white px-4 py-2 rounded">&gt;</button>
                        </form>
                        <div className="flex gap-4 mt-2">
                            {/* Placeholder icons, replace with real SVGs or icon library */}
                            <a href="#" aria-label="Facebook" className="hover:opacity-70"><span className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">F</span></a>
                            <a href="#" aria-label="Instagram" className="hover:opacity-70"><span className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">I</span></a>
                            <a href="#" aria-label="Twitter" className="hover:opacity-70"><span className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">T</span></a>
                            <a href="#" aria-label="Email" className="hover:opacity-70"><span className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">@</span></a>
                        </div>
                    </div>

                    {/* Center: Links */}
                    <div className="flex-[1] flex md:flex-row justify-between gap-10 md:gap-10 mt-8 md:mt-0">
                        <div>
                            <div className="font-semibold mb-2">Shop</div>
                            <ul className="space-y-1 text-gray-700">
                                <li><a href="#" className="hover:underline">My account</a></li>
                                <li><a href="#" className="hover:underline">Login</a></li>
                                <li><a href="#" className="hover:underline">Wishlist</a></li>
                                <li><a href="#" className="hover:underline">Cart</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="font-semibold mb-2">Information</div>
                            <ul className="space-y-1 text-gray-700">
                                <li><a href="#" className="hover:underline">Shipping Policy</a></li>
                                <li><a href="#" className="hover:underline">Returns & Refunds</a></li>
                                <li><a href="#" className="hover:underline">Cookies Policy</a></li>
                                <li><a href="#" className="hover:underline">Frequently asked</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="font-semibold mb-2">Company</div>
                            <ul className="space-y-1 text-gray-700">
                                <li><a href="#" className="hover:underline">About us</a></li>
                                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                                <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                                <li><a href="#" className="hover:underline">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom: Copyright, Language, Currency */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-dashed border-gray-300 text-xs text-gray-500 gap-4">
                    <div>© Amazon 2001 - 2025</div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1">
                            <span className="fi fi-us mr-1" />
                            English
                            <span className="ml-1">▼</span>
                        </div>
                        <div className="flex items-center gap-1">
                            USD
                            <span className="ml-1">▼</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 