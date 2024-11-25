import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOutfit extends Document {
  name: string;
  items: string[]; // Array of ClothingItem IDs
  createdAt: Date;
}

const OutfitSchema: Schema = new Schema<IOutfit>(
  {
    name: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem' }],
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export const Outfit: Model<IOutfit> =
  mongoose.models.Outfit || mongoose.model<IOutfit>("Outfit", OutfitSchema); 