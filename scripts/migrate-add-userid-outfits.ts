import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define the Outfit schema
const OutfitSchema = new Schema({
  name: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'ClothingItem' }],
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
}, {
  versionKey: false,
});

const Outfit = mongoose.models.Outfit || mongoose.model('Outfit', OutfitSchema);

async function migrateOutfits() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://admin:HjZGU9KmlxaudjXC@cluster3.fmffz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3";
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update all documents that don't have a userId
    const result = await Outfit.updateMany(
      { userId: { $exists: false } },
      { $set: { userId: "angel7140@yahoo.com" } }
    );

    console.log(`Updated ${result.modifiedCount} outfits`);

    // Verify the update
    const outfits = await Outfit.find({});
    console.log("All outfits after migration:", outfits);

  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit();
  }
}

migrateOutfits(); 