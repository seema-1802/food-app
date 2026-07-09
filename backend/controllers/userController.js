import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import validator from 'validator'
import nodemailer from "nodemailer";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️ Check empty fields
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }
 
    // 2️ Validate Email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email"
      });
    }

    // 3️ Password Length Check
    if (!validator.isStrongPassword(password, {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 0,
  minNumbers: 1,
  minSymbols: 0
})) {
  return res.json({
    success: false,
    message: "Password must be at least 6 characters and contain a number"
  });
}

    // 4️ Check Existing User
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "User already exists"
      });
    }

    // 5️ Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6️ Create User
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();

    // 7️ Generate JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
       userId: user._id, 
      message: "User Registered Successfully"
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error"
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️ Check Empty Fields
    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

    // 2️ Validate Email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter valid email"
      });
    }

    // 3️ Check User Exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist"
      });
    }

    // 4️ Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
        userId: user._id, 
      message: "Login Successful"
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error"
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { email, name, googleId } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name,
        email,
        googleId,
        authProvider: "google",
        password: "google-login"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      userId: user._id,
      message: "Google Login Successful"
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Server Error"
    });
  }
};


const sendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    let user = await userModel.findOne({ email });

    // if (!user) {
    //   user = await userModel.create({
    //     name: "Email User",
    //     email,
    //     password: "otp-user",
    //     authProvider: "email"
    //   });
    // }
    if (!user) {
  user = new userModel({
    name: "Email User",
    email,
    password: "otp-user",
    authProvider: "email"
  });

  
}

    user.emailOtp = otp;
    user.emailOtpExpiry = Date.now() + 300000;
console.log("USER FOUND:", user.email);
console.log("OTP:", otp);
    await user.save();

    const transporter = nodemailer.createTransport({
      // service: "gmail",
        host: "smtp.gmail.com",
  port: 587,
  secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Food App OTP",
      text: `Your OTP is ${otp}`
    });

console.log("SMTP Connected");
    res.json({
      success: true,
      message: "OTP Sent Successfully"
    });

  } catch (error) {
    console.log("EMAIL OTP ERROR:", error);
console.log("EMAIL OTP ERROR:", error.message);
console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.json({
      success: false,
      message: "User not found"
    });
  }

  if (
    user.emailOtp !== otp ||
    user.emailOtpExpiry < Date.now()
  ) {
    return res.json({
      success: false,
      message: "Invalid OTP"
    });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.json({
    success: true,
    token,
    userId: user._id
  });
};
const updatePassword = async (req, res) => {
  try {

    const { email, newPassword } = req.body;

    const user = await userModel.findOne({
      email
    });

    if (!user) {
      
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token,
      userId: user._id
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false
    });
  }
};



const getProfile = async (req, res) => {
  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
const updateProfile = async (req, res) => {
  try {

    const {
      userId,
      name,
      email
    } = req.body;

    const user =
      await userModel.findByIdAndUpdate(
        userId,
        {
          name,
          email
        },
        {
          new: true
        }
      );

    res.json({
      success: true,
      user
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
export { registerUser,loginUser,
  googleLogin,sendEmailOtp,verifyEmailOtp ,updatePassword,getProfile,updateProfile};