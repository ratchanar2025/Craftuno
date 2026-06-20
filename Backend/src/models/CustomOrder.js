const mongoose = require("mongoose");

const customOrderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    requestType: {
      type: String,
      enum: [
        "product-customization",
        "open-request",
        "community-request",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    budget: {
      type: Number,
    },

    deadline: {
      type: Date,
    },

    referenceImages: [
      {
        type: String,
      },
    ],

    customizationOptions: [
      {
        type: String,
      },
    ],

    giftPackaging: {
      enabled: {
        type: Boolean,
        default: false,
      },

      type: {
        type: String,
        enum: [
          "standard",
          "premium",
          "personalized",
        ],
      },

      message: String,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "quoted",
        "accepted",
        "production",
        "shipped",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    quotePrice: {
      type: Number,
      default: null,
    },

    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CustomOrder",
  customOrderSchema
);