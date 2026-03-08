'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AllProducts = () => {
    const { products } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");

    const categories = ["All", "Laptop", "Smartphone", "Headphone", "Earphone", "Camera", "Accessories"];
    const priceFilters = ["All", "Under $500", "$500 - $1500", "Over $1500"];
    const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        if (selectedCategory !== "All") {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        if (priceRange === "Under $500") {
            filtered = filtered.filter(p => p.offerPrice < 500);
        } else if (priceRange === "$500 - $1500") {
            filtered = filtered.filter(p => p.offerPrice >= 500 && p.offerPrice <= 1500);
        } else if (priceRange === "Over $1500") {
            filtered = filtered.filter(p => p.offerPrice > 1500);
        }

        if (sortBy === "Price: Low to High") {
            filtered.sort((a, b) => a.offerPrice - b.offerPrice);
        } else if (sortBy === "Price: High to Low") {
            filtered.sort((a, b) => b.offerPrice - a.offerPrice);
        } else {
            filtered.sort((a, b) => b.date - a.date);
        }

        return filtered;
    }, [products, selectedCategory, priceRange, sortBy]);

    return (
        <div className="min-h-screen bg-techBlack flex flex-col">
            <Navbar />

            <main className="flex-1 flex flex-col items-center px-6 md:px-16 lg:px-32 pt-24 pb-12 max-w-7xl mx-auto w-full">

                {/* Store Intro Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex flex-col items-center text-center mb-8"
                >
                    <div className="inline-block py-1.5 px-4 rounded-full bg-techWhite/5 border border-techGray text-techNeon text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-md">
                        Complete Collection
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-techWhite mb-6">
                        Discover all our <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-techElectric to-techNeon">Products</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl font-light mx-auto">
                        Explore our entire range of premium, high-fidelity hardware. Uncompromising design language fused with industry-leading electronics.
                    </p>
                </motion.div>

                {/* Filters Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full flex flex-col lg:flex-row gap-4 lg:items-center justify-between bg-techGraphite border border-techGray rounded-3xl p-5 mb-8 shadow-2xl"
                >
                    <div className="flex flex-col gap-4">
                        {/* Categories */}
                        <div>
                            <span className="text-xs text-techWhite/50 uppercase tracking-widest font-semibold mb-3 block">Category</span>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                                            ? "bg-techWhite text-techBlack shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                                            : "bg-techBlack/50 text-gray-400 border border-techGray hover:bg-techWhite/10 hover:text-techWhite"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price & Sort Row (Mobile Stack / Desktop Row) */}
                        <div className="flex flex-col sm:flex-row gap-6 mt-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-techWhite/50 uppercase tracking-widest font-semibold">Price:</span>
                                <select
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="bg-techBlack/50 border border-techGray text-sm text-techWhite rounded-lg px-4 py-2 outline-none focus:border-techElectric transition-colors cursor-pointer appearance-none min-w-[140px]"
                                >
                                    {priceFilters.map((price, idx) => <option key={idx} value={price} className="bg-techGraphite">{price}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:gap-3 lg:pl-6 lg:border-l border-techGray/50 mt-4 lg:mt-0">
                        <span className="text-xs text-techWhite/50 uppercase tracking-widest font-semibold block">Sort By</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-techBlack/50 border border-techGray text-sm text-techWhite rounded-lg px-4 py-2 outline-none focus:border-techElectric transition-colors cursor-pointer appearance-none min-w-[180px]"
                        >
                            {sortOptions.map((opt, idx) => <option key={idx} value={opt} className="bg-techGraphite">{opt}</option>)}
                        </select>
                    </div>
                </motion.div>

                {/* Product Grid */}
                <div className="w-full pb-14 min-h-[50vh]">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10 w-full"
                            >
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                                        key={product._id}
                                        className="flex justify-center"
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full flex flex-col items-center justify-center py-24 text-center"
                            >
                                <div className="text-techWhite/20 text-6xl mb-4">{"\u2205"}</div>
                                <h3 className="text-2xl font-bold text-techWhite mb-2">No products found</h3>
                                <p className="text-gray-500 max-w-md">We couldn't find any items matching your current filters. Try adjusting your category or price parameters.</p>
                                <button
                                    onClick={() => { setSelectedCategory("All"); setPriceRange("All"); }}
                                    className="mt-6 px-6 py-2 bg-techWhite/5 border border-techGray hover:bg-techElectric hover:border-techElectric text-techWhite rounded-full transition-all duration-300 shadow-neon-hover text-sm font-medium"
                                >
                                    Clear all filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllProducts;
