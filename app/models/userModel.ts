import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
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
    }
});

// Function to drop the username index
async function dropUsernameIndex() {
    try {
        const db = mongoose.connection.db;
        if (!db) return;

        const collections = await db.listCollections({ name: 'users' }).toArray();
        if (collections.length > 0) {
            const indexes = await db.collection('users').indexes();
            const hasUsernameIndex = indexes.some(index => index.name === 'username_1');
            if (hasUsernameIndex) {
                await db.collection('users').dropIndex('username_1');
                console.log('Username index dropped successfully');
            }
        }
    } catch (error) {
        console.error('Error dropping username index:', error);
    }
}

// Drop index when the model is compiled
if (mongoose.connection.readyState === 1) { // If connected
    dropUsernameIndex();
}

// Also attempt to drop index when connection is established
mongoose.connection.on('connected', () => {
    dropUsernameIndex();
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;