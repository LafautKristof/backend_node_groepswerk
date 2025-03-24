import express from "express";
import {
    login,
    filter,
    deleteProductById,
} from "../controllers/adminController";

const router = express.Router();

router.delete("/:collection/:id", deleteProductById);
router.post("/login", login);
router.get("/admin", filter);

export default router;
