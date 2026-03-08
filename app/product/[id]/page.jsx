"use client"
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Product = () => {

    const { id } = useParams();
    const { products, router, addToCart, currency } = useAppContext()

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
        if (product && product.image.length > 0) {
            setMainImage(product.image[0]);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [id, products.length])

    return productData ? (<div className="min-h-screen bg-techBlack flex flex-col">
        <Navbar />

        <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-32 pt-32 pb-24 relative">

            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-techElectric/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
                {/* Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full lg:w-1/2 flex flex-col gap-6"
                >
                    <div className="relative w-full aspect-square rounded-3xl bg-techGraphite border border-techGray flex items-center justify-center overflow-hidden group shadow-2xl">
                        {/* Inner subtle glow for premium feel */}
                        <div className="absolute inset-0 bg-gradient-to-br from-techWhite/5 to-transparent z-0 pointer-events-none"></div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mainImage}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                                className="relative z-10 w-4/5 h-4/5 flex items-center justify-center"
                            >
                                <Image
                                    src={mainImage}
                                    alt={productData.name}
                                    className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-700 ease-out"
                                    width={1280}
                                    height={1280}
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {productData.image.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {productData.image.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => setMainImage(image)}
                                    className={`relative aspect-square cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 flex items-center justify-center ${mainImage === image
                                        ? "bg-techGraphite border-techWhite shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                        : "bg-techBlack/50 border-techGray hover:bg-techGraphite hover:border-techWhite/50"
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-2/3 h-2/3 object-contain"
                                        width={400}
                                        height={400}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Product Information */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                    <div className="inline-block py-1 px-3 rounded-md bg-techWhite/10 border border-techWhite/20 text-techWhite text-xs font-semibold tracking-widest uppercase mb-4 w-max">
                        {productData.category}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-techWhite mb-4 tracking-tight leading-tight">
                        {productData.name}
                    </h1>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex items-center gap-1">
                            {[...Array(4)].map((_, i) => (
                                <Image key={i} className="h-4 w-4" src={assets.star_icon} alt="star" />
                            ))}
                            <Image className="h-4 w-4 opacity-70" src={assets.star_dull_icon} alt="star dull" />
                        </div>
                        <span className="text-gray-400 text-sm font-medium pt-0.5">4.8 (124 Reviews)</span>
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed font-light mb-10">
                        {productData.description}
                    </p>

                    <div className="flex items-end gap-4 mb-10">
                        <p className="text-4xl font-bold text-techWhite tracking-tight">
                            {currency}{productData.offerPrice}
                        </p>
                        {productData.price > productData.offerPrice && (
                            <p className="text-xl font-normal text-gray-500 line-through pb-1">
                                {currency}{productData.price}
                            </p>
                        )}
                    </div>

                    <div className="space-y-4 mb-12">
                        <div className="flex border-b border-techGray pb-3">
                            <span className="w-1/3 text-gray-500 font-medium">Brand</span>
                            <span className="w-2/3 text-techWhite font-medium">TechPlace Signature</span>
                        </div>
                        <div className="flex border-b border-techGray pb-3">
                            <span className="w-1/3 text-gray-500 font-medium">Compatibility</span>
                            <span className="w-2/3 text-techWhite font-medium">Universal Architecture</span>
                        </div>
                        <div className="flex border-b border-techGray pb-3">
                            <span className="w-1/3 text-gray-500 font-medium">Shipping</span>
                            <span className="w-2/3 text-techWhite font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-techElectric shadow-neon"></span>
                                Ships within 24 hours
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button
                            onClick={() => addToCart(productData._id)}
                            className="w-full sm:w-1/2 py-4 bg-techWhite/5 border border-techGray text-techWhite hover:bg-techWhite hover:text-techBlack transition-all duration-300 font-bold rounded-xl flex justify-center items-center gap-2"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => { addToCart(productData._id); router.push('/cart') }}
                            className="w-full sm:w-1/2 py-4 bg-techWhite text-techBlack hover:bg-gray-200 transition-all duration-300 font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            Buy Now
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Featured Products Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="mt-32 pt-16 border-t border-techGray w-full"
            >
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-techWhite mb-2 tracking-tight">Similar <span className="text-transparent bg-clip-text bg-gradient-to-r from-techWhite to-gray-500">products </span></h2>
                        <p className="text-gray-400">Discover related products from our collection.</p>
                    </div>
                    <button
                        onClick={() => router.push('/all-products')}
                        className="group flex items-center gap-2 text-techWhite font-medium hover:text-gray-300 transition-colors"
                    >
                        View all <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
                    {products.filter(item => item._id !== id).slice(0, 5).map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex justify-center"
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

        </main>
        <Footer />
    </div>
    ) : <Loading />
};

export default Product;