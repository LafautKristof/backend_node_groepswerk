import { Request, Response } from "express";
import { Ram } from "../models/RamModel";

export const getAllRam = async (req: Request, res: Response): Promise<any> => {
    try {
        const ram = await Ram.find();
        console.log(ram);
        res.status(200).json(ram);
    } catch (error) {
        console.error(error);
        res.status(500).send("getRams error");
    }
};

export const getRamById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const ram = await Ram.findById(id);
        res.status(200).json(ram);
    } catch (error) {
        console.error(error);
        res.status(500).send("getRamById error");
    }
};

export const deleteRamById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const ram = await Ram.findByIdAndDelete(id);
        res.status(200).json(ram);
    } catch (error) {
        console.error(error);
        res.status(500).send("deleteRam error");
    }
};
