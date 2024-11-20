import mongoose, { Schema, Document, Model } from "mongoose";


interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    
}

const userSchema = new Schema<IUser>({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
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


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;