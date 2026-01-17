import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyMail from "../emailVerify/verifyMail.js";
import Session from "../models/sessionModel.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            })
        }

        // hashing password before saving to DB
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        // generate a token for email verification
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '10m' })

        verifyMail(token, email);

        newUser.token = token;
        await newUser.save();

        // console.log(newUser);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,

        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })

    };
};


export const verification = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing or malformed"
            })
        }

        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(400).json({
                    success: false,
                    message: "The verification link has expired. Please request a new verification email."
                })
            }
            return res.status(400).json({
                success: false,
                message: "Token verification failed"
            })
        };

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        user.token = null;
        user.isVerified = true;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user
        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized access"
            })
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(402).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        // check if user is verified
        if (user.isVerified !== true) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email to login"
            })
        }
        // check for session and delete it
        const existingSession = await Session.findOne({ userID: user._id });
        if (existingSession) {
            await Session.deleteOne({ userId: user._id });
        }

        // create a new session
        await Session.create({ userId: user._id });

        // Generate tokens
        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "10d" });
        const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "30d" });

        user.isLoggedIn = true;
        await user.save();

        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.username}`,
            accessToken,
            refreshToken,
            user: user
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};


export const logoutUser = async (req, res) => {
    try {
        const userID = req.userId;
        await Session.deleteMany({ userId: userID });
        await User.findByIdAndUpdate(userID, { isLoggedIn: false });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const forgotPassword = async (req, res) => {
    try { }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
};