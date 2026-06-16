const mongoose = require("mongoose");

const vendorProfileSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    shopName: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    instagram: {
      type: String,
      default: ""
    },

    youtube: {
      type: String,
      default: ""
    },

    whatsapp: {
      type: String,
      default: ""
    },

    categories: [
      {
        type: String
      }
    ],

    location: {
      type: String,
      default: ""
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "VendorProfile",
  vendorProfileSchema
);