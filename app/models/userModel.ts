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

// Add this index for better query performance
userSchema.index({ email: 1 });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;