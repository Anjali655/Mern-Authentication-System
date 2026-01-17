import express from 'express';
import 'dotenv/config';
import connectDB from './database/db.js';
const app = express();
const PORT = process.env.PORT || 8000;
import userRoute from "./routes/userRoute.js";

// middleware
app.use(express.json());

// routes
app.use('/user', userRoute);

// start server only after DB connects
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    })
};

startServer();