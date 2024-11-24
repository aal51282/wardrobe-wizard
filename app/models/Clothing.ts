import mongoose, { Schema, Document, Model } from "mongoose";


interface uClothing extends Document  {
    category: string;
    color: string;
    size: string;
    brand: string;
    image: string;
}
const clothingSchema = new mongoose.Schema({
    category: { 
        type: String, 
        required: true 
    },
    color: { 
        type: String, 
        required: true 
    },
    size: { 
        type: String, 
        required: true 
    },
    brand: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    }, // holding file path
  });

  const userClothing: Model<uClothing> = mongoose.models.userClothing || mongoose.model<uClothing>("Clothing", clothingSchema);

export default userClothing;