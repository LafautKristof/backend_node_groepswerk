import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Zorg ervoor dat elk product een ID heeft
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: [String] },
        description: { type: String },
        quantity: { type: Number, default: 1 }, // Voeg een standaardwaarde toe
        raters: { type: Number },
        points: { type: Number },
    },
    { _id: false } // Voorkom dubbele _id's binnen de cart array
);
const UserSchema = new mongoose.Schema(
    {
        name: { type: String },
        email_phone: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: (value: string) => {
                    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
                    const phoneRegex = /^\+?[0-9]{6,15}$/;
                    return emailRegex.test(value) || phoneRegex.test(value);
                },
            },
        },
        password: { type: String, required: true },
        cart: {
            type: [ProductSchema],

            default: [],
        },
        role: { type: String, default: "user" },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
