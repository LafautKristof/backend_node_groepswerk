import express from "express";
import {
    getAllRam,
    getRamById,
    deleteRamById,
} from "../controllers/ramController";

import {
    getAllHeadphone,
    getHeadphoneById,
    deleteHeadphoneById,
} from "../controllers/headphoneController";

import {
    getAllComputerScreen,
    getComputerScreenById,
    deleteComputerScreenById,
} from "../controllers/computerscreenController";

import {
    getAllKeyboard,
    getKeyboardById,
    deleteKeyboardById,
} from "../controllers/keyboardController";

import {
    getAllMouse,
    getMouseById,
    deleteMouseById,
} from "../controllers/mouseControllers";

import {
    getAllVideoCard,
    getVideoCardById,
    deleteVideoCardById,
} from "../controllers/videoCardController";

const router = express.Router();
router.get("/ram", getAllRam);
router.get("/ram/:id", getRamById);
router.delete("/ram/:id", deleteRamById);

router.get("/computerscreen", getAllComputerScreen);
router.get("/computerscreen/:id", getComputerScreenById);
router.delete("/computerscreen/:id", deleteComputerScreenById);

router.get("/headphone", getAllHeadphone);
router.get("/headphone/:id", getHeadphoneById);
router.delete("/headphone/:id", deleteHeadphoneById);

router.get("/keyboard", getAllKeyboard);
router.get("/keyboard/:id", getKeyboardById);
router.delete("/keyboard/:id", deleteKeyboardById);

router.get("/mouse", getAllMouse);
router.get("/mouse/:id", getMouseById);
router.delete("/mouse/:id", deleteMouseById);

router.get("/videocard", getAllVideoCard);
router.get("/videocard/:id", getVideoCardById);
router.delete("/videocard/:id", deleteVideoCardById);

/**
 * @swagger
 * /products
 * get:
 *   summary: Get all products
 *   responses:
 *     200:
 *       description: A successful response
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
 *               message:
 *                 type: string
 *                 description: A message indicating the success of the request
 *               data:  
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Mouse'
 * 
 * /products/:id
 * get:
 *   summary: Get a product by ID   
 *   parameters:    
 *      
 *     - in: path
 *       name: id        
 *       required: true 
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: A successful response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: A message indicating the success of the request
 *               data:
 *                 $ref: '#/components/schemas/Mouse'
 * 
 * /products/:id
 * delete:
 *   summary: Delete a product by ID
 *   parameters:    
 *     - in: path
 *       name: id        
 *       required: true 
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: A successful response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: A message indicating the success of the request
 *               data:
 *                 $ref: '#/components/schemas/Mouse'
 *     404:
 *       description: Product not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: A message indicating the failure of the request
 *               error:
 *                 type: string
 *                 description: The error message
 * 

 * 
 * 
 */
export default router;
