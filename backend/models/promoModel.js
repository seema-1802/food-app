import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const promoModel =
  mongoose.models.promo || mongoose.model("promo", promoSchema);

export default promoModel;