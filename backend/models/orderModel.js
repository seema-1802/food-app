import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  userId: {
    type: String,   
    required: true
  },

  items: {
    type: Array,   
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  address: {
    type: Object,
    required: true
  },

  status: {
    type: String,
    default: "Food Processing"
  },

  paymentStatus: {
    type: Boolean,
    default: false   
  },

  date: {
    type: Date,
    default: Date.now
  },
   amount: Number,
    status: {
      type: String,
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

}, {
  minimize: false,
  timestamps: true
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;