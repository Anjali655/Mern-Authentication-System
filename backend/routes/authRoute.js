import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// Step 1: Redirect to Google login
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google callback
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        try {
            const token = jwt.sign(
                { id: req.user._id, email: req.user.email },
                process.env.SECRET_KEY,
                { expiresIn: "7d" }
            );

            res.redirect(
                `${process.env.CLIENT_URL}/auth-success?token=${token}`
            );
        } catch (err) {
            console.error("Google login error", err);
            res.redirect(
                `${process.env.CLIENT_URL}/login?error=google_failed`
            );
        }
    }
);

router.get("/me", isAuthenticated, (req, res) => {
    res.json({ success: true, user: req.user });
});

export default router;
