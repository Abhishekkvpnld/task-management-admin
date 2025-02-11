import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"]
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", postSchema);
export default postModel;
