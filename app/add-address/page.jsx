'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const AddAddress = () => {

    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // Backend logic remains unchanged
    }

    return (
        <div className="min-h-screen bg-techBlack flex flex-col">
            <Navbar />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-32 pt-32 pb-24 relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-techElectric/5 rounded-full blur-[150px] pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col lg:flex-row items-start justify-between gap-16 relative z-10"
                >
                    <div className="w-full lg:max-w-xl">
                        <header className="mb-12">

                            <h1 className="text-4xl md:text-5xl font-extrabold text-techWhite tracking-tight mb-4 leading-tight">
                                Define your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-techElectric to-techNeon">destination.</span>
                            </h1>
                            <p className="text-gray-400 font-light text-lg">
                                Ensure precision in delivery. Provide your logistics coordinates for seamless hardware arrival.
                            </p>
                        </header>

                        <form onSubmit={onSubmitHandler} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs text-techWhite/50 uppercase tracking-widest font-semibold ml-1">Recipient Name</label>
                                    <input
                                        className="px-5 py-4 bg-techGraphite border border-techGray rounded-2xl text-techWhite outline-none w-full focus:border-techElectric transition-all duration-300 placeholder:text-gray-600"
                                        type="text"
                                        placeholder="Enter full name"
                                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                                        value={address.fullName}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-techWhite/50 uppercase tracking-widest font-semibold ml-1">Contact Signal</label>
                                    <input
                                        className="px-5 py-4 bg-techGraphite border border-techGray rounded-2xl text-techWhite outline-none w-full focus:border-techElectric transition-all duration-300 placeholder:text-gray-600"
                                        type="tel"
                                        placeholder="Phone number"
                                        onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                                        value={address.phoneNumber}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-techWhite/50 uppercase tracking-widest font-semibold ml-1">Logistic Code (Pincode)</label>
                                <input
                                    className="px-5 py-4 bg-techGraphite border border-techGray rounded-2xl text-techWhite outline-none w-full focus:border-techElectric transition-all duration-300 placeholder:text-gray-600"
                                    type="text"
                                    placeholder="Enter pin code"
                                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                    value={address.pincode}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-techWhite/50 uppercase tracking-widest font-semibold ml-1">Detailed Coordinates</label>
                                <textarea
                                    className="px-5 py-4 bg-techGraphite border border-techGray rounded-2xl text-techWhite outline-none w-full focus:border-techElectric transition-all duration-300 placeholder:text-gray-600 resize-none"
                                    rows={4}
                                    placeholder="Area, Street, and Landmark"
                                    onChange={(e) => setAddress({ ...address, area: e.target.value })}
                                    value={address.area}
                                    required
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs text-techWhite/50 uppercase tracking-widest font-semibold ml-1">City/Town</label>
                                    <input
                                        className="px-5 py-4 bg-techGraphite border border-techGray rounded-2xl text-techWhite outline-none w-full focus:border-techElectric transition-all duration-300 placeholder:text-gray-600"
                                        type="text"
                                        placeholder="City"
                                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                        value={address.city}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-techWhite/50 uppercase tracking-widest font-semibold ml-1">State/Region</label>
                                    <input
                                        className="px-5 py-4 bg-techGraphite border border-techGray rounded-2xl text-techWhite outline-none w-full focus:border-techElectric transition-all duration-300 placeholder:text-gray-600"
                                        type="text"
                                        placeholder="State"
                                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                        value={address.state}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full mt-8 bg-techWhite text-techBlack font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] tracking-wide uppercase text-sm">
                                Deploy Address
                            </button>
                        </form>
                    </div>


                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default AddAddress;
