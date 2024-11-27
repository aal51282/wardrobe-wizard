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

// Drop the username index if it exists when the model is compiled
userSchema.pre('save', async function(next) {
    try {
        // Check if the collection exists and has the username index
        const collections = await mongoose.connection.db.listCollections({ name: 'users' }).toArray();
        if (collections.length > 0) {
            const indexes = await mongoose.connection.db.collection('users').indexes();
            const hasUsernameIndex = indexes.some(index => index.name === 'username_1');
            if (hasUsernameIndex) {
                await mongoose.connection.db.collection('users').dropIndex('username_1');
            }
        }
        next();
    } catch (error) {
        next(error as Error);
    }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;