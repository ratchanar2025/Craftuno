const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getVendorOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/create",
  protect,
  authorizeRoles("buyer"),
  createOrder
);

router.get("/my-orders",
  protect,
  authorizeRoles("buyer"),
  getMyOrders
);

router.get("/vendor-orders",
  protect,
  authorizeRoles("vendor"),
  getVendorOrders
);

router.put("/:id/status",
  protect,
  authorizeRoles("vendor"),
  updateOrderStatus
);

module.exports = router;