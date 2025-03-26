// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import mongoose from "mongoose";
import ProductRoutes from "./Routes/ProductRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";
import cookieParser from "cookie-parser";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "src/views");
app.set("view cache", false);
app.use(express.static("src/public"));

app.get("/login", async (req, res) => {
    res.render("login");
});

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/user", UserRoutes);
app.use("/", AdminRoutes);
app.all("*", notFound);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        allowedFormats: ["jpg", "png", "jpeg", "webp"],
    } as any,
});
const upload = multer({ storage: storage });
// Routes
app.get("/", (req, res) => {
    res.sendFile("/index.html");
});
app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        res.status(400).send("No file uploaded");
        return;
    }
    console.log(req.file);
    const base_url = "https://res.cloudinary.com/dtjwzr6hr/image/upload/";
    const trans =
        "c_thumb,g_face,h_200,w_200/r_max/f_auto/a_vflip/c_scale,h_500,w_500";
    const end = req.file.fieldname + path.extname(req.file.originalname);

    const imageUrl = `${base_url}${trans}/${end}`;

    res.status(200).send(
        `<h1>File uploaded successfully</h1><img src="${imageUrl}"/>`
    );
});
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
