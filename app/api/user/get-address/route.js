import Address from "@/models/Address";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        await connectDB();
        const addresses = await Address.find({ userId });

        return NextResponse.json({ success: true, addresses });
    } catch (error) {
        console.error("GetAddress API Error:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}