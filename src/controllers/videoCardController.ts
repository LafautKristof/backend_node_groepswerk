import { Request, Response } from "express";
import { VideoCard } from "../models/VideoCardModel";

export const getAllVideoCard = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const videoCard = await VideoCard.find();
        console.log(videoCard);
        res.status(200).json(videoCard);
    } catch (error) {
        console.error(error);
        res.status(500).send("getAllVideoCard error");
    }
};

export const getVideoCardById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const videoCard = await VideoCard.findById(id);
        res.status(200).json(videoCard);
    } catch (error) {
        console.error(error);
        res.status(500).send("getVideoCardById error");
    }
};

export const deleteVideoCardById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const videoCard = await VideoCard.findByIdAndDelete(id);
        res.status(200).json(videoCard);
    } catch (error) {
        console.error(error);
        res.status(500).send("deleteVideoCardById error");
    }
};
