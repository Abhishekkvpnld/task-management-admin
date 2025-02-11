import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";

export const addNewUser = async (req, res) => {
  try {
    const { userName, email, password, phone } = req.body;

    if (!userName || !email || !password || !phone) {
      throw new Error("Please add all details...📩");
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const checkUser = await userModel.findOne({ email: email });
    if (checkUser) {
      throw new Error("User already exists with this email.");
    }

    const user = new userModel({
      userName,
      email,
      phone,
      password: encryptPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      data: user,
      error: false,
      message: "User Created Successfully...✅✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const fetchAllUsers = await userModel.find();

    res.status(200).json({
      success: true,
      error: false,
      data: fetchAllUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Unauthorized. Please login first...",
      });
    }

    const { title, description, dueDate, priority } = req.body;

    if (!title || !description || !dueDate || !priority) {
      return res.status(400).json({
        success: false,
        error: true,
        message:
          "All fields (title, description, dueDate, priority) are required.",
      });
    }

    const post = new postModel({
      title,
      description,
      due_date: dueDate,
      priority,
      userId: req.user._id,
    });

    await post.save();

    return res.status(201).json({
      success: true,
      error: false,
      message: "Task Created Successfully...✅",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Unauthorized. Please login first...",
      });
    }

    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid request. Post ID is required.",
      });
    }

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Post not found.",
      });
    }

    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You do not have permission to delete this task.",
      });
    }

    await postModel.findByIdAndDelete(postId);

    return res.status(200).json({
      success: true,
      error: false,
      message: "Task Deleted Successfully...✅",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const { title, description, dueDate, priority } = req.body;

    if (!userId) {
      throw new Error("Please login first...");
    }

    if (!postId) {
      throw new Error("Invalid request: Post ID is required.");
    }

    if (!title || !description || !dueDate || !priority) {
      return res.status(400).json({
        success: false,
        error: true,
        message:
          "All fields (title, description, dueDate, priority) are required.",
      });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      throw new Error("Task not found.");
    }

    if (post.userId.toString() !== userId.toString()) {
      throw new Error("Unauthorized: You can only update your own tasks.");
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { title, description, due_date:dueDate, priority },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      error: false,
      message: "Task updated successfully! ✅",
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error?.message,
    });
  }
};

export const fetchAllPosts = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Unauthorized. Please login first...",
      });
    }

    const posts = await postModel.find({ userId: req.user._id });

    return res.status(201).json({
      success: true,
      error: false,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export const fetchPostById = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Unauthorized. Please login first...",
      });
    }

    const postId = req.params.id;

    const post = await postModel.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    return res.status(201).json({
      success: true,
      error: false,
      data: post,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal Server Error. Please try again later.",
    });
  }
};
