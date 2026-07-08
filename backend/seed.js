import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import foodModel from "./models/foodModel.js";
import foodData from "./data/foodData.js";
import imagekit from "./config/imagekit.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await foodModel.deleteMany();

    const foods = [];

    for (const item of foodData) {
      const imagePath = path.join(
        process.cwd(),
        "frontend_assets",
        item.image
      );

      const buffer = fs.readFileSync(imagePath);

      const upload = await imagekit.upload({
        file: buffer,
        fileName: item.image,
        folder: "/food-delivery",
      });

      foods.push({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: upload.url,
        fileId: upload.fileId,
      });

      console.log(`${item.name} uploaded ✅`);
    }

    await foodModel.insertMany(foods);

    console.log("All foods inserted successfully ✅");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();