import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import authSeller from "@/lib/authSeller";
import Address from "@/models/Address";
import Product from "@/models/Product";

export async function GET(request) {
    try {
        const { userId } = await auth();
        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'Unauthorized' });
        }

        await connectDB();

        // Ensure models are registered
        Address.schema;
        Product.schema;

        // For now, returning all orders.
        const orders = await Order.find({}).populate('address items.product');

        return NextResponse.json({ success: true, orders });
    } catch (error) {
        console.error("Seller Order API error:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}