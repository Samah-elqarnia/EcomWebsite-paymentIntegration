'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";

const MyOrders = () => {

    const { currency } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        // Simulating fetch delay for transition effect
        setTimeout(() => {
            setOrders(orderDummyData);
            setLoading(false);
        }, 500);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'order placed': return 'text-techElectric bg-techElectric/10 border-techElectric/20';
            case 'shipped': return 'text-techNeon bg-techNeon/10 border-techNeon/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    }

    return (
        <div className="min-h-screen bg-techBlack flex flex-col">
            <Navbar />

            <main className="flex-1 w-full max-w-5xl mx-auto px-6 pt-32 pb-24 relative">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-techWhite tracking-tight mb-2">
                        My Orders
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Track and manage your order history.
                    </p>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loading />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.length === 0 ? (
                            <div className="text-center py-20 bg-techGraphite/20 rounded-2xl border border-techGray">
                                <p className="text-gray-500">You haven't placed any orders yet.</p>
                            </div>
                        ) : (
                            orders.map((order, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="bg-techGraphite/30 border border-techGray rounded-2xl overflow-hidden hover:border-gray-500 transition-all duration-300"
                                >
                                    <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                                        {/* Product Detail */}
                                        <div className="flex-1 flex gap-6 items-center">
                                            <div className="w-12 h-12 shrink-0 bg-techBlack rounded-xl flex items-center justify-center border border-techGray">
                                                <Image
                                                    className="w-6 h-6 opacity-50 filter invert"
                                                    src={assets.box_icon}
                                                    alt="package"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-lg font-bold text-techWhite">
                                                    {order.items.map((item) => item.product.name).join(", ")}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                    <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                                                    <span className="w-1 h-1 rounded-full bg-techGray"></span>
                                                    <span>{new Date(order.date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Delivery Info */}
                                        <div className="lg:px-8 lg:border-l border-techGray/30 space-y-0.5">
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Delivering to</p>
                                            <p className="text-techWhite font-semibold">{order.address.fullName}</p>
                                            <p className="text-gray-500 text-xs">{order.address.city}, {order.address.state}</p>
                                        </div>

                                        {/* Status & Amount */}
                                        <div className="flex flex-col lg:items-end gap-1 shrink-0">
                                            <p className="text-xl font-bold text-techWhite">{currency}{order.amount}</p>
                                            <div className="mt-1">
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="lg:ml-4 flex flex-col gap-2 w-full lg:w-auto">
                                            <button className="px-5 py-2.5 bg-techWhite/5 border border-techGray text-techWhite font-medium rounded-lg hover:bg-techWhite/10 transition-all text-[10px] uppercase tracking-widest">
                                                Track Order
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MyOrders;
