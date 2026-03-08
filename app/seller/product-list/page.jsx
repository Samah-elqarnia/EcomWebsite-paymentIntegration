'use client'
import React, { useEffect, useState } from "react";
import { assets, productsDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";

const ProductList = () => {

  const { router, currency } = useAppContext()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSellerProduct = async () => {
    // Simulating delay for futuristic transition
    setTimeout(() => {
      setProducts(productsDummyData)
      setLoading(false)
    }, 500);
  }

  useEffect(() => {
    fetchSellerProduct();
  }, [])

  return (
    <div className="flex-1 min-h-screen bg-techBlack flex flex-col justify-between relative">
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:p-12 p-6"
        >
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-techWhite">
              Inventory
            </h1>
            <p className="text-gray-400 text-sm">Manage and monitor your product listings.</p>
          </header>

          <div className="w-full overflow-hidden rounded-2xl bg-techGraphite/30 border border-techGray shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-techGraphite text-gray-500 text-[10px] font-bold uppercase tracking-widest border-b border-techGray">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4 max-sm:hidden">Category</th>
                    <th className="px-6 py-4 text-center">Price</th>
                    <th className="px-6 py-4 text-right">Link</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-400">
                  {products.map((product, index) => (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      key={index}
                      className="group border-b border-techGray/20 hover:bg-techWhite/5 transition-colors"
                    >
                      <td className="px-6 py-4 flex items-center gap-4">
                        <div className="bg-techBlack rounded-xl p-1.5 border border-techGray w-12 h-12 flex items-center justify-center shrink-0">
                          <Image
                            src={product.image[0]}
                            alt={product.name}
                            className="w-10 h-10 object-contain"
                            width={80}
                            height={80}
                          />
                        </div>
                        <span className="font-semibold text-techWhite truncate max-w-[240px]">
                          {product.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-sm:hidden">
                        <span className="text-[11px] font-medium text-gray-500">{product.category}</span>
                      </td>
                      <td className="px-6 py-4 text-center text-techWhite font-bold">{currency}{product.offerPrice}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => router.push(`/product/${product._id}`)}
                          className="inline-flex items-center justify-center w-9 h-9 bg-techWhite/5 border border-techGray text-techWhite rounded-lg hover:bg-techWhite hover:text-techBlack transition-all"
                        >
                          <Image
                            className="h-3.5 filter invert opacity-50 group-hover:invert-0 group-hover:opacity-100 transition-all"
                            src={assets.redirect_icon}
                            alt="view"
                          />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ProductList;