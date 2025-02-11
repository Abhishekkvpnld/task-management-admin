import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      enum: ["User", "Admin"],
      required: true,
      type: String,
      default: "User",
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      required: true,
      type: String,
      enum: ["Active", "InActive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;