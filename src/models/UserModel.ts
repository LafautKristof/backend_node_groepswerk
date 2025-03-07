import mongoose from "mongoose";

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
        wishlist: {
            type: [mongoose.Types.ObjectId],
            cart: "Wishlist",
            required: false,
            default: [],
        },
        role: { type: String, default: "user" },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
