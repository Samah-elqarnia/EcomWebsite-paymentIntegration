import React, { useState, useEffect, useRef } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "The Perfect Headphones is out now !",
      offer: "limited stock of 10 lefts",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Discover PlayStation 5 - our bestseller in the gaming category!",
      offer: "only 5 lefts ",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Apple MacBook Pro is available in TechPlace ",
      offer: "with 20% Off deal ",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  return (
    <div ref={containerRef} className="overflow-hidden relative w-full h-screen bg-techBlack perspective-1000">
      {/* Cinematic Parallax Container */}
      <motion.div style={{ y, opacity }} className="w-full h-full absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.8 } }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-tech-gradient pt-20 pb-12 md:py-0 px-8 md:px-20 w-full h-full text-techWhite relative overflow-hidden"
          >
            {/* Cinematic Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-techElectric/30 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-techNeon/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="flex-1 md:pr-12 mt-12 md:mt-0 flex flex-col justify-center relative z-10 h-full">


              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-5"
              >
                {sliderData[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-gray-400 text-sm md:text-base max-w-lg mb-8 leading-relaxed font-light"
              >
                Elevate your everyday with our premium tech selection. Built for the modern innovator.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap items-center gap-4"
              >
                <button className="px-6 py-3 bg-techElectric border border-techElectric rounded-full text-techWhite text-sm font-semibold hover:bg-techNeon hover:border-techNeon transition-all duration-300 shadow-neon transform hover:-translate-y-1">
                  {sliderData[currentSlide].buttonText1}
                </button>
                <button className="group flex items-center gap-3 px-6 py-3 bg-techWhite/5 border border-techWhite/10 rounded-full text-techWhite text-sm font-medium hover:bg-techWhite/10 hover:border-techWhite/20 transition-all duration-300 backdrop-blur-md">
                  {sliderData[currentSlide].buttonText2}
                  <Image className="w-3.5 group-hover:translate-x-1 transition-transform duration-300 filter brightness-0 invert" src={assets.arrow_icon} alt="arrow_icon" />
                </button>
              </motion.div>
            </div>

            <div className="flex-1 flex justify-center items-center relative z-10 h-full">
              <div className="absolute inset-0 bg-techElectric/10 blur-[100px] rounded-full scale-75 pointer-events-none"></div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotateY: -10, transition: { duration: 0.5 } }}
                className="relative z-20 w-56 md:w-72 lg:w-[420px] h-auto"
                style={{ perspective: 1000 }}
              >
                <Image
                  className="w-full drop-shadow-[0_0_30px_rgba(0,163,255,0.4)] object-contain"
                  src={sliderData[currentSlide].imgSrc}
                  alt={sliderData[currentSlide].title}
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 z-30">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full cursor-pointer transition-all duration-500 ${currentSlide === index ? "bg-techElectric w-8 shadow-neon" : "bg-techWhite/20 w-1.5 hover:bg-techWhite/40"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
