import connectDB from "@/config/db";
import User from "@/models/user";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" })
        }

        await connectDB();
        let user = await User.findById(userId);

        if (!user) {
            // Si l'utilisateur n'est pas trouvé dans la base (ex: déjà client Clerk avant Inngest)
            // On récupère ses infos complètes via Clerk
            const clerkUser = await currentUser();

            if (!clerkUser) {
                return NextResponse.json({ success: false, message: "User info not found in Clerk" })
            }

            // On le crée à la volée dans MongoDB
            user = await User.create({
                _id: userId,
                name: (clerkUser.firstName || "") + " " + (clerkUser.lastName || ""),
                email: clerkUser.emailAddresses[0].emailAddress,
                imageUrl: clerkUser.imageUrl,
                cartItems: {}
            });
        }

        return NextResponse.json({ success: true, user })

    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" })
    }
}