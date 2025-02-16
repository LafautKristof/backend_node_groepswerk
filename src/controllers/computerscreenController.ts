import { Request, Response } from "express";
import { ComputerScreen } from "../models/ComputerScreenModel";

export const getAllComputerScreen = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const computerscreen = await ComputerScreen.find();
        console.log(computerscreen);
        res.status(200).json(computerscreen);
    } catch (error) {
        console.error(error);
        res.status(500).send("getAllComputerScreen error");
    }
};

export const getComputerScreenById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const computerscreen = await ComputerScreen.findById(id);
        res.status(200).json(computerscreen);
    } catch (error) {
        console.error(error);
        res.status(500).send("getComputerScreenById error");
    }
};

export const deleteComputerScreenById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const computerscreen = await ComputerScreen.findByIdAndDelete(id);
        res.status(200).json(computerscreen);
    } catch (error) {
        console.error(error);
        res.status(500).send("deleteComputerScreenById error");
    }
};
