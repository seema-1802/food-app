import express from "express";
import auth from "../middleware/auth.js";
import {
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,registerAdmin,loginAdmin
} from "../controllers/adminController.js";
import { getDashboardData } from "../controllers/dashboardController.js";
import multer from "multer";

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload =multer({storage:storage});
const adminRouter = express.Router();

adminRouter.post(
  "/register",
  registerAdmin
);

adminRouter.post(
  "/login",
  loginAdmin
);
adminRouter.get(
  "/profile",
  auth,
  getAdminProfile
);
adminRouter.post(
  "/update-profile",
  upload.single("photo"),
  auth,
  updateAdminProfile
);

adminRouter.post(
  "/change-password",
  auth,
  changeAdminPassword
);

adminRouter.get("/dashboard", getDashboardData);

export default adminRouter;