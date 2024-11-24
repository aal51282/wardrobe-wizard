//SERVER ROUTES FOR IMAGE UPLOAD FUNCTIONALITY

import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../libs/mongodb";
import userClothing from '../../models/Clothing';

//POST ROUTE
export async function POST(req: NextRequest) {
    console.log("POST Request Receieved")
    try {
// Get the FormData from the incoming request
const formData = await req.formData();

// Get form fields
const category = formData.get("category");
const color = formData.get("color");
const size = formData.get("size");
const brand = formData.get("brand");

// Get the image file
const image = formData.get("image") as File;

if (!image) {
  throw new Error("Image is required");
}
 
   console.log("Received data:", { category, color, size, brand});
   console.log('Image: ', image)
    
    await connectMongoDB();
  
    // Save clothing item with image reference
    const clothing = await userClothing.create({
        category,
        color,
        size,
        brand,
        image,
      });

        return NextResponse.json({
            message: "Item added successfully",
            item: {
                id: clothing._id,
                category: clothing.category,
                color: clothing.color,
                size: clothing.size,
                brand: clothing.brand,
                image: clothing.image
            }
        }, {status: 201});
    } catch (error: any) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ 
            error: error.message 
        }, { status: 500 });
    }
}

 //GET 
 export async function GET() {
    await connectMongoDB();
    const clothes = await userClothing.find();
    return NextResponse.json({clothes});
  }