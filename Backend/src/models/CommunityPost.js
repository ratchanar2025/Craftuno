const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const communityPostSchema = new mongoose.Schema(
  {
    author: {
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

    category: {
      type: String,
      enum: [
        "event",
        "stall",
        "collaboration",
        "raw-material",
        "discussion",
        "custom-order", // ADD THIS
      ],
      default: "discussion",
    },

    location: {
      type: String,
    },

    // LINK TO CUSTOM ORDER
    customOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomOrder",
      default: null,
    },

    // TAGS FOR FILTERING
    tags: [
      {
        type: String,
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CommunityPost",
  communityPostSchema
);