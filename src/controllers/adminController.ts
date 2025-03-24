import { Request, Response } from "express";
import { User } from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { ComputerScreen } from "../models/ComputerScreenModel";
import { Headphone } from "../models/HeadphoneModel";
import { Keyboard } from "../models/KeyboardModel";
import { Mouse } from "../models/MouseModel";
import { Ram } from "../models/RamModel";
import { VideoCard } from "../models/VideoCardModel";
import mongoose from "mongoose";

export const login = async (req: Request, res: Response) => {
    try {
        const { email_phone, password } = req.body;
        const user = await User.findOne({ email_phone });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        if (user.role !== "admin") {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const token = jwt.sign(
            { _id: user._id, email_phone: user.email_phone },
            JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "lax",
        });
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error Login" });
    }
};

export const filter = async (req: Request, res: Response) => {
    const filterValue = req.query.filter;
    console.log("Filter:", filterValue);
    let apiData: any[] = [];
    let error: string | null = null;

    let url = "";
    if (filterValue) {
        if (filterValue === "user") {
            url = `https://backend-node-groepswerk.onrender.com/api/${filterValue}`;
        } else {
            url = `https://backend-node-groepswerk.onrender.com/api/products/${filterValue}`;
        }
        console.log(url);
        if (url && !error) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("API-call mislukt");
                }
                apiData = await response.json();
                console.log(apiData);
            } catch (err) {
                console.error("API-call mislukt", err);
                error = "fout met API-call";
            }
        }
    }
    res.render("admin", {
        title: "Admin Dashboard",
        choice: filterValue,
        apiData,
        error,
    });
};

export const deleteProductById = async (req: Request, res: Response) => {
    const { collection, id } = req.params;
    let Model = mongoose.Model<typeof ComputerScreen>;
    switch (collection) {
        case "computerscreen":
            Model = ComputerScreen;
            break;
        case "headphone":
            Model = Headphone;

            break;
        case "keyboard":
            Model = Keyboard;
            break;
        case "mouse":
            Model = Mouse;
            break;
        case "ram":
            Model = Ram;
            break;
        case "videocard":
            Model = VideoCard;
            break;

        default:
            return res.status(400).json({ message: "Ongeldige collectie" });
    }
    try {
        const query = { _id: id };
        const product = await Model.findOne(query);
        if (!product) {
            return res.status(404).json({ message: "Product niet gevonden" });
        }
        await Model.deleteOne({ _id: id });

        res.status(200).json({ message: "Product verwijderd" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
