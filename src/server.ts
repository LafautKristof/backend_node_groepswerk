// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import mongoose from "mongoose";
import ProductRoutes from "./Routes/ProductRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import cookieParser from "cookie-parser";
// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));

app.get("/login", async (req, res) => {
    res.render("login");
});

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/admin", AdminRoutes);
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
