const CommunityPost = require("../models/CommunityPost");


// Create Post
const createPost = async (req, res) => {
  try {

    const post = await CommunityPost.create({
      ...req.body,
      author: req.user.id,
    });

    res.status(201).json({
      success: true,
      post,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get All Posts
const getPosts = async (req, res) => {
  try {

    const posts = await CommunityPost
      .find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get Single Post
const getPost = async (req, res) => {
  try {

    const post = await CommunityPost
      .findById(req.params.id)
      .populate("author", "name email");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Add Comment
const addComment = async (req, res) => {
  try {

    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.comments.push({
      user: req.user.id,
      text: req.body.text,
    });

    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment added",
      comments: post.comments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Like / Unlike Post
const toggleLike = async (req, res) => {

  try {

    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.includes(req.user.id);

    if (alreadyLiked) {

      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user.id
      );

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post unliked",
        likes: post.likes.length,
      });

    }

    post.likes.push(req.user.id);

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post liked",
      likes: post.likes.length,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Post
const deletePost = async (req, res) => {

  try {

    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (
      post.author.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  addComment,
  toggleLike,
  deletePost,
};