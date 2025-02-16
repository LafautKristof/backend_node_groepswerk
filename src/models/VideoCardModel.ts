import mongoose from "mongoose";

const VideoCardSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    chipset: { type: String },
    memory: { type: String },
    color: { type: String },
    length: { type: Boolean },
    images: { type: [String] },
    description: { type: String },
    raters: { type: Number },
    points: { type: Number },
});

export const VideoCard = mongoose.model("VideoCard", VideoCardSchema);
