import express from "express";
import { placeOrderStripe, verifyNewOrder,userOrders,listOrder, updateStatus} from "../controllers/orderController.js";

import auth from "../middleware/auth.js";
const router = express.Router();

// Place order & create Stripe session
router.post("/stripe",auth, placeOrderStripe);

router.post("/verify-new-order", auth, verifyNewOrder);

router.get("/userorders", auth, userOrders);

router.get('/list', listOrder)

router.post("/status", updateStatus);

export default router;