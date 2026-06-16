const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },

        quantity: {
          type: Number,
          required: true
        }
      }
    ],

    totalAmount: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending"
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);