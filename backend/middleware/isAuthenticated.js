import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/userModel.js';


export const isAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                success: false,
                message: "Access token missing or invalid"
            })
        }
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({
                        success: false,
                        message: "Access token has expired, use refreshToken to generate new token"
                    })
                }
                return res.status(401).json({
                    success: false,
                    message: "Token is missing or Invalid"
                })
            }
            const { id } = decoded;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }
            req.user = user;
            req.userId = user._id;
            next();
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}; 