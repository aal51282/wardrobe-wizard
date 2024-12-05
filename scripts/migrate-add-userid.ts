import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define the ClothingItem schema
const ClothingItemSchema = new Schema({
  category: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  brand: { type: String, required: true },
  imageUrls: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
}, {
  versionKey: false,
});

const ClothingItem = mongoose.models.ClothingItem || mongoose.model('ClothingItem', ClothingItemSchema);

async function migrateClothingItems() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://admin:HjZGU9KmlxaudjXC@cluster3.fmffz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3";
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update all documents that don't have a userId
    const result = await ClothingItem.updateMany(
      { userId: { $exists: false } },
      { $set: { userId: "angel7140@yahoo.com" } }
    );

    console.log(`Updated ${result.modifiedCount} documents`);

    // Verify the update
    const items = await ClothingItem.find({});
    console.log("All items after migration:", items);

  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit();
  }
}

migrateClothingItems(); 