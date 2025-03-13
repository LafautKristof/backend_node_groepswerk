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
            { $unionWith: { coll: "headphones", pipeline: [] } },
            { $unionWith: { coll: "keyboards", pipeline: [] } },
            { $unionWith: { coll: "mice", pipeline: [] } },
            { $unionWith: { coll: "rams", pipeline: [] } },
            { $unionWith: { coll: "videocards", pipeline: [] } },
            { $sample: { size: Number(count) } },
        ]);
        console.log(randomProduct);
        res.status(200).json(randomProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("getRandomProduct error");
    }
};
