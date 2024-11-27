import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
}

const userSchema = new Schema<IUser>({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    photoUrl: {
        type: String,
        required: true,
        default: '/default-avatar.png'
    }
});

// Migration function to add photoUrl to existing users
async function migrateExistingUsers() {
    try {
        const db = mongoose.connection.db;
        if (!db) return;

        const users = await db.collection('users').updateMany(
            { photoUrl: { $exists: false } },
            { $set: { photoUrl: '/default-avatar.png' } }
        );

        console.log(`Migration complete: ${users.modifiedCount} users updated`);
    } catch (error) {
        console.error('Error during migration:', error);
    }
}

// Run migration when the model is compiled
if (mongoose.connection.readyState === 1) {
    migrateExistingUsers();
}

// Also run migration when connection is established
mongoose.connection.on('connected', () => {
    migrateExistingUsers();
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;