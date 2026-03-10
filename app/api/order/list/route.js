import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import Address from "@/models/Address";
import Product from "@/models/Product";

export async function GET(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        await connectDB();

        // Ensure models are registered for populate
        Address.schema;
        Product.schema;

        // More robust filter:
        // 1. COD orders
        // 2. Paid Stripe orders
        // 3. Backward compatibility: orders without paymentType field (legacy)
        const orders = await Order.find({
            userId,
            $or: [
                { paymentType: 'COD' },
                { paymentType: 'Stripe', isPaid: true },
                { paymentType: { $exists: false } }
            ]
        }).populate('address items.product');

        return NextResponse.json({ success: true, orders });
    } catch (error) {
        console.error("Order List API error:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}