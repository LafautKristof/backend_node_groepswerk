import { Request, Response } from "express";
import { User } from "../models/UserModel";
import bcrypt from "bcrypt";

import validator from "validator";
import { JWT_SECRET, NODE_ENV } from "../config/env";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email_phone, password } = req.body;
        const user = await User.findOne({ email_phone });
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const isSrongPassword = validator.isStrongPassword(password, {
            minLength: 8,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        });
        if (!isSrongPassword) {
            res.status(400).json({ message: "Password is not strong enough" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email_phone,
            password: hashedPassword,
        });

        if (!JWT_SECRET) {
            res.status(500).json({ message: "JWT_SECRET is not defined" });
            return;
        }

        const token = jwt.sign(
            {
                _id: newUser._id,
                email_phone: newUser.email_phone,
            },
            JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: NODE_ENV === "production" ? true : false,
            sameSite: "lax",
        });
        const userObj = {
            _id: newUser._id,
            name: newUser.name,
            email_phone: newUser.email_phone,
        };
        res.status(201).json({
            message: "User created successfully",
            user: userObj,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
