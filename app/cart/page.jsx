'use client'
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const Cart = () => {

  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount, currency } = useAppContext();

  return (
    <div className="min-h-screen bg-techBlack flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-32 pt-32 pb-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col xl:flex-row gap-10"
        >
          <div className="flex-1">
            <div className="flex items-end justify-between mb-8 border-b border-techGray pb-6">
              <h1 className="text-2xl md:text-3xl font-extrabold text-techWhite tracking-tight">
                Cart
              </h1>
              <p className="text-lg md:text-xl font-medium text-gray-400">{getCartCount()} Items</p>
            </div>

            {getCartCount() === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-techGraphite/30 rounded-3xl border border-techGray mt-8">
                <p className="text-gray-400 text-lg mb-6">Your cart is completely empty.</p>
                <button
                  onClick={() => router.push('/all-products')}
                  className="px-8 py-3 bg-techWhite/5 border border-techGray hover:bg-techElectric hover:border-techElectric text-techWhite rounded-full shadow-neon-hover transition-all duration-300 font-semibold"
                >
                  Browse products
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="text-left border-b border-techGray/50">
                    <tr>
                      <th className="text-nowrap pb-4 md:px-4 px-1 text-xs text-techWhite/50 uppercase tracking-widest font-semibold">
                        Product
                      </th>
                      <th className="pb-4 md:px-4 px-1 text-xs text-techWhite/50 uppercase tracking-widest font-semibold text-center">
                        Price
                      </th>
                      <th className="pb-4 md:px-4 px-1 text-xs text-techWhite/50 uppercase tracking-widest font-semibold text-center">
                        Quantity
                      </th>
                      <th className="pb-4 md:px-4 px-1 text-xs text-techWhite/50 uppercase tracking-widest font-semibold text-right">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(cartItems).map((itemId, idx) => {
                      const product = products.find(product => product._id === itemId);

                      if (!product || cartItems[itemId] <= 0) return null;

                      return (
                        <motion.tr
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          key={itemId}
                          className="border-b border-techGray/30 hover:bg-techWhite/5 transition-colors"
                        >
                          <td className="flex items-center gap-4 py-6 md:px-4 px-1">
                            <div>
                              <div className="rounded-xl overflow-hidden bg-techGraphite border border-techGray p-2 w-20 h-20 flex items-center justify-center">
                                <Image
                                  src={product.image[0]}
                                  alt={product.name}
                                  className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                  width={200}
                                  height={200}
                                />
                              </div>
                              <button
                                className="md:hidden text-xs text-red-500/80 hover:text-red-500 mt-2 font-medium tracking-wider uppercase transition-colors"
                                onClick={() => updateCartQuantity(product._id, 0)}
                              >
                                Remove
                              </button>
                            </div>
                            <div className="hidden md:flex flex-col items-start">
                              <p className="text-techWhite font-bold text-lg mb-1">{product.name}</p>
                              <span className="text-xs text-gray-500 bg-techGraphite px-2 py-0.5 rounded-md border border-techGray">{product.category}</span>
                              <button
                                className="text-xs text-red-500/60 hover:text-red-500 mt-3 font-semibold tracking-wider uppercase transition-colors duration-300"
                                onClick={() => updateCartQuantity(product._id, 0)}
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                          <td className="py-6 md:px-4 px-1 text-gray-400 font-medium text-center">{currency}{product.offerPrice}</td>
                          <td className="py-6 md:px-4 px-1">
                            <div className="flex items-center justify-center gap-2 bg-techGraphite border border-techGray rounded-full px-3 py-1.5 w-max mx-auto">
                              <button onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)} className="text-gray-400 hover:text-techWhite transition-colors p-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                              </button>
                              <input
                                onChange={e => updateCartQuantity(product._id, Number(e.target.value))}
                                type="number"
                                value={cartItems[itemId]}
                                className="w-8 bg-transparent text-techWhite font-bold text-center appearance-none outline-none"
                              />
                              <button onClick={() => addToCart(product._id)} className="text-gray-400 hover:text-techWhite transition-colors p-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                              </button>
                            </div>
                          </td>
                          <td className="py-6 md:px-4 px-1 text-techWhite font-bold text-right text-lg">{currency}{(product.offerPrice * cartItems[itemId]).toFixed(2)}</td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {getCartCount() > 0 && (
              <button
                onClick={() => router.push('/all-products')}
                className="group flex items-center mt-10 gap-2 text-techWhite hover:text-techElectric transition-colors font-semibold"
              >
                <Image
                  className="group-hover:-translate-x-1 transition filter invert group-hover:invert-0 group-hover:filter-[drop-shadow(0_0_8px_#00A3FF)]"
                  src={assets.arrow_icon_white}
                  alt="continue shopping"
                  style={{ transform: "rotate(180deg)" }}
                />
                Continue Shopping
              </button>
            )}
          </div>

          <div className="xl:w-[400px] shrink-0">
            <OrderSummary />
          </div>

        </motion.div>
      </main>
    </div>
  );
};

export default Cart;
