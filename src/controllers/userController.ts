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
        const { product, user } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { _id: user },
            { $addToSet: { cart: product } },
            { new: true }
        );
        console.log(updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("addToCart error");
    }
};
