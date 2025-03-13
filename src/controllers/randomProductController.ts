import { Request, Response } from "express";

import { ComputerScreen } from "../models/ComputerScreenModel";
import { Headphone } from "../models/HeadphoneModel";
import { Keyboard } from "../models/KeyboardModel";
import { Mouse } from "../models/MouseModel";
import { Ram } from "../models/RamModel";
import { VideoCard } from "../models/VideoCardModel";
export const getRandomProduct = async (req: Request, res: Response) => {
    try {
        const { count } = req.params;
        const randomProduct = await ComputerScreen.aggregate([
            { $unionWith: "headphones" },
            { $unionWith: "keyboards" },
            { $unionWith: "mice" },
            { $unionWith: "rams" },
            { $unionWith: "videocards" },
            { $sample: { size: Number(count) } },
        ]);
        res.status(200).json(randomProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("getRandomProduct error");
    }
};
