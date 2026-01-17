import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/noteapp`);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.log('MongoDB connection error:', error.message);
        process.exit(1);  // stop app if DB fails
    };
};

export default connectDB;