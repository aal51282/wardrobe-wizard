import mongoose, { Document, Model, Schema } from "mongoose";

export interface IClothingItem extends Document {
  category: string;
  color: string;
  size: string;
  brand: string;
  imageUrls: string[];
  createdAt: Date;
  userId: string;
}

const ClothingItemSchema: Schema = new Schema<IClothingItem>(
  {
    category: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrls: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    userId: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export const ClothingItem: Model<IClothingItem> =
  mongoose.models.ClothingItem ||
  mongoose.model<IClothingItem>("ClothingItem", ClothingItemSchema);
