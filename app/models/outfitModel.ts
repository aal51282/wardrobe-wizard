import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOutfit extends Document {
  name: string;
  items: string[]; // Array of ClothingItem IDs
  createdAt: Date;
  userId: string;
}

const OutfitSchema: Schema = new Schema<IOutfit>(
  {
    name: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem' }],
    createdAt: { type: Date, default: Date.now },
    userId: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

OutfitSchema.index({ userId: 1 });

export const Outfit: Model<IOutfit> =
  mongoose.models.Outfit || mongoose.model<IOutfit>("Outfit", OutfitSchema); 