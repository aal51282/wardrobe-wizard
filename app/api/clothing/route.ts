import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { ClothingItem } from "@/app/models/clothingItem";

export async function GET() {
  try {
    await connectToDatabase();

    // Get all clothing items from the database
    const items = await ClothingItem.find({}).sort({ createdAt: -1 });

    // Extract unique values for filters
    const uniqueCategories = [...new Set(items.map(item => item.category))];
    const uniqueColors = [...new Set(items.map(item => item.color))];
    const uniqueSizes = [...new Set(items.map(item => item.size))];
    const uniqueBrands = [...new Set(items.map(item => item.brand))];

    // Transform the items to match the frontend interface
    const transformedItems = items.map((item) => ({
      id: item._id.toString(),
      name: `${item.brand} ${item.category}`,
      image: item.imageUrls[0],
      category: item.category,
      color: item.color,
      size: item.size,
      brand: item.brand,
      selected: false,
    }));

    return NextResponse.json({
      items: transformedItems,
      filters: {
        categories: uniqueCategories.map(category => ({
          id: category.toLowerCase(),
          value: category.toLowerCase(),
          label: category
        })),
        colors: uniqueColors.map(color => ({
          id: color.toLowerCase(),
          value: color.toLowerCase(),
          label: color
        })),
        sizes: uniqueSizes.map(size => ({
          id: size.toLowerCase(),
          value: size.toLowerCase(),
          label: size
        })),
        brands: uniqueBrands.map(brand => ({
          id: brand.toLowerCase(),
          value: brand.toLowerCase(),
          label: brand
        }))
      }
    });
  } catch (error) {
    console.error("Failed to fetch clothing items:", error);
    return NextResponse.json(
      { message: "Failed to fetch clothing items" },
      { status: 500 }
    );
  }
}
