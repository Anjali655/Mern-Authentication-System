import express from 'express';
import 'dotenv/config';
import connectDB from './database/db.js';
const app = express();
const PORT = process.env.PORT || 8000;
import userRoute from "./routes/userRoute.js";
import cors from 'cors';

// middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true
}))

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