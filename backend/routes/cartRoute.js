import express from "express";
import auth from "../middleware/auth.js";

import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/addtocart", auth, addToCart);
router.post("/removefromcart", auth, removeFromCart);
router.get("/getcart", auth, getCart);

export default router;