import express from "express";
import { getAllUsers } from "../controllers/userController";
import exp from "constants";

const router = express.Router();

router.get("/", getAllUsers);

export default router;
