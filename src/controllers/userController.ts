import { Request, Response } from "express";
import { User } from "../models/UserModel";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("getAllUsers error");
    }
};

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { product, userId } = req.body;
        console.log("1", product, "2", userId);

        if (!product || !userId) {
            return res
                .status(400)
                .json({ message: "Product and userId are required" });
        }

        // Voeg een `quantity` toe als dat nog niet is gedaan
        const productWithQuantity = {
            ...product,
            quantity: product.quantity || 1,
        };

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId.toString() },
            { $addToSet: { cart: productWithQuantity } }, // Sla het volledige product op
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Zet de gebruiker om naar een object voor logging (optioneel)
        const userObj = updatedUser.toObject();
        console.log(userObj);

        res.status(200).json({ cart: updatedUser.cart }); // Stuur alleen de cart terug
    } catch (error) {
        console.log(error);
        res.status(500).send("addToCart error");
    }
};
