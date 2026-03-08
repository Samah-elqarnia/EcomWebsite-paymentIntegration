'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

const OrderPlaced = () => {

  const { router } = useAppContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/my-orders')
    }, 6000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className='min-h-screen bg-techBlack flex flex-col justify-center items-center relative overflow-hidden'>
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-techElectric/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-12 text-center px-6"
      >
        <div className="relative flex justify-center items-center w-40 h-40">
          {/* Pulsing rings */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 border-2 border-techElectric/30 rounded-full"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-4 border border-techElectric/20 rounded-full"
          ></motion.div>

          <div className="w-full h-full bg-techGraphite border border-techGray rounded-full flex items-center justify-center relative shadow-[0_0_50px_rgba(0,163,255,0.2)]">
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <svg className="w-16 h-16 text-techElectric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="inline-block py-1.5 px-4 rounded-full bg-techNeon/10 border border-techNeon/20 text-techNeon text-xs font-black uppercase tracking-[0.3em]"
          >
            Deployment Successful
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-4xl md:text-5xl font-black text-techWhite tracking-tighter"
          >
            Order <span className="text-gray-500 italic font-medium">Secured.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-gray-400 text-lg max-w-md mx-auto"
          >
            Your logistics have been processed. Preparing hardware for immediate dispatch.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6"
        >
          <button
            onClick={() => router.push('/my-orders')}
            className="px-10 py-4 bg-techElectric text-techWhite font-black rounded-2xl hover:bg-techElectric/90 transition-all shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:scale-105 active:scale-95 uppercase tracking-wider text-sm"
          >
            Track Logistics
          </button>
          <button
            onClick={() => router.push('/all-products')}
            className="px-10 py-4 bg-techWhite/5 border border-techGray text-techWhite font-bold rounded-2xl hover:bg-techWhite hover:text-techBlack transition-all uppercase tracking-widest text-sm"
          >
            Continue Browsing
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 text-xs text-techWhite/30 font-medium tracking-widest"
        >
          REDIRETING TO HISTORY IN 5s
        </motion.p>
      </motion.div>
    </div>
  )
}

export default OrderPlaced