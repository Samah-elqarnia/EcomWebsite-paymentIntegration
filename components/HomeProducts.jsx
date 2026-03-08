import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const HomeProducts = () => {
  const { products, router } = useAppContext()

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-12 pt-32 pb-10 max-w-7xl mx-auto relative">
      {/* Modern Typographical Sticky Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-1/3 lg:sticky lg:top-32 flex flex-col gap-6 relative z-10"
      >
        <div className="inline-block py-1.5 px-4 rounded-full bg-techWhite/5 border border-techGray text-techNeon text-xs font-semibold tracking-wider uppercase w-max backdrop-blur-md">
          Current Innovations
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-techWhite leading-[1.1]">
          Engineered <br className="hidden lg:block" /> for Tomorrow.
        </h2>
        <p className="text-gray-400 md:text-lg font-light leading-relaxed max-w-sm">
          A highly curated selection of our most advanced technological solutions. Designed to push the boundaries of what's possible.
        </p>
        <button
          onClick={() => { router.push('/all-products') }}
          className="group mt-4 flex items-center justify-center gap-3 bg-techElectric hover:bg-techNeon text-techWhite px-8 py-3.5 rounded-full font-semibold transition-all duration-300 w-max shadow-neon transform hover:-translate-y-1"
        >
          View Collection
          <span className="text-xl leading-none group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
        </button>
      </motion.div>

      {/* Dynamic Product Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full lg:w-2/3 relative z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:gap-8 w-full">
          {products.map((product, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HomeProducts;
