import { Document } from 'mongoose';

export interface IClothingItem extends Document {
  _id: string;
  userId: string;
  category: string;
  color: string;
  size: string;
  brand: string;
  imageUrls: string[];
  price?: string;
}

export interface FilterState {
  categories: string[];
  colors: string[];
  sizes: string[];
  brands: string[];
} 