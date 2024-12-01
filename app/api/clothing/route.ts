import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { ClothingItem } from "@/app/models/clothingItem";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Only fetch items belonging to the current user
    const items = await ClothingItem.find({ userId: session.user.email }).lean();

    // Transform MongoDB documents to plain objects with proper typing
    const transformedItems = items.map((item: any) => ({
      id: item._id.toString(),
      name: `${item.brand} ${item.category}`,
      image: item.imageUrls[0],
      category: item.category,
      color: item.color,
      size: item.size,
      brand: item.brand,
      selected: false,
    }));

    // Extract unique values for filters
    const uniqueCategories = [...new Set(items.map(item => item.category))];
    const uniqueColors = [...new Set(items.map(item => item.color))];
    const uniqueSizes = [...new Set(items.map(item => item.size))];
    const uniqueBrands = [...new Set(items.map(item => item.brand))];

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
