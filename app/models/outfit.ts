import mongoose, { Document, Model } from "mongoose";

export interface IOutfit {
  userId: string;
  name: string;
  items: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOutfitDocument extends IOutfit, Document {}

const outfitSchema = new mongoose.Schema<IOutfitDocument>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "ClothingItem" }],
  },
  { timestamps: true }
);

export const Outfit: Model<IOutfitDocument> = mongoose.models.Outfit || mongoose.model<IOutfitDocument>("Outfit", outfitSchema); 