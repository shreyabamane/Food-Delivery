import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authMidddleware from "../middleware/auth.js";


const cartRouter = express.Router();

//end points
cartRouter.post("/add", authMidddleware, addToCart);
cartRouter.post("/remove", authMidddleware, removeFromCart);
cartRouter.get("/get", authMidddleware, getCart);


export default cartRouter;