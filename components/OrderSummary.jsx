import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    setUserAddresses(addressDummyData);
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {

  }

  useEffect(() => {
    fetchUserAddresses();
  }, [])

  return (
    <div className="w-full relative">
      <h2 className="text-2xl font-bold text-techWhite mb-6 tracking-tight relative z-10">
        Order <span className="text-gray-500 font-medium">Summary</span>
      </h2>

      <div className="space-y-8 relative z-10">
        <div className="space-y-3">
          <label className="text-xs text-techWhite/50 uppercase tracking-widest font-semibold">
            Shipping Address
          </label>
          <div className="relative w-full">
            <button
              className={`w-full text-left px-5 py-3.5 bg-techBlack/50 text-techWhite border rounded-xl flex items-center justify-between transition-colors outline-none focus:border-techElectric ${isDropdownOpen ? 'border-techElectric shadow-[0_0_10px_rgba(0,163,255,0.2)]' : 'border-techGray hover:border-gray-500'}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="truncate pr-4 text-sm font-medium">
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.city}`
                  : "Select delivery destination"}
              </span>
              <svg className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-techElectric" : "text-gray-500"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute w-full bg-techGraphite border border-techGray shadow-2xl mt-2 z-50 rounded-xl overflow-hidden backdrop-blur-md"
                >
                  {userAddresses.map((address, index) => (
                    <li
                      key={index}
                      className="px-5 py-3 hover:bg-techWhite/5 cursor-pointer border-b border-techGray/50 text-sm flex flex-col transition-colors"
                      onClick={() => handleAddressSelect(address)}
                    >
                      <span className="text-techWhite font-bold mb-0.5">{address.fullName}</span>
                      <span className="text-gray-400 text-xs">{address.area}, {address.city}, {address.state}</span>
                    </li>
                  ))}
                  <li
                    onClick={() => router.push("/add-address")}
                    className="px-5 py-3.5 hover:bg-techElectric/10 cursor-pointer text-center text-techElectric font-semibold text-sm transition-colors"
                  >
                    + Add New Address
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs text-techWhite/50 uppercase tracking-widest font-semibold flex items-center gap-2">
            Promo Code
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-grow w-full outline-none px-4 py-3 border border-techGray bg-techBlack/50 rounded-xl text-techWhite placeholder-gray-600 focus:border-techElectric transition-colors text-sm font-medium"
            />
            <button className="bg-techWhite/10 text-techWhite px-6 py-3 rounded-xl hover:bg-techWhite hover:text-techBlack transition-all font-semibold text-sm flex-shrink-0">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-techGray/50" />

        <div className="space-y-4">
          <div className="flex justify-between text-sm font-medium">
            <p className="text-gray-400">Subtotal ({getCartCount()} Items)</p>
            <p className="text-techWhite">{currency}{getCartAmount()}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-400">Shipping Estimate</p>
            <p className="font-medium text-techWhite">Free</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-400">Tax</p>
            <p className="font-medium text-techWhite">{currency}{Math.floor(getCartAmount() * 0.02)}</p>
          </div>
          <div className="flex justify-between text-xl font-bold border-t border-techGray/50 pt-5 mt-2">
            <p className="text-techWhite">Order Total</p>
            <p className="text-techElectric">{currency}{getCartAmount() + Math.floor(getCartAmount() * 0.02)}</p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        disabled={getCartCount() === 0}
        className="w-full bg-techWhite text-techBlack font-bold py-4 mt-8 rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        Proceed to Checkout
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
        Secure Encrypted Checkout
      </div>
    </div >
  );
};

export default OrderSummary;