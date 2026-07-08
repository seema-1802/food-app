import express from "express";
import { registerUser, loginUser,  googleLogin,sendEmailOtp,verifyEmailOtp,updatePassword,getProfile,updateProfile} from "../controllers/userController.js";

const userRouter = express.Router();

// Register
userRouter.post("/register", registerUser);

// Login
userRouter.post("/login", loginUser);
userRouter.post("/google-login", googleLogin);
userRouter.post("/send-email-otp", sendEmailOtp);
userRouter.post("/verify-email-otp", verifyEmailOtp);
userRouter.post(
  "/update-password",
  updatePassword
);

userRouter.post("/profile", getProfile);
userRouter.post("/update-profile", updateProfile);
export default userRouter;