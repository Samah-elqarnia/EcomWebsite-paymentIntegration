import { inngest } from "@/config/inngest";
import connectDB from "@/config/db";
import User from "@/models/user";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        const { address, items } = await request.json();

        if (!address || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid data' });
        }

        await connectDB();

        // Calculate amount correctly using a for...of loop for async operations
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (product) {
                amount += product.offerPrice * item.quantity;
            }
        }

        const finalAmount = amount + Math.floor(amount * 0.02);

        await inngest.send({
            name: 'order/created',
            data: {
                userId,
                address,
                items,
                amount: finalAmount,
                date: Date.now()
            }
        });

        // Clear user cart 
        const user = await User.findById(userId);
        if (user) {
            user.cartItems = {};
            await user.save();
        }

        return NextResponse.json({ success: true, message: 'Order placed' });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error.message });
    }
}