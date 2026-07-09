import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "Administrator",
    },

    photo: {
      type: String,
      default: "",
    },

fileId: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

const adminModel = mongoose.model("Admin", adminSchema);

export default adminModel;