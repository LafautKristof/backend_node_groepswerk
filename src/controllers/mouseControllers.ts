import { Request, Response } from "express";
import { Mouse } from "../models/MouseModel";

export const getAllMouse = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const mouse = await Mouse.find();
        console.log(mouse);
        res.status(200).json(mouse);
    } catch (error) {
        console.error(error);
        res.status(500).send("getAllMouse error");
    }
};

export const getMouseById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const mouse = await Mouse.findById(id);
        res.status(200).json(mouse);
    } catch (error) {
        console.error(error);
        res.status(500).send("getMouseById error");
    }
};

export const deleteMouseById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const mouse = await Mouse.findByIdAndDelete(id);
        res.status(200).json(mouse);
    } catch (error) {
        console.error(error);
        res.status(500).send("deleteMouseById error");
    }
};
