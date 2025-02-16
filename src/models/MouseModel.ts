import mongoose from "mongoose";

const MouseSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    color: { type: [String] },
    dpi: { type: Number },
    description: { type: String },
    images: { type: [String] },
    raters: { type: Number },
    points: { type: Number },
});

export const Mouse = mongoose.model("Mouse", MouseSchema);
