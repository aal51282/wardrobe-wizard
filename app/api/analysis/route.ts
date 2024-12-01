import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { ClothingItem } from "@/app/models/clothingItem";
import {
  performAnalysis,
  generateRecommendations,
} from "@/lib/outfit-analysis";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { selectedItemIds } = await request.json();
    
    if (!Array.isArray(selectedItemIds) || selectedItemIds.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty item selection" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const selectedItems = await ClothingItem.find({
      _id: { $in: selectedItemIds },
      userId: session.user.email
    }).exec();

    if (!selectedItems.length) {
      return NextResponse.json(
        { error: "No clothing items found with the provided IDs." },
        { status: 404 }
      );
    }

    const outfitAnalysis = performAnalysis(selectedItems);
    const recommendations = generateRecommendations(outfitAnalysis, selectedItems);

    return NextResponse.json(
      { 
        outfitAnalysis, 
        recommendations,
        selectedItems
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 }
    );
  }
}
