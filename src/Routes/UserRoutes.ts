import express from "express";
import {
    getAllUsers,
    addToCart,
    removeFromCart,
    removeAllProductsFromCart,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/cart/add", addToCart);
router.delete("/cart/deleteAll/", removeAllProductsFromCart);
router.delete("/cart/delete/:userId/:productId", removeFromCart);

export default router;
