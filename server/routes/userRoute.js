import express from "express";
import {
  addNewUser,
  createPost,
  deletePost,
  fetchAllPosts,
  fetchPostById,
  updatePost,
} from "../controller/userController.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const router = express.Router();

router.post("/addNew", addNewUser);
router.post("/create", jwtAuth, createPost);
router.put("/update/:id", jwtAuth, updatePost);
router.delete("/delete/:id", jwtAuth, deletePost);
router.get("/post/:id", jwtAuth, fetchPostById);
router.get("/all-posts", jwtAuth, fetchAllPosts);

export default router;
