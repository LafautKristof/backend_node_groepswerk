import mongoose from "mongoose";

const KeyboardSchema = new mongoose.Schema({
    name: { type: String },
    brand: { type: String },
    price: { type: Number },
    type: { type: String },
    switches: { type: String },
    connectivity: { type: String },
    rgb: { type: Boolean },
    description: { type: String },
    images: { type: [String] },
    raters: { type: Number },
    points: { type: Number },
});

export const Keyboard = mongoose.model("Keyboard", KeyboardSchema);
