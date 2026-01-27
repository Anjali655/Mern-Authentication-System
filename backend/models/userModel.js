import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    GoogleId: { type: String },
    avatar: { type: String },
    isVerified: { type: Boolean, default: false },
    token: { type: String, default: null },
    isLoggedIn: { type: String, default: false },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;