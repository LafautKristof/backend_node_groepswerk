import mongoose from "mongoose";

const RamSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    capacity: { type: String },
    speed: { type: String },
    type: { type: String },
    latency: { type: String },
    rgb: { type: Boolean },
    description: { type: String },
    images: { type: [String] },
    raters: { type: Number },
    points: { type: Number },
});

export const Ram = mongoose.model("RAM", RamSchema);
