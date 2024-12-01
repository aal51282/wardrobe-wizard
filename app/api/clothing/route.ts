import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { ClothingItem } from "@/app/models/clothingItem";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    console.log("Session in GET clothing:", session);
    
    if (!session?.user?.email) {
      console.log("No user email in session for GET request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Debug log the query
    console.log("Querying for userId:", session.user.email);

    // First, check all items in the collection
    const allItems = await ClothingItem.find({});
    console.log("All items in collection:", allItems);

    // Then query for user's items
    const userItems = await ClothingItem.find({ userId: session.user.email });
    console.log("User's items:", userItems);

    // Transform MongoDB documents to plain objects with proper typing
    const transformedItems = userItems.map((item: any) => ({
      id: item._id.toString(),
      name: `${item.brand} ${item.category}`,
      image: item.imageUrls[0],
      category: item.category,
      color: item.color,
      size: item.size,
      brand: item.brand,
      selected: false,
    }));

    console.log("Transformed items:", transformedItems);

    // Extract unique values for filters
    const uniqueCategories = [...new Set(userItems.map(item => item.category))];
    const uniqueColors = [...new Set(userItems.map(item => item.color))];
    const uniqueSizes = [...new Set(userItems.map(item => item.size))];
    const uniqueBrands = [...new Set(userItems.map(item => item.brand))];

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
    console.error("GET error:", error);
    return NextResponse.json(
      { message: "Failed to fetch clothing items" },
      { status: 500 }
    );
  }
}
