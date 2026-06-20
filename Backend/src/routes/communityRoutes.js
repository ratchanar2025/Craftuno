const express = require("express");

const router = express.Router();

const {
  createPost,
  getPosts,
  getPost,
  addComment,
  toggleLike,
  deletePost,
} = require("../controllers/communityController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/", protect, createPost);

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/:id/comment", protect, addComment);

router.post("/:id/like", protect, toggleLike);

router.delete("/:id", protect, deletePost);

module.exports = router;