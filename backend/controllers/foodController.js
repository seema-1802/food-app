import foodModel from "../models/foodModel.js";
import fs from'fs'

import imagekit from "../config/imagekit.js";
const addFood =async(req,res)=>{
  try {
  
    // Check if image exists
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }
const fileBuffer = fs.readFileSync(req.file.path);

const result = await imagekit.upload({
  file: fileBuffer,
  fileName: req.file.filename,
  folder: "/food-delivery",
});

fs.unlinkSync(req.file.path);
 

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
//       image: req.file.filename ,
// public_id: req.file.filename
image: result.url,
  fileId: result.fileId,
// saving image filename
    });

    await food.save();

    return res.status(201).json({
      success: true,
      message: "Food Added Successfully",
      data: food
    });

  } catch (error) {
    console.log(error);
     console.error("ERROR:", error);
    console.error("MESSAGE:", error.message);
    console.error("STACK:", error.stack);

    return res.status(500).json({ success: false, message: "Error adding food" });
  }
};
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    return res.status(200).json({
      success: true,
      data: foods
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error fetching foods" });
  }
};

// ✅ REMOVE FOOD
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // // Delete image from uploads folder
    //  fs.unlink(`uploads/${food.image}`, (err) => {
    //   if (err) console.log(err);
    // });
await imagekit.deleteFile(food.fileId);
    await foodModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Food Deleted Successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error deleting food" });
  }
};

export {addFood,listFood,removeFood}