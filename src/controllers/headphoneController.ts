import { Request, Response } from "express";
import { Headphone } from "../models/HeadphoneModel";

export const getAllHeadphone = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const headphone = await Headphone.find();
        console.log(headphone);
        res.status(200).json(headphone);
    } catch (error) {
        console.error(error);
        res.status(500).send("getHeadphones error");
    }
};

export const getHeadphoneById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const headphone = await Headphone.findById(id);
        res.status(200).json(headphone);
    } catch (error) {
        console.error(error);
        res.status(500).send("getHeadphoneById error");
    }
};

export const deleteHeadphoneById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const headphone = await Headphone.findByIdAndDelete(id);
        res.status(200).json(headphone);
    } catch (error) {
        console.error(error);
        res.status(500).send("deleteHeadphoneById error");
    }
};
