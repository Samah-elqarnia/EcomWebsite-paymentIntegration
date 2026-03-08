import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    image: assets.p1,
    title: "Absolute Silence. Pure Fidelity.",
    description: "Immerse yourself in studio-grade audio, encased in sustainable aerospace materials.",
    colSpan: "lg:col-span-2 lg:row-span-2",
    height: "h-[400px] lg:h-[730px]",
  },
  {
    id: 2,
    image: assets.p2,
    title: "Compact Powerhouse.",
    description: "Invisible fit. Unbelievable punch. Your everyday soundtrack seamlessly integrated.",
    colSpan: "lg:col-span-1 lg:row-span-1",
    height: "h-[350px]",
  },
  {
    id: 3,
    image: assets.p3,
    title: "Compute. Unleashed.",
    description: "Desktop-class processing with neural acceleration. The ultimate pro machine.",
    colSpan: "lg:col-span-1 lg:row-span-1",
    height: "h-[350px]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.3, duration: 1 } }
};

const FeaturedProduct = () => {
  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto relative z-10 lg:mt-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6"
      >
        <div className="max-w-xl">

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-techWhite mb-4">
            Curated for the Extraordinary.
          </h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Our premium collections are designed to integrate seamlessly into your life, empowering your creativity and revolutionizing your workflow.
          </p>
        </div>
        <button className="flex items-center gap-2 text-techElectric font-medium hover:text-techNeon transition-colors group whitespace-nowrap mb-2">
          Discover Collections <span className="text-xl leading-none group-hover:translate-x-1 transition-transform">&rarr;</span>
        </button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {products.map(({ id, image, title, description, colSpan, height }, index) => (
          <motion.div
            key={id}
            variants={itemVariants}
            className={`relative group overflow-hidden rounded-3xl cursor-pointer border border-techGray hover:border-techElectric/50 transition-colors duration-700 bg-techGraphite ${colSpan}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-techBlack via-techBlack/40 to-transparent opacity-90 transition-opacity duration-500 z-10"></div>
            <Image
              src={image}
              alt={title}
              className={`group-hover:scale-105 transition-transform duration-[1.5s] ease-out w-full object-cover ${height}`}
            />

            {/* Tech Grid Overlay Stylistic Element */}
            <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 text-techWhite z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out flex flex-col items-start w-full h-full justify-end">
              <div className="w-10 h-1 bg-techElectric mb-5 xl:mb-6 group-hover:w-16 transition-all duration-500 shadow-neon"></div>
              <h3 className={`font-bold tracking-tight mb-3 ${index === 0 ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>{title}</h3>
              <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                {description}
              </p>

              <div className="flex items-center gap-3 text-sm font-semibold text-techWhite uppercase tracking-wide">
                <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100 text-techElectric block">Explore</span>
                <div className="w-10 h-10 rounded-full border border-techGray flex items-center justify-center bg-techWhite/5 backdrop-blur-sm group-hover:bg-techElectric group-hover:border-techElectric group-hover:shadow-neon transition-all duration-500">
                  <span className="text-lg group-hover:translate-x-0.5 transition-transform duration-300">&rarr;</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedProduct;
