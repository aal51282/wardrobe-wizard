import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { ClothingItem } from "@/app/models/clothingItem";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Specify Node.js runtime
export const runtime = "nodejs";

// To disable Next.js body parsing and use formidable instead
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "/public/uploads");
    form.keepExtensions = true;

    // Ensure the upload directory exists
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }

    const data = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = data;

    const images = Array.isArray(files.images)
      ? files.images
      : [files.images];

    const imageUrls = images.map((file) => {
      // Here you can integrate with a cloud storage service if preferred
      // For simplicity, we'll store images locally in the public/uploads folder
      const filePath = `/uploads/${path.basename(file.filepath)}`;
      return filePath;
    });

    const newClothingItem = new ClothingItem({
      category: fields.category,
      color: fields.color,
      size: fields.size,
      brand: fields.brand,
      imageUrls,
    });

    await newClothingItem.save();

    return NextResponse.json(
      { message: "Clothing item uploaded successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Failed to upload clothing item" },
      { status: 500 }
    );
  }
}
