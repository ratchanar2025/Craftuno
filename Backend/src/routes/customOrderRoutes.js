const express = require("express");
const router = express.Router();

const {
  createCustomOrder,
  getMyCustomOrders,
  getVendorCustomOrders,
  submitQuote,
  acceptQuote,
  updateCustomOrderStatus,
} = require("../controllers/customOrderController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/", protect, createCustomOrder);

router.get("/my", protect, getMyCustomOrders);

router.get("/vendor", protect, getVendorCustomOrders);

router.post(
  "/:id/quote",
  protect,
  submitQuote
);

router.post("/:id/accept", protect, acceptQuote);

router.put("/:id/status", protect, updateCustomOrderStatus);

module.exports = router;