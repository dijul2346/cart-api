import mongoose from 'mongoose';
import 'dotenv/config'; 
const MONGODB_URI = process.env.MONGO_URI || 'mongodb';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected ");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); 
    }
};