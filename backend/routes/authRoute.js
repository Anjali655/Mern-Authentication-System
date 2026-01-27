import express from "express";
import jwt from "jsonwebtoken";
import passport, { session } from "passport";

const router = express.Router();

// step-1: Redirect to Google login
router
    .get("/google", passport)
    .authenticate("google", { scope: ["profile", "email"] });

router.get(
    "google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        try {
        } catch (err) { }
    }
);

export default router;
