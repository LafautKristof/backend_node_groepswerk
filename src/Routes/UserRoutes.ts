import express from "express";
import { getAllUsers, addToCart } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/cart/add", addToCart);

export default router;
