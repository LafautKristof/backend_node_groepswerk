import { Request, Response } from "express";
import { User } from "../models/UserModel";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send("getAllUsers error");
        return;
    }
};

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { product, userId } = req.body;
        console.log("1", product, "2", userId);

        if (!product || !userId) {
            res.status(400).json({
                message: "Product and userId are required",
            });
            return;
        }

        const productWithQuantity = {
            ...product,
            quantity: product.quantity || 1,
        };

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId.toString() },
            { $addToSet: { cart: productWithQuantity } },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const userObj = updatedUser.toObject();
        console.log(userObj);

        res.status(200).json({ cart: updatedUser.cart });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).send("addToCart error");
        return;
    }
};

export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const { productId, userId } = req.params;
        console.log("1", productId, "2", userId);
        if (!productId || !userId) {
            res.status(400).json({
                message: "productId and userId are required",
            });
            return;
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId.toString() },
            { $pull: { cart: { _id: productId.toString() } } },
            { new: true }
        );
        console.log("updatedUser", updatedUser);

        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ cart: updatedUser.cart });
    } catch (error) {
        console.log(error);
        res.status(500).send("removeFromCart error");
        return;
    }
};

export const removeAllProductsFromCart = async (
    req: Request,
    res: Response
) => {
    try {
        const { userId } = req.params;
        console.log("1", userId);
        if (!userId) {
            res.status(400).json({ message: "userId is required" });
            return;
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId.toString() },
            { $set: { cart: [] } },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ cart: updatedUser.cart }); // Stuur alleen de cart terug
        return;
    } catch (error) {
        console.log(error);
        res.status(500).send("removeAllProductsFromCart error");
        return;
    }
};
