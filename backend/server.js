import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import cors from "cors";
import passport from "./config/passport.js"; // ✅ IMPORTANT

import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// ✅ Passport init (MUST be before routes)
app.use(passport.initialize());

// routes
app.use("/auth", authRoute);
app.use("/user", userRoute);

// start server only after DB connects
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    });
};

startServer();
