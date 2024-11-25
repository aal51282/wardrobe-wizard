import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { Outfit } from "@/app/models/outfitModel";

export async function GET() {
  try {
    await connectToDatabase();
    
    const outfits = await Outfit.find({})
      .populate('items')  // This will populate the actual clothing items
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
    await connectToDatabase();

    const data = await req.json();
    
    const newOutfit = new Outfit({
      name: data.name,
      items: data.items,
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