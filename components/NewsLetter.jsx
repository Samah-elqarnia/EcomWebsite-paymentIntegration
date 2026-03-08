import React from "react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 relative z-10 m-2 perspective-1000">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 50, rotateX: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeOut", type: "spring", bounce: 0.3 }}
        className="relative rounded-[2.5rem] bg-techGraphite overflow-hidden border border-techGray shadow-2xl"
      >
        {/* Cinematic Glow Effects */}
        <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-techElectric/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-techNeon/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 py-16 lg:py-20 gap-12">
          {/* Text Content */}
          <div className="flex-1 max-w-xl text-center lg:text-left">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-techWhite mb-6 leading-tight"
            >
              Subscribe to our <span className="text-transparent bg-clip-text bg-gradient-to-r from-techElectric to-techNeon">Newsletter</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-gray-400 text-lg md:text-xl font-light leading-relaxed"
            >
              Join our inner circle. Receive exclusive access to unreleased tech drops, priority pre-orders, and elite insights delivered directly to your inbox.
            </motion.p>
          </div>

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
            className="flex-1 w-full max-w-md lg:max-w-none lg:w-auto"
          >
            <div className="bg-techBlack/50 backdrop-blur-xl p-2 rounded-2xl md:rounded-full border border-techGray flex flex-col md:flex-row items-center gap-2 shadow-inner transition-colors duration-300 focus-within:border-techElectric focus-within:shadow-neon">
              <input
                className="w-full flex-1 h-14 bg-transparent outline-none px-6 text-techWhite placeholder:text-gray-500 font-medium"
                type="email"
                placeholder="Enter your email address..."
              />
              <button className="w-full md:w-auto px-8 h-12 md:h-12 bg-techElectric hover:bg-techNeon text-techWhite rounded-xl md:rounded-full font-bold tracking-wide transition-all duration-300 shadow-neon hover:shadow-neon-hover transform hover:-translate-y-0.5 flex-shrink-0">
                Request Access
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center lg:text-left mt-4 font-medium px-4">
              We respect your privacy. Secure algorithms. No spam ever.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsLetter;
