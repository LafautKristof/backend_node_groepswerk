// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import mongoose from "mongoose";
import ProductRoutes from "./Routes/ProductRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import cookieParser from "cookie-parser";
// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/products", ProductRoutes);
app.all("*", notFound);

// Database connection
try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log(process.env.MONGO_URI);
    console.log("Database connection OK");
} catch (err) {
    console.error(err);
    process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}! 🚀`);
});
