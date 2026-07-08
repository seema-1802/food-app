import express from "express";
import { applyPromo ,addPromo} from "../controllers/promoController.js";

const promoRouter = express.Router();

promoRouter.post("/apply", applyPromo);
promoRouter.post("/add", addPromo);
export default promoRouter;