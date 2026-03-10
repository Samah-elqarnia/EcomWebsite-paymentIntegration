import connectDB from "@/config/db";
import User from "@/models/user";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId } = await auth();
        const { address, items } = await request.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized' });
        }

        if (!address || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid data' });
        }

        await connectDB();

        // Calculate amount
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (product) {
                amount += product.offerPrice * item.quantity;
            }
        }

        const finalAmount = amount + Math.floor(amount * 0.02);

        // CREATE ORDER DIRECTLY IN DATABASE FOR COD
        // This ensures the order exists immediately without waiting for background workers
        await Order.create({
            userId,
            address,
            items,
            amount: finalAmount,
            date: Date.now(),
            paymentType: 'COD',
            isPaid: false,
            status: 'Order placed'
        });

        // Clear user cart 
        const user = await User.findById(userId);
        if (user) {
            user.cartItems = {};
            await user.save();
        }

        return NextResponse.json({ success: true, message: 'Order placed successfully' });

    } catch (error) {
        console.error("COD Create API error:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}