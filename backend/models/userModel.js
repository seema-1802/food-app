import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
 photo: {
    type: String,
    default: ""
  },

  activities: [
    {
      message: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
emailOtp: String,
emailOtpExpiry: Date,
  googleId: {
  type: String
},
resetOtp: String,
resetOtpExpiry: Date,
authProvider: {
  type: String,
  default: "email"
},
  cartData: {
    type: Object,
    default: {}
  }

}, {
     minimize: false,
  timestamps: true
});

const userModel = mongoose.model("User", userSchema);

export default userModel;