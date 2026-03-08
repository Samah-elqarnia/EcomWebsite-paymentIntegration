import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-tech-gradient my-24 rounded-3xl overflow-hidden shadow-2xl relative max-w-7xl mx-auto border border-techGray"
    >
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-techElectric/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-techNeon/10 rounded-full blur-[100px]"></div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="max-w-56 mt-10 md:mt-0 relative z-10"
      >
        <Image
          className="hover:scale-105 transition-transform duration-700 ease-out"
          src={assets.jbl_soundbox_image}
          alt="jbl_soundbox_image"
        />
      </motion.div>

      <div className="flex flex-col items-center justify-center text-center space-y-6 px-6 md:px-0 relative z-10 py-10 md:py-20 flex-1">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold max-w-[400px] text-techWhite tracking-tight"
        >
          Level Up Your Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-[400px] text-gray-400 md:text-lg"
        >
          Immersive sound and precise controls engineered for the modern purist.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
          className="group flex items-center justify-center gap-2 px-10 py-3.5 bg-techElectric hover:bg-techNeon rounded-full text-techWhite font-semibold transition-all duration-300 shadow-neon transform hover:-translate-y-1"
        >
          Shop the collection
          <Image className="group-hover:translate-x-1 transition-transform duration-300" src={assets.arrow_icon_white} alt="arrow_icon_white" />
        </motion.button>
      </div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="hidden md:block max-w-80 relative z-10"
      >
        <Image
          className="drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
          src={assets.md_controller_image}
          alt="md_controller_image"
        />
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="md:hidden relative z-10 w-4/5 mx-auto pb-10"
      >
        <Image
          className="drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
          src={assets.sm_controller_image}
          alt="sm_controller_image"
        />
      </motion.div>
    </motion.div>
  );
};

export default Banner;