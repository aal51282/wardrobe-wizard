import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { ClothingItem } from "@/app/models/clothingItem";
import {
  performAnalysis,
  generateRecommendations,
} from "@/lib/outfit-analysis";
import { IClothingItem } from "@/models/clothingItem";
import { Document, Types } from "mongoose";

type PlainClothingItem = {
  _id: string;
  userId: string;
  category: string;
  color: string;
  size: string;
  brand: string;
  imageUrls: string[];
  price?: string;
};

export async function POST(request: Request) {
  try {
    const { selectedItemIds } = await request.json();
    
    await connectToDatabase();

    const selectedItems = await ClothingItem.find({
      _id: { $in: selectedItemIds },
    }).lean();

    const plainItems: PlainClothingItem[] = selectedItems.map((item: any) => ({
      _id: item._id.toString(),
      userId: item.userId,
      category: item.category,
      color: item.color,
      size: item.size,
      brand: item.brand,
      imageUrls: item.imageUrls,
      ...(item.price && { price: item.price })
    }));

    const outfitAnalysis = performAnalysis(plainItems);
    const recommendations = generateRecommendations(outfitAnalysis, plainItems);

    return NextResponse.json(
      { 
        outfitAnalysis, 
        recommendations,
        selectedItems: plainItems
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze outfit" },
      { status: 500 }
    );
  }
}
