import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { Outfit } from "@/app/models/outfitModel";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Only fetch outfits belonging to the current user
    const outfits = await Outfit.find({ userId: session.user.email })
      .populate('items')
      .sort({ createdAt: -1 });

    return NextResponse.json(outfits);
  } catch (error) {
    console.error("Failed to fetch outfits:", error);
    return NextResponse.json(
      { message: "Failed to fetch outfits" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const data = await req.json();
    
    const newOutfit = new Outfit({
      name: data.name,
      items: data.items,
      userId: session.user.email, // Add the user ID to the outfit
    });

    await newOutfit.save();

    return NextResponse.json(
      { message: "Outfit saved successfully", outfit: newOutfit },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save outfit:", error);
    return NextResponse.json(
      { message: "Failed to save outfit" },
      { status: 500 }
    );
  }
} 