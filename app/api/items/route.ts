//SERVER ROUTES FOR IMAGE UPLOAD FUNCTIONALITY

import { NextResponse, NextRequest } from "next/server";
import {connectMongo, gfs} from "../../libs/mongo";
//import { runMiddleware, multerMiddleware } from "../../../util/multerHelper";
//import mongoose from "mongoose";
//import multer from 'multer';
import userClothing from '../../models/Clothing';
import {Readable} from "stream";
import formidable, {IncomingForm} from 'formidable';
import fs from 'fs';
import { IncomingMessage } from "http";
//import Grid from "gridfs-stream";





// Disable Next.js body parsing
export const config = {
    api: {
      bodyParser: false,
    },
  };


  const parseForm = (req: IncomingMessage) =>
    new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
        const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Form parsing error:', err);
            reject(err);
          }
          console.log('Parsed fields:', fields);
          console.log('Parsed files:', files);
        resolve({ fields, files });
      });
    });


/*
async function parseImageData(request: NextRequest) {
    const imageData = await request.formData();
    const imageFile = imageData.get("image") as File;

    if (!imageFile) {
        throw new Error("Missing required fields or image file.");
    }

    return imageFile;
}
    */

//POST ROUTE
export async function POST(request: NextRequest) {
    console.log("POST Request Receieved")
    try {
     

   // Convert NextRequest to Node.js IncomingMessage
   const req = request as unknown as IncomingMessage;
   console.log ("REQUEST INITIALIZED", req);
   //const req = request.body; // Access raw body as Node.js Readable Stream
   if (!req) throw new Error("Invalid request.");

   console.log("ENTERING PARSE FORM FUNCTION");
   const { fields, files } = await parseForm(req);
   console.log("LEAVING PARSE FORM FUNCTION");

   console.log('Fields:', fields);
    console.log('Files:', files);

   // Type guard to handle single file or file array
   const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

   if (!imageFile) {
     throw new Error("Image file is required.");
   }

   // Extract fields
   const { category, color, size, brand } = fields;
   console.log("Received data:", { category, color, size, brand, imageFile });
       
   // const imageFile = await parseImageData(request);
   //const { category, color, size, brand } = await request.json();
   // console.log('Received data:', { category, color, size, brand, imageFile });
        
    await connectMongo();

// Save the image to GridFS
console.log("GFS VALUE: ", gfs);

const writeStream = gfs!.openUploadStream(imageFile.originalFilename!, {
    contentType: imageFile.mimetype ?? undefined,
  });

  const readable = new Readable();
    readable._read = () => {}; // No-op
    readable.push(Buffer.from(await fs.promises.readFile(imageFile.filepath)));
    readable.push(null);

    readable.pipe(writeStream);

    const savedImage = await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    const imageUrl = `/api/images/${(savedImage as { _id: string })._id}`; //image retrieval URL

    
    // Save clothing item with image reference
    const clothing = await userClothing.create({
        category,
        color,
        size,
        brand,
        image: imageUrl,
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
    await connectMongo();
    const clothes = await userClothing.find();
    return NextResponse.json({clothes});
  }