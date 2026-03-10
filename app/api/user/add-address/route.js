import connectDB from "@/config/db";
import Address from "@/models/Address";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId } = await auth();
        const { address } = await request.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        await connectDB();

        const newAddress = await Address.create({ ...address, userId });

        return NextResponse.json({ success: true, message: "Address added successfully", newAddress });
    } catch (error) {
        console.error("AddAddress API Error:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}