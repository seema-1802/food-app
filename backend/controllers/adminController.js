import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import validator from "validator";



export const registerAdmin = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const exists = await adminModel.findOne({
      email
    });

    if (exists) {
      return res.json({
        success: false,
        message: "Admin already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin = await adminModel.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      adminId: admin._id
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message
    });

  }
};
export const loginAdmin = async (req, res) => {

  try {

    const { email, password } = req.body;

    const admin = await adminModel.findOne({
      email
    });

    if (!admin) {
      return res.json({
        success: false,
        message: "Admin not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      adminId: admin._id
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message
    });

  }
};
// Get Admin Profile
export const getAdminProfile = async (req, res) => {
  try {

    const admin = await adminModel
        .findById(req.user.id)
      .select("-password");

    if (!admin) {
      return res.json({
        success: false,
        message: "Admin not found"
      });
    }

    res.json({
      success: true,
      admin
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
// Update Profile
export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const admin = await adminModel.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;

    // 🔥 FIX IMAGE HERE
    if (req.file) {
      admin.photo = req.file.filename;
    }

    await admin.save();

    res.json({
      success: true,
      message: "Profile Updated",
      admin
    });

  } catch (error) {
    console.log(error); // 🔥 IMPORTANT
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// Change Password
export const changeAdminPassword = async (req, res) => {
  try {

    const { oldPassword, newPassword } =
      req.body;

    const admin = await adminModel.findById(
      req.user.id
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password incorrect"
      });
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};