import { Request, Response } from "express";

import { ComputerScreen } from "../models/ComputerScreenModel";
import { Headphone } from "../models/HeadphoneModel";
import { Keyboard } from "../models/KeyboardModel";
import { Mouse } from "../models/MouseModel";
import { Ram } from "../models/RamModel";
import { VideoCard } from "../models/VideoCardModel";
export const getRandomProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const ran1 = await ComputerScreen.aggregate([{ $sample: { size: 5 } }]);
        const ran2 = await Headphone.aggregate([{ $sample: { size: 5 } }]);
        const ran3 = await Keyboard.aggregate([{ $sample: { size: 5 } }]);
        const ran4 = await Mouse.aggregate([{ $sample: { size: 5 } }]);
        const ran5 = await Ram.aggregate([{ $sample: { size: 5 } }]);
        const ran6 = await VideoCard.aggregate([{ $sample: { size: 5 } }]);
        let randProduct = [
            ...ran1,
            ...ran2,
            ...ran3,
            ...ran4,
            ...ran5,
            ...ran6,
        ];

        randProduct = randProduct.sort(() => Math.random() - 0.5);
        const randomProduct = randProduct.slice(0, parseInt(id));
        res.status(200).json(randomProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("getRandomProduct error");
    }
};
