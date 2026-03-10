'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSellerOrders = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/order/seller-orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                setOrders(data.orders);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            fetchSellerOrders();
        }
    }, [user]);

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'shipped': return 'text-techNeon bg-techNeon/10 border-techNeon/20';
            default: return 'text-techElectric bg-techElectric/10 border-techElectric/20';
        }
    }

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
                    className="md:p-12 p-6"
                >
                    <header className="mb-10">
                        <h1 className="text-3xl font-bold tracking-tight mb-2 text-techWhite">
                            Orders
                        </h1>
                        <p className="text-gray-400 text-sm">Manage and track your customer orders.</p>
                    </header>

                    <div className="max-w-5xl space-y-4">
                        {orders.length === 0 ? (
                            <div className="text-center py-20 bg-techGraphite/20 rounded-2xl border border-techGray">
                                <p className="text-gray-500">No orders found.</p>
                            </div>
                        ) : (
                            orders.map((order, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="bg-techGraphite/40 border border-techGray rounded-2xl overflow-hidden hover:border-gray-500 transition-all duration-300"
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

                                        {/* Customer Detail */}
                                        <div className="lg:px-8 lg:border-l border-techGray/30 space-y-0.5">
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Customer</p>
                                            <p className="text-techWhite font-semibold">{order.address.fullName}</p>
                                            <p className="text-gray-500 text-xs">{order.address.city}, {order.address.state}</p>
                                        </div>

                                        {/* Total Detail */}
                                        <div className="flex flex-col lg:items-end gap-1 shrink-0">
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Total</p>
                                            <p className="text-xl font-bold text-techWhite">{currency}{order.amount}</p>
                                            <div className="mt-1">
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles(order.status)}`}>
                                                    {order.status || 'Processing'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="lg:ml-4 flex flex-col gap-2 w-full lg:w-auto">
                                            <button className="px-5 py-2.5 bg-techWhite text-techBlack font-bold rounded-lg hover:bg-gray-200 transition-all text-[10px] uppercase tracking-widest">
                                                Ship Order
                                            </button>
                                            <button className="px-5 py-2.5 bg-techWhite/5 border border-techGray text-techWhite font-medium rounded-lg hover:bg-techWhite/10 transition-all text-[10px] uppercase tracking-widest">
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            )}
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default Orders;