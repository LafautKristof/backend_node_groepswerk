import mongoose from "mongoose";

const HeadphoneSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    color: { type: String },
    noise_canceling: { type: Boolean },
    description: { type: String },
    images: { type: [String] },
    raters: { type: Number },
    points: { type: Number },
});

export const Headphone = mongoose.model("Headphone", HeadphoneSchema);
