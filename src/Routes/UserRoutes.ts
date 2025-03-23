import express from "express";
import {
    getAllUsers,
    addToCart,
    removeFromCart,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/cart/add", addToCart);
router.delete("/cart/delete/:userId/:productId", removeFromCart);

export default router;
