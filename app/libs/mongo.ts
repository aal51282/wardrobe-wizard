import mongoose from "mongoose";
import { Db, GridFSBucket } from "mongodb";

let gfs: GridFSBucket | null = null;

const connectMongo = async (): Promise<void> => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        // Check if already connected
        if (mongoose.connection.readyState === 1) return;

        // Establish the connection to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");

        const conn = mongoose.connection;

// Ensure conn.db is available by listening to the 'open' event
await new Promise<void>((resolve, reject) => {
    conn.once("open", () => {
        console.log("Mongoose connection opened.");
        resolve();
    });
    conn.on("error", (error) => {
        console.error("Error in Mongoose connection:", error);
        reject(error);
    });
});

/*
        // Ensure the connection is established and db is available
        if (!conn.db) {
            throw new Error("Database connection is not available.");
        }
*/

const db: Db = conn.db as unknown as Db;

        if (!db) {
            throw new Error("Database connection (Db) is not available.");
        }

        // Initialize GridFSBucket with the database connection
        gfs = new GridFSBucket(db, {
            bucketName: "userUploads", // Specify the collection name for the file storage
        });

    } catch (error: any) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

export { connectMongo, gfs };
