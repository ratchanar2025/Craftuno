const express = require("express");
const router = express.Router();

const {
  createPaymentOrder
} = require("../controllers/paymentController");

const {
  protect
} = require("../middleware/authMiddleware");

router.post(
  "/create-order",
  protect,
  createPaymentOrder
);

module.exports = router;