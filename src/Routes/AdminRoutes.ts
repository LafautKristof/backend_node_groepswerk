import express from "express";
import { login, filter } from "../controllers/adminController";

const router = express.Router();

router.post("/login", login);
router.get("/admin", filter);
router.delete("/:collection/:id", deleteProductById);

export default router;
