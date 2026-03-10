import connectDB from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
    try {
        const { userId } = await auth();
        const { address, items } = await request.json();
        const origin = request.headers.get('origin');

        if (!userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized' });
        }

        if (!address || !items || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid address or items' });
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("STRIPE_SECRET_KEY is missing in environment variables");
            return NextResponse.json({ success: false, message: 'Payment provider not configured' });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        await connectDB();

        let productData = [];
        let amount = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (product) {
                amount += product.offerPrice * item.quantity;
                productData.push({
                    name: product.name,
                    price: product.offerPrice,
                    quantity: item.quantity
                });
            }
        }

        if (productData.length === 0) {
            return NextResponse.json({ success: false, message: 'No valid products found' });
        }

        const taxAmount = Math.floor(amount * 0.02);
        const finalAmount = amount + taxAmount;

        // Create initial order record DIRECTLY in DB
        const newOrder = await Order.create({
            userId,
            address,
            items,
            amount: finalAmount,
            date: Date.now(),
            paymentType: 'Stripe',
            isPaid: false,
            status: 'Payment Pending'
        });

        // Create line items for stripe
        const line_items = productData.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        // Add Tax/Service fee line item
        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: "Service Fee & Tax (2%)",
                },
                unit_amount: Math.round(taxAmount * 100),
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/order-placed?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: newOrder._id.toString(),
                userId
            }
        });

        return NextResponse.json({ success: true, url: session.url });

    } catch (error) {
        console.error("Stripe API error:", error);
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}