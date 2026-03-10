import connectDB from "@/config/db";
import Order from "@/models/Order";
import User from "@/models/user";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const body = await request.text();
        const sig = request.headers.get('stripe-signature');

        let event;

        try {
            event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            console.error(`Webhook Error: ${err.message}`);
            return NextResponse.json({ message: `Webhook Error: ${err.message}` }, { status: 400 });
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const { orderId, userId } = session.metadata;

            await connectDB();

            // Update order status and payment status
            await Order.findByIdAndUpdate(orderId, {
                isPaid: true,
                status: 'Order placed'
            });

            // Clear user cart
            await User.findByIdAndUpdate(userId, { cartItems: {} });
        }

        if (event.type === 'checkout.session.expired') {
            const session = event.data.object;
            const { orderId } = session.metadata;

            await connectDB();
            // Optional: delete or mark as failed
            await Order.findByIdAndDelete(orderId);
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}