import { response } from "express";
import mongoose from "mongoose";

const ComputerScreenSchema = new mongoose.Schema({
    name: { type: String },
    brand: { type: String },
    price: { type: Number },
    size: { type: String },
    resolution: { type: String },
    refresh_rate: { type: String },
    panel: { type: String },
    response_time: { type: String },
    connectivity: { type: [String] },
    description: { type: String },
    images: { type: [String] },
    raters: { type: Number },
    points: { type: Number },
});

export const ComputerScreen = mongoose.model(
    "ComputerScreen",
    ComputerScreenSchema
);
