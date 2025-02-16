import { Request, Response } from "express";
import { Keyboard } from "../models/KeyboardModel";

export const getAllKeyboard = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const keyboard = await Keyboard.find();
        console.log(keyboard);
        res.status(200).json(keyboard);
    } catch (error) {
        console.error(error);
        res.status(500).send("getKeyboard error");
    }
};

export const getKeyboardById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const keyboard = await Keyboard.findById(id);
        res.status(200).json(keyboard);
    } catch (error) {
        console.error(error);
        res.status(500).send("getKeyboardById error");
    }
};

export const deleteKeyboardById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const keyboard = await Keyboard.findByIdAndDelete(id);
        res.status(200).json(keyboard);
    } catch (error) {
        console.error(error);
        res.status(500).send("deleteKeyboardById error");
    }
};
