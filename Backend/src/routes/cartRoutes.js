const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart
} = require("../controllers/cartController");

const {
  protect
} = require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

router.post("/add",
  protect,
  authorizeRoles("buyer"),
  addToCart
);

router.get("/",
  protect,
  authorizeRoles("buyer"),
  getCart
);

router.put("/update/:productId",
  protect,
  authorizeRoles("buyer"),
  updateCartItem
);

router.delete("/remove/:productId",
  protect,
  authorizeRoles("buyer"),
  removeFromCart
);

module.exports = router;