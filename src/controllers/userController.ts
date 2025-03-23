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
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId.toString() },
            { $addToSet: { cart: product } },
            { new: true }
        );
        console.log(updatedUser);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const userObj = updatedUser.toObject();
        console.log(userObj);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("addToCart error");
    }
};
